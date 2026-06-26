# Fit Pool Document Generator: Dynamic PDF & DOCX Invoice, Quotation & Receipt Automated System

[![Python Version](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)
[![Flask Version](https://img.shields.io/badge/Flask-3.0%2B-green.svg)](https://flask.palletsprojects.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enterprise-grade, SEO-optimized, highly responsive Python-Flask web application designed for automatic document generation. It allows organizations to dynamically generate and download high-quality, professional **Invoices, Quotations, and Payment Receipts** as formatted **DOCX (Word)** and **PDF** documents directly from a clean web-based dashboard.

---

## 🌟 Key Features

### 1. Dynamic Layout Switching (V1.0 Classic vs V2.0 Modern)
- **Classic V1.0 Layout**: Implements the pre-existing company background letterhead (`image1.jpeg`) as the structural base, aligning layout fields with exact millimeter precision.
- **Modern V2.0 Layout**: Incorporates a clean web-first aesthetic featuring a centered **5% opacity company logo watermark**, a custom slanted Arabic company title banner, and a modern typography grid.

### 2. Intelligent Word & PDF Auto-Generation
- **Automated Placeholders**: Replaces company metrics, dates, and client metadata inside the document.
- **Multilingual Support**: Supports Arabic title text alignment (`RTL` layout parsing) to prevent text clipping.
- **Dynamic Table Spacing**: Custom column-width allocations minimize description wrapping (`No` 8%, `Description` 57%, `Qty` 13%, `Total Amount` 22%).
- **Word-to-PDF Conversion**: Thread-safe background COM invocation (`pythoncom.CoInitialize` with `docx2pdf`) to compile DOCX files into production-ready PDFs.

### 3. Interactive Real-Time Preview
- Fully interactive virtual A4 page reflecting every typing modification instantly.
- Dynamically toggles styling, watermark layers, and header heights to match chosen layout versions.

### 4. Advanced UX & Mobile Responsiveness
- **Adaptive Viewport**: Fits viewports down to `320px` cleanly.
- **Mobile Split Navigation**: Tabs form input and live draft layout separately on mobile.
- **Burger Menu Drawer**: Slides out configuration options on touch devices.

### 5. Secure File Download Integrity
- Uses a **Two-Step GET Redirect download pattern** to bypass Chrome's sandboxed download naming bugs, guaranteeing clean filenames (e.g. `Quotation_Al_Raha_Loft_26-06-2026.pdf`) instead of random UUIDs or local server URLs.

---

## 🛠️ Technology Stack

- **Backend**: Python 3.12+, Flask (Web framework), `python-docx` (XML Word manipulation), `docxtpl` (Word rendering), `docx2pdf` (COM Word-to-PDF compilation), `Pillow` (modern background compositor), `pywin32` (Windows COM bindings).
- **Frontend**: HTML5 (Semantic Structure), Vanilla CSS3 (Custom Dark Mode Layout & Glassmorphism effects), Javascript (ES6+, state manager & math compiler).

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Operating System**: Windows (required for PDF compilation due to Windows Microsoft Word COM components).
- **Dependencies**: Microsoft Word installed on the host system.

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
│   └── Dynamic_Quotation_Template.docx  # Master Word template containing layout anchors
│
├── static/
│   ├── app.js                           # Frontend state manager and number-to-words utility
│   ├── style.css                        # UI styling system (Glassmorphism layout and preview animations)
│   ├── new_logo.png                     # Cropped company logo icon
│   ├── image1.jpeg                      # Classic letterhead background
│   └── image1_v2.jpeg                   # Modern pre-composed background image
│
├── templates/
│   └── index.html                       # Application view with dynamic inputs
│
├── Generated_Documents/                 # Server storage of compiled files (ignored in git)
│   ├── Invoices/
│   ├── Quotations/
│   └── Receipts/
│
├── app.py                               # Flask server, document engine & COM PDF converter
├── start_app.bat                        # Double-click Windows startup script
├── .gitignore                           # Excludes build cache, venv, and user-generated outputs
└── README.md                            # Documentation
```

---

## 🔒 Security & Privacy (GitHub Best Practices)

When uploading this codebase to GitHub, the following files and directories are **automatically ignored** via the included [.gitignore](.gitignore) to protect sensitive data and prevent clutter:
- **`Generated_Documents/`**: Contains generated invoices, client contracts, and quotations with sensitive customer details. **Never upload this folder to a public repository.**
- **`.venv/` & `__pycache__/`**: Local Python packages and compiled cache files.
- **`temp_render.docx` / `temp.docx`**: Temporary compiler renders.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
