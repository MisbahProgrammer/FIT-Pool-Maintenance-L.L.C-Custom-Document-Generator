# Fit Pool Document & Technical Report Automation System

[![Python Version](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)
[![Flask Version](https://img.shields.io/badge/Flask-3.0%2B-green.svg)](https://flask.palletsprojects.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enterprise-grade, SEO-optimized, highly responsive Python-Flask web application designed for automatic document generation and technical report creation for **Fit Pool Building Maintenance L.L.C** (Abu Dhabi & Dubai, UAE).

It enables technicians and management to dynamically generate and export high-quality **Invoices, Quotations, Payment Receipts, Swimming Pool Cleaning Contracts, Renovation Proposals, Work Completion Reports, Leakage/Waterproofing Reports, and Technical Scope Documents** as formatted **Editable Word (`.docx`)** and **Print-Ready PDF** files directly from a mobile-friendly dashboard.

---

## 🌟 Comprehensive Feature Set

### 1. 🧹 Streamlined Navigation & Report Subtype Selector
- **Minimalist Sidebar Navigation**: Simplified into 4 primary document categories:
  - 📄 **Quotation**: Professional pricing estimates (`FP/QT-`).
  - 💼 **Invoice**: Client billing statements (`FP/INV-`).
  - 💸 **Payment Receipt**: Payment acknowledgment receipts (`FP/REC-`).
  - 📋 **Report**: Technical maintenance reports (`FP/WCR-`, `FP/SWR-`, `FP/LWR-`, `FP/SPC-`).
- **Dynamic Report Subtype Selector**: Selecting **Report** opens a dedicated dropdown in the form panel for specific report formats:
  - *Work Completion Report* (`FP/WCR-`)
  - *Site Inspection & Scope of Work Report* (`FP/SWR-`)
  - *Swimming Pool Leakage & Waterproofing Report* (`FP/LWR-`)
  - *Swimming Pool Cleaning Contract* (`FP/SPC-`)
  - *Custom Report*

### 2. 🧠 Smart Maintenance AI & Vocabulary Engine (Custom Work Topics)
- **`✍️ Other (Type Custom Work / Service Name)` Option**: Technicians can type any custom topic (e.g., *"Jacuzzi Jet Cleaning, Skimmer Basket Replacement, Pool Deck Painting, Chiller Gas Top-up"*).
- **Hybrid Keyword Matcher & Dynamic Vocabulary Construction**:
  - Automatically matches keywords against core domain categories (Pumps & Motors, Waterproofing, Tile Replacement, Electrical Panels, Filtration, Leakage, Chemical Treatment, Heat Pumps & AC, Plumbing, MEP, Civil Painting).
  - For new or custom topics, the engine automatically constructs:
    1. **Formal Scope Section Title** (e.g. *Work Execution & Scope Report: Jacuzzi Jet Cleaning And Deck Painting*).
    2. **4 Professional Technical Bullet Points** (*Technical Inspection & Assessment*, *Execution & Maintenance Work*, *System Testing & Performance Calibration*, *Final Handover*).
    3. **Pre-Populated Line Items**: Formats item descriptions cleanly with user topic and default quantity (`1 Job`).
    4. **Auto-Synced Subject Line**: Automatically selects matching subject category (`building maintenance work`, `plumbing maintenance work`, `electrical maintenance work`, `AC maintenance work`, `MEP maintenance work`, `swimming pool maintenance work`).

### 3. 🏊 Pre-Built Technical Maintenance Presets
Included standard presets in the **Technician Auto-Report Assistant**:
- 🏊 **Swimming Pool Renovation and Tiles Replacement**: Full 4-Phase Scope (Demolition, 4-Coat Waterproofing, Tiling & Anti-Slip Decking, Curing & 2-Year Waterproofing & Material Warranties).
- 📜 **Swimming Pool Cleaning Contract**: Complete clauses (Inclusions 1-6, Exclusions 1-3, Notes 1-4, 100% Payment Advance badge, Dual Signatures).
- 💡 **Swimming Pool Light Replacement**: Underwater LED light replacement & 12V safety transformer inspection.
- 🛠️ **Swimming Pool Overall Repair & Component Replacement**: Grouting, nozzles, magnetic contactors, pump relays.
- 🏊‍♂️ **Swimming Pool Deep Cleaning & Sanitization**: Pool draining, pressure washing, chemical sanitization.
- ⚙️ **Filtration System Upgrade & Sand Media**: 500mm sand filter, multiport valve, and 100kg sand media replacement.
- ⚡ **Control Panel & Electrical Replacements**: Magnet contactors, overload relays, and float valve automation.
- 🛡️ **Pump Room Waterproofing (5-Day Schedule)**: Mapei Mapetex Sel mesh, liquid membrane & 3-day curing.
- 💧 **Swimming Pool Leakage Repair (4-Step Process)**: Excavation, pipeline repair, pressure testing & concrete restoration.
- 🧪 **Swimming Pool Water Treatment & Chemical Balancing**: Shock dosing, pH/chlorine balancing & clarifier treatment.
- ⚙️ **Pump Room Motor Repair & Piping Overhaul**: Motor bearings overhaul, seals & PVC check valve replacement.
- ❄️ **Pool Heat Pump & AC Servicing**: Coil cleaning, refrigerant gas top-up & thermostat sensor calibration.
- 🔧 **MEP & AC Maintenance Services**: Evaporator coil chemical cleaning, drain line flushing & electrical checks.

### 4. 💰 Lump Sum Override & Empty Item Price Cells
- **Dedicated Lump Sum Override Card**: Enter a single lump sum amount (e.g., `4200.00 AED`) for the entire project.
- **Clean Empty Item Row Rendering**: When individual item prices are left empty (`""`), the item table displays **EMPTY** price cells instead of printing `0.00`.
- **Automatic English Currency Conversion**: Converts the total or lump sum override into formal English text (*"Four Thousand Two Hundred AED Only"*).

### 5. 📅 Document Validity Dropdown (10 Days Default)
- **Select Dropdown**: Choose validity directly from standard choices:
  - `10 days` (**Default**)
  - `7 days`
  - `15 days`
  - `30 days`
  - `Other (Custom)` (Opens custom text box for 60 days, 1 year, etc.)
- **Side-by-Side Toggle**: Includes **`✕ Remove` / `+ Add Validity`** button for instant visibility control.

### 6. 📸 Compact Passport-Sized Site Photos Attachment
- **Multi-Photo Upload**: Attach site photos directly from Mobile Cameras or PC.
- **High-Speed Browser Compressor**: Downscales 10MB+ camera photos to 1200px JPEGs in real-time.
- **Passport-Like Compact Width in Word (`.docx`) & PDF**: Rendered side-by-side at compact proportions (~1.8 inches / 4.5 cm wide) under the document badge to fit neatly without pushing text onto extra pages.
- **MS Word Resize Support**: Users can still click and drag corner handles inside MS Word to enlarge images if needed.

### 7. 🎨 Table Row Custom Color System
- Customize individual row background colors for category headers and section banners:
  - `Normal White` (Standard item row)
  - `Grey Header (#D9D9D9)` (Bold black text across full row background)
  - `Soft Grey (#F2F2F2)` (Soft category shading)
  - `Blue Banner (#0D05FA)` (Official blue banner background with bold white text)

### 8. 📜 Vertical Sidebar Scroll & Mobile Optimization
- `overflow-y: auto` with a custom dark accent scrollbar (`6px`) ensuring all controls, section toggles, layout options, and version badges scroll smoothly on desktop screens and mobile phone drawers.

---

## 🛠️ Technology Stack

- **Backend**: Python 3.12+, Flask (Web framework), `python-docx` (XML Word manipulation & photo grid layout), `docxtpl` (Template rendering), `docx2pdf` (COM Word-to-PDF compilation), `Pillow` (PIL image compositor), `pywin32` (Windows COM bindings).
- **Frontend**: HTML5 (Semantic Structure), Vanilla CSS3 (Custom Dark Mode & Glassmorphic Layout), JavaScript (ES6+, Smart AI Maintenance Engine, canvas compressor, state manager & currency converter).

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Operating System**: Windows (recommended for DOCX-to-PDF compilation via Microsoft Word COM components).
- **Python**: Version 3.8 or higher.

### Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MisbahProgrammer/FIT-Pool-Maintenance-L.L.C-Custom-Document-Generator.git
   cd FIT-Pool-Maintenance-L.L.C-Custom-Document-Generator
   ```

2. **Create Virtual Environment & Install Dependencies**:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Run the Application**:
   ```bash
   python app.py
   ```
   Or double-click `start_app.bat`.

4. **Access in Browser**:
   Open `http://127.0.0.1:5000` in your web browser or mobile phone on the same Wi-Fi network.

---

## 📦 Copy-Paste Git Commit Command

Run this command in your terminal to commit and push all changes to GitHub:

```bash
git add .
git commit -m "docs & cleanup: update README.md with Smart AI engine, lump sum override, compact photo sizing, and clean test artifacts

- Updated README.md with comprehensive documentation of all features, Smart AI Engine, custom report topics, and compact photo sizing
- Cleaned up root directory temporary test files (test_*.docx / test_*.pdf)
- Ensured 100% clean source code repository"
git push origin main
```
