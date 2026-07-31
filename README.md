# Fit Pool Document Generator: Dynamic PDF & DOCX Invoice, Quotation, Contract & Report Automated System

[![Python Version](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)
[![Flask Version](https://img.shields.io/badge/Flask-3.0%2B-green.svg)](https://flask.palletsprojects.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enterprise-grade, SEO-optimized, highly responsive Python-Flask web application designed for automatic document and technical report generation for **Fit Pool Building Maintenance L.L.C**. 

It allows technicians and management to dynamically generate and download high-quality, professional **Invoices, Quotations, Payment Receipts, Cleaning Contracts, Work Completion Reports, and Scope of Work Documents** as formatted **DOCX (Word)** and **PDF** files directly from a clean web dashboard.

---

## 🌟 Key Features

### 1. 🧹 Streamlined Sidebar & Report Subtype Selector
- **Decent, Minimalist Sidebar**: Streamlined main navigation into 4 primary document buttons:
  - 📄 **Quotation**: Professional pricing estimates (`FP/QT-`).
  - 💼 **Invoice**: Client billing statements (`FP/INV-`).
  - 💸 **Payment Receipt**: Payment acknowledgment receipts (`FP/REC-`).
  - 📋 **Report**: Technical maintenance reports (`FP/WCR-`, `FP/SWR-`, `FP/LWR-`, `FP/SPC-`).
- **Dynamic Report Subtype Dropdown**: When **Report** is selected, a dedicated dropdown appears in the form panel for selecting specific report types:
  - *Work Completion Report* (`FP/WCR-`)
  - *Site Inspection & Scope of Work Report* (`FP/SWR-`)
  - *Swimming Pool Leakage & Waterproofing Report* (`FP/LWR-`)
  - *Swimming Pool Cleaning Contract* (`FP/SPC-`)
  - *Custom Report*

### 2. 📜 Swimming Pool Cleaning Contract Engine
- Full support for official **Fit Pool Swimming Pool Cleaning Contracts** matching company PDFs:
  - **Inclusions (1-6)**: pH & chlorine level testing & chemical adjustment, water level filling, vacuuming & wall brushing, pressure reading & backwashing, basket cleaning, timers & underwater lights inspection.
  - **Exclusions (1-3)**: Leakage repairs, re-grouting, underwater lights & pump replacements charged on separate quotes.
  - **Notes (1-4)**: Schedule details, pool access requirement, liability disclaimers.
  - **Payment Advance 100%** highlight badge.
  - **Dual Signature Block**: `Sincerely, Fit Pool General Building Maintenance LLC` on the left & `Signed for and on behalf of Customer` (Name, Signature, Date) on the right.

### 3. 📸 Site Photos Attachment & High-Speed Compressor
- **Multi-Photo Upload**: Technicians can upload multiple site inspection or completed work photos directly from PC or Mobile Cameras.
- **Client-Side Canvas Compressor**: High-resolution camera photos (10MB+) are automatically downscaled to max 1200px JPEG quality in the browser, reducing payload size by over 90% and ensuring instant upload and export speed.
- **Photo Captions**: Custom captions for each picture (e.g., *"Before Work: Leaking Pipe"*, *"Installed 500mm Sand Filter"*).
- **Positioning**: Rendered in clean 2-column or 4-column photo grids positioned **directly below the main document heading badge** on Page 1.

### 4. 🤖 Technician Auto-Report Assistant
- Pre-built library of 11+ official UAE maintenance work templates:
  - 📜 *Swimming Pool Cleaning Contract*
  - 💡 *Swimming Pool Light Replacement*
  - 🛠️ *Swimming Pool Overall Repair & Component Replacement*
  - 🏊‍♂️ *Swimming Pool Deep Cleaning & Sanitization*
  - ⚙️ *Filtration System Upgrade & Sand Media*
  - ⚡ *Control Panel & Electrical Replacements*
  - 🛡️ *Pump Room Waterproofing (5-Day Schedule)*
  - 💧 *Swimming Pool Leakage Repair (4-Step Process)*
  - 🧪 *Swimming Pool Water Treatment & Chemical Balancing*
  - ⚙️ *Pump Room Motor Repair & Piping Overhaul*
  - ❄️ *Pool Heat Pump & AC Servicing*
  - 🔧 *MEP & AC Maintenance Services*
- Selecting a category and clicking **"✨ Auto-Fill Report"** automatically populates formal English titles, scope bullet points, and pricing items.

### 5. 🎨 Table Row Custom Color Shading (Blue & Grey)
- **Row Style Selector**: Individual background shading option for each line item row:
  - `Normal White` (Default background)
  - `Grey Header (#D9D9D9)` (Bold black text across full row — for Category Headers like *"Swimming Pool Cleaning Service (2 Types)"*)
  - `Soft Grey (#F2F2F2)` (Soft section shading)
  - `Blue Banner (#0D05FA)` (Official blue banner background with bold white text)
- Colors the **entire row background** across all columns in Live Preview, PDF export, and Word (`.docx`) files.

### 6. 🎛️ Flexible Section Visibility & Validity Control
- Sidebar toggle switches to show or hide:
  - `Pricing Table`
  - `Enable VAT (5%)`
  - `Document Validity` (with explicit **"✕ Remove" / "+ Add Validity"** button)
  - `Site Photos`
  - `Scope / Work Bullets`
  - `Contract Terms & Signatures`
  - `Advance / Remaining Balance`
  - `Payment Terms`
  - `Bank Account Details`

### 7. 🎨 Dynamic Layout Engine (V1.0 Classic vs V2.0 Modern)
- **Classic V1.0 Layout**: Fits text into the original fixed company letterhead background image (`image1.jpeg`).
- **Modern V2.0 Layout**: Clean web-first aesthetic featuring a centered 5% opacity company logo watermark, slanted blue Arabic title shape (`فيت بول جنرال لصيانة المباني ذ.م.م`), and modern typography.

---

## 🛠️ Technology Stack

- **Backend**: Python 3.12+, Flask (Web framework), `python-docx` (XML Word manipulation & image table grid builder), `docxtpl` (Word rendering), `docx2pdf` (COM Word-to-PDF compilation), `Pillow` (PIL image compositor), `pywin32` (Windows COM bindings).
- **Frontend**: HTML5 (Semantic Structure), Vanilla CSS3 (Custom Dark Mode Layout & Glassmorphism effects), Javascript (ES6+, client-side canvas compressor, state manager & number-to-words currency converter).

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Operating System**: Windows (recommended for DOCX-to-PDF compilation via Microsoft Word COM components).
- **Dependencies**: Python 3.8+ and Microsoft Word installed on the host system.

### Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/fit-pool-document-generator.git
   cd fit-pool-document-generator
   ```

2. **Initialize Virtual Environment**:
   ```powershell
   python -m venv .venv
   .venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```

4. **Launch the Application**:
   Double-click the `start_app.bat` file or run:
   ```powershell
   python app.py
   ```
   The application will automatically launch in your browser at [http://127.0.0.1:5000/](http://127.0.0.1:5000/).

---

## 📂 File Structure

```text
fit-pool-document-generator/
│
├── Templates/
│   ├── index.html                       # Primary application view with dynamic inputs & preview
│   └── Dynamic_Quotation_Template.docx  # Master Word template containing layout anchors
│
├── static/
│   ├── app.js                           # Frontend state manager, image compressor & number-to-words utility
│   ├── style.css                        # UI styling system (Glassmorphism layout, photo grids & badges)
│   ├── new_logo.png                     # Cropped company logo icon
│   ├── image1.jpeg                      # Classic letterhead background
│   └── image1_v2.jpeg                   # Modern pre-composed background image
│
├── Generated_Documents/                 # Server storage of compiled files (ignored in git)
│   ├── Invoices/
│   ├── Quotations/
│   ├── Receipts/
│   ├── Reports/
│   └── Contracts/
│
├── app.py                               # Flask server, document engine & COM PDF converter
├── start_app.bat                        # Double-click Windows startup script
├── .gitignore                           # Excludes build cache, venv, and user-generated outputs
└── README.md                            # Application Documentation
```

---

## 🔒 Security & Privacy (GitHub Best Practices)

When uploading this codebase to GitHub, the following files and directories are **automatically ignored** via [.gitignore](.gitignore) to protect sensitive client data:
- **`Generated_Documents/`**: Contains generated invoices, client contracts, and reports with customer details.
- **`.venv/` & `__pycache__/`**: Local Python packages and compiled cache files.
- **`temp_render.docx` / `temp.docx`**: Temporary compiler renders.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
