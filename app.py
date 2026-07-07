from flask import Flask, request, jsonify, send_file, render_template
from docxtpl import DocxTemplate
from docx import Document
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
import os
from datetime import datetime
from docx2pdf import convert

app = Flask(__name__, template_folder='Templates')

# Workspace path
WORKSPACE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_PATH = os.path.join(WORKSPACE, "Templates", "Dynamic_Quotation_Template.docx")

# Base directory for generated documents (use writable /tmp/ folder on Vercel)
if os.environ.get('VERCEL'):
    GENERATED_DIR = os.path.join("/tmp", "Generated_Documents")
else:
    GENERATED_DIR = os.path.join(WORKSPACE, "Generated_Documents")

# --- HELPER FUNCTIONS FOR WORD STYLING ---
def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_color)
    tcPr.append(shd)

def set_table_borders(table):
    tblBorders = OxmlElement('w:tblBorders')
    for border_name in ['top', 'left', 'bottom', 'right', 'insideH', 'insideV']:
        border = OxmlElement(f'w:{border_name}')
        border.set(qn('w:val'), 'single')
        border.set(qn('w:sz'), '4')  # Border thickness
        border.set(qn('w:space'), '0')
        border.set(qn('w:color'), 'CCCCCC')  # Professional grey border
        tblBorders.append(border)
    table._tbl.tblPr.append(tblBorders)

def set_paragraph_background(paragraph, hex_color):
    pPr = paragraph._p.get_or_add_pPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_color)
    pPr.append(shd)

def update_paragraph_text_preserving_style(paragraph, new_text):
    if not paragraph.runs:
        paragraph.add_run(new_text)
        return
    # Preserve style from first run
    first_run = paragraph.runs[0]
    
    # Clear other runs to avoid duplication
    for run in paragraph.runs[1:]:
        run.text = ""
        
    # Split text by newline and add breaks properly
    lines = new_text.split('\n')
    first_run.text = lines[0]
    for line in lines[1:]:
        first_run.add_break()
        first_run.add_text(line)

def set_row_cell_widths(row):
    widths = [Inches(0.5), Inches(3.6), Inches(0.8), Inches(1.3)]
    for i, cell in enumerate(row.cells):
        cell.width = widths[i]

def replace_docx_image(docx_path, new_image_path, target_zip_path="word/media/image1.jpeg"):
    import tempfile
    import zipfile
    import shutil
    
    temp_dir = tempfile.mkdtemp()
    try:
        temp_docx = os.path.join(temp_dir, "temp.docx")
        shutil.copy2(docx_path, temp_docx)
        
        with zipfile.ZipFile(temp_docx, 'r') as yin:
            with zipfile.ZipFile(docx_path, 'w', zipfile.ZIP_DEFLATED) as yout:
                for item in yin.infolist():
                    if item.filename == target_zip_path:
                        yout.write(new_image_path, target_zip_path)
                    else:
                        yout.writestr(item, yin.read(item.filename))
    finally:
        shutil.rmtree(temp_dir)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    try:
        if request.is_json:
            data = request.json
        else:
            data_str = request.form.get("data")
            if not data_str:
                return jsonify({"error": "No data provided"}), 400
            import json
            data = json.loads(data_str)

        doc_type = data.get("doc_type", "Quotation")
        client_name = data.get("client_name", "").strip()
        client_address = data.get("client_address", "").strip()
        contact_no = data.get("contact_no", "").strip()
        date_val = data.get("date", datetime.today().strftime('%d/%m/%Y'))
        ref_no = data.get("ref_no", "").strip()
        subject = data.get("subject", "").strip()
        intro_text = data.get("intro_text", "").strip()
        city = data.get("city", "Abu Dhabi").strip()
        validity = data.get("validity", "1 month").strip()
        
        items = data.get("items", [])
        vat_enabled = data.get("vat_enabled", False)
        vat_rate = float(data.get("vat_rate", 5))
        
        terms = data.get("terms", "").strip()
        account_details = data.get("account_details", "").strip()
        footer_text = data.get("footer_text", "").strip()
        footer_color = data.get("footer_color", "0d05fa").replace("#", "")
        
        format_type = data.get("format", "pdf").lower()  # 'pdf' or 'docx'
        version = str(data.get("version", "2.0"))        # '1.0' (Original) or '2.0' (V2.0)

        if not client_name:
            return jsonify({"error": "Client Name is required"}), 400

        # Step 1: Render placeholders (logo & basic details)
        doc_tpl = DocxTemplate(TEMPLATE_PATH)
        context = {
            'client_name': client_name,
            'client_address': client_address,
            'date': date_val
        }
        doc_tpl.render(context)
        
        temp_dir = "/tmp" if os.environ.get('VERCEL') else WORKSPACE
        temp_filename = os.path.join(temp_dir, "temp_render.docx")
        doc_tpl.save(temp_filename)

        # Step 2: Open and apply edits to paragraphs and add table
        doc_final = Document(temp_filename)

        # Find and replace headers/metadata
        for paragraph in doc_final.paragraphs:
            txt = paragraph.text.strip()
            
            # 1. Update UAE City
            if "The Manager" in txt and "UAE." in txt:
                update_paragraph_text_preserving_style(paragraph, f"The Manager {city}, UAE.")
                
            # 2. Update Date, Type, Ref
            elif txt.startswith("Date:"):
                new_text = f"Date: {date_val}   {doc_type}\nRef: {ref_no}" if ref_no else f"Date: {date_val}   {doc_type}"
                update_paragraph_text_preserving_style(paragraph, new_text)
                
            # 3. Update Validity
            elif txt.startswith("Validity:"):
                update_paragraph_text_preserving_style(paragraph, f"Validity: {validity}")
                
            # 4. Update Main Heading (centered, search runs)
            elif txt in ["PAYMENT RECEIPT", "QUOTATION", "INVOICE"]:
                for run in paragraph.runs:
                    cleaned = run.text.strip()
                    if cleaned in ["PAYMENT RECEIPT", "QUOTATION", "INVOICE"]:
                        run.text = run.text.replace(cleaned, doc_type.upper())
                
            # 5. Update Subject
            elif txt.startswith("Sub:"):
                update_paragraph_text_preserving_style(paragraph, f"Sub: {subject}")
                
            # 6. Update Intro Paragraph
            elif (txt.startswith("With reference to") or 
                  txt.startswith("We are pleased to acknowledge") or 
                  (len(txt) > 40 and "maintenance work" in txt.lower() and txt.startswith("Dear") is False)):
                update_paragraph_text_preserving_style(paragraph, intro_text)

        # Spacing before table
        doc_final.add_paragraph("")

        # Create items table (4 columns: No, Description, Qty, Total Amount)
        table = doc_final.add_table(rows=1, cols=4)
        set_table_borders(table)

        # Style header row (grey background, bold text)
        headers = ['No', 'Description', 'Qty', 'Total (AED)']
        hdr_cells = table.rows[0].cells
        set_row_cell_widths(table.rows[0])
        for i in range(4):
            hdr_cells[i].text = headers[i]
            set_cell_background(hdr_cells[i], 'D9D9D9')
            run = hdr_cells[i].paragraphs[0].runs[0]
            run.font.bold = True
            run.font.color.rgb = RGBColor(0, 0, 0)

        # Add item rows
        subtotal = 0.0
        for idx, item in enumerate(items):
            no_str = f"{idx + 1:02d}"
            desc = item.get("desc", "").strip()
            qty = item.get("qty", "").strip()
            try:
                amount = float(item.get("amount", 0))
            except ValueError:
                amount = 0.0
                
            row_cells = table.add_row().cells
            set_row_cell_widths(table.rows[-1])
            row_cells[0].text = no_str
            row_cells[1].text = desc
            row_cells[2].text = qty
            row_cells[3].text = f"{amount:.2f}"
            subtotal += amount

        # Add totals section
        if vat_enabled:
            vat_amount = subtotal * (vat_rate / 100.0)
            grand_total = subtotal + vat_amount
            
            # Subtotal row
            sub_cells = table.add_row().cells
            sub_cells[0].merge(sub_cells[2])
            sub_cells[0].text = "Subtotal Amount:"
            sub_cells[0].paragraphs[0].runs[0].font.bold = True
            sub_cells[3].text = f"{subtotal:.2f}"
            sub_cells[3].paragraphs[0].runs[0].font.bold = True
            set_cell_background(sub_cells[0], 'F2F2F2')
            set_cell_background(sub_cells[3], 'F2F2F2')
            
            # VAT row
            vat_cells = table.add_row().cells
            vat_cells[0].merge(vat_cells[2])
            vat_cells[0].text = f"VAT ({vat_rate}%):"
            vat_cells[0].paragraphs[0].runs[0].font.bold = True
            vat_cells[3].text = f"{vat_amount:.2f}"
            vat_cells[3].paragraphs[0].runs[0].font.bold = True
            set_cell_background(vat_cells[0], 'F2F2F2')
            set_cell_background(vat_cells[3], 'F2F2F2')
        else:
            grand_total = subtotal

        # Grand Total row
        tot_cells = table.add_row().cells
        tot_cells[0].merge(tot_cells[2])
        tot_cells[0].text = "Total Amount:" if not vat_enabled else "Grand Total:"
        tot_cells[0].paragraphs[0].runs[0].font.bold = True
        tot_cells[3].text = f"{grand_total:.2f}"
        tot_cells[3].paragraphs[0].runs[0].font.bold = True
        set_cell_background(tot_cells[0], 'F2F2F2')
        set_cell_background(tot_cells[3], 'F2F2F2')

        # Amount in words
        words_total = data.get("words_total", "").strip()
        words_cells = table.add_row().cells
        words_cells[0].merge(words_cells[3])
        words_cells[0].text = f"Amount in words AED: {words_total}"
        words_cells[0].paragraphs[0].runs[0].font.bold = True
        set_cell_background(words_cells[0], 'F2F2F2')

        # Append Terms & Conditions
        if terms:
            doc_final.add_paragraph("")
            term_p = doc_final.add_paragraph()
            term_p.add_run("Payment term and condition").bold = True
            doc_final.add_paragraph(terms)

        # Append Account Details
        if account_details:
            doc_final.add_paragraph("")
            acc_p = doc_final.add_paragraph()
            acc_p.add_run("Account details").bold = True
            doc_final.add_paragraph(account_details)

        # Add Footer Banner
        if footer_text:
            doc_final.add_paragraph("")
            footer_para = doc_final.add_paragraph()
            footer_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
            footer_run = footer_para.add_run(footer_text)
            footer_run.bold = True
            footer_run.font.color.rgb = RGBColor(255, 255, 255)
            
            # Parse hex color
            r = int(footer_color[0:2], 16)
            g = int(footer_color[2:4], 16)
            b = int(footer_color[4:6], 16)
            
            set_paragraph_background(footer_para, footer_color)

        # Determine folders and filenames
        safe_name = "".join(c if c.isalnum() or c in [' ', '_', '-'] else "" for c in client_name).replace(" ", "_")
        date_str = datetime.today().strftime('%d-%m-%Y')
        
        if doc_type.lower() == "invoice":
            folder = os.path.join(GENERATED_DIR, "Invoices")
            prefix = "Invoice"
        elif doc_type.lower() == "receipt":
            folder = os.path.join(GENERATED_DIR, "Receipts")
            prefix = "Payment_Receipt"
        else:
            folder = os.path.join(GENERATED_DIR, "Quotations")
            prefix = "Quotation"
            
        os.makedirs(folder, exist_ok=True)
        
        docx_path = os.path.join(folder, f"{prefix}_{safe_name}_{date_str}.docx")
        pdf_path = os.path.join(folder, f"{prefix}_{safe_name}_{date_str}.pdf")
        
        doc_final.save(docx_path)
        
        # Swapping the background image for Version 2.0
        if version == "2.0":
            v2_image_path = os.path.join(WORKSPACE, "static", "image1_v2.jpeg")
            if os.path.exists(v2_image_path):
                replace_docx_image(docx_path, v2_image_path)
        
        # Cleanup temporary render
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

        # If PDF is requested
        if format_type == "pdf":
            if os.name == 'nt':
                import pythoncom
                pythoncom.CoInitialize()
                try:
                    convert(docx_path, pdf_path)
                finally:
                    pythoncom.CoUninitialize()
            else:
                try:
                    convert(docx_path, pdf_path)
                except Exception as e:
                    raise RuntimeError(
                        "PDF conversion failed. This is likely because LibreOffice/MS Word is not installed on the server (Vercel). "
                        "Please download the document in DOCX format instead."
                    ) from e

        target_path = pdf_path if format_type == "pdf" else docx_path
        download_filename = os.path.basename(target_path)

        response = send_file(target_path, as_attachment=True, download_name=download_filename)
        response.headers["Content-Disposition"] = f'attachment; filename="{download_filename}"'
        response.headers["Access-Control-Expose-Headers"] = "Content-Disposition"
        return response

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/download/<folder_name>/<filename>')
def download_file(folder_name, filename):
    try:
        # Secure filename check to prevent path traversal
        if folder_name not in ['Quotations', 'Invoices', 'Receipts']:
            return jsonify({"error": "Invalid folder"}), 400
        
        safe_filename = os.path.basename(filename)
        file_path = os.path.abspath(os.path.join(GENERATED_DIR, folder_name, safe_filename))
        
        # Verify it stays within the expected directory
        expected_dir = os.path.abspath(os.path.join(GENERATED_DIR, folder_name))
        if not file_path.startswith(expected_dir):
            return jsonify({"error": "Access denied"}), 403
            
        if not os.path.exists(file_path):
            return jsonify({"error": "File not found"}), 404
            
        response = send_file(file_path, as_attachment=True, download_name=safe_filename)
        response.headers["Content-Disposition"] = f'attachment; filename="{safe_filename}"'
        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
