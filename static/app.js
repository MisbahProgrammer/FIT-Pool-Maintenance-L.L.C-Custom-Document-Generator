// Document States and Defaults
let currentDocType = "Quotation";
let showValidity = true;
let items = [
    { desc: "Standard Swimming pool maintenance chemical and cleaning service", qty: "1 No's", amount: 1500.00 }
];
let uploadedPhotos = []; // [{ id, dataUrl, caption }]

// Default document configurations
const docPresets = {
    Quotation: {
        title: "QUOTATION",
        refNo: "FP/QT-2026/0402",
        validity: "1 month",
        city: "Abu Dhabi",
        subject: "Quotation for swimming pool maintenance work",
        intro: "With reference to your inquiry for the swimming pool maintenance work. We are pleased to submit our best competitive offer for your kind consideration.",
        terms: "75% Advance payment\n25% Payment after completion of work",
        account: "Ijaz Hussain\nMeshruq Bank\nIBAN: AE 660330000019200061112\nContact No: +971564378296",
        footerText: "Thanks and Regards: Fit Pool Building Maintenance L.L.C",
        footerColor: "#0d05fa",
        showPricing: true,
        showAdvance: false,
        showValidity: true
    },
    Invoice: {
        title: "INVOICE",
        refNo: "FP/INV-2026/0402",
        validity: "1 month",
        city: "Abu Dhabi",
        subject: "Invoice for swimming pool maintenance work",
        intro: "With reference to the completed swimming pool maintenance work. We are pleased to submit our invoice for your kind payment.",
        terms: "Payment is due within 7 days of invoice date.\nLate payments may incur additional processing fees.",
        account: "Ijaz Hussain\nMeshruq Bank\nIBAN: AE 660330000019200061112\nContact No: +971564378296",
        footerText: "Thanks and Regards: Fit Pool Building Maintenance L.L.C",
        footerColor: "#0d05fa",
        showPricing: true,
        showAdvance: false,
        showValidity: false
    },
    Receipt: {
        title: "PAYMENT RECEIPT",
        refNo: "FP/REC-2026/0402",
        validity: "1 month",
        city: "Abu Dhabi",
        subject: "Payment Receipt for swimming pool maintenance work",
        intro: "We are pleased to acknowledge receipt of payment for the swimming pool maintenance work as detailed below.",
        terms: "Paid in full. Thank you for your business!",
        account: "",
        footerText: "Thanks and Regards: Fit Pool Building Maintenance L.L.C",
        footerColor: "#0d05fa",
        showPricing: true,
        showAdvance: false,
        showValidity: false
    },
    "Work Completion Report": {
        title: "WORK COMPLETION REPORT",
        refNo: "FP/WCR-2026/0402",
        validity: "1 month",
        city: "Abu Dhabi",
        subject: "Work Completion Report for swimming pool maintenance work",
        intro: "This report confirms the successful completion of the swimming pool maintenance, deep cleaning, and equipment restoration work as detailed below.",
        terms: "",
        account: "Ijaz Hussain\nMeshruq Bank\nIBAN: AE 660330000019200061112\nContact No: +971564378296",
        footerText: "Thanks and Regards: Fit Pool Building Maintenance L.L.C",
        footerColor: "#0d05fa",
        showPricing: true,
        showAdvance: false,
        showValidity: false
    },
    "Site Inspection & Scope Report": {
        title: "REPORT AND SCOPE OF WORK",
        refNo: "FP/SWR-2026/0402",
        validity: "1 month",
        city: "Abu Dhabi",
        subject: "Site Inspection Report and Scope of Work",
        intro: "Following our technical site inspection, this report outlines the scope of work, technical requirements, and standard operating procedures for your property.",
        terms: "75% Advance payment required prior to commencement.",
        account: "Ijaz Hussain\nMeshruq Bank\nIBAN: AE 660330000019200061112\nContact No: +971564378296",
        footerText: "Thanks and Regards: Fit Pool Building Maintenance L.L.C",
        footerColor: "#0d05fa",
        showPricing: false,
        showAdvance: false,
        showValidity: true
    },
    "Leakage & Waterproofing Report": {
        title: "LEAKAGE REPAIR & WATERPROOFING REPORT",
        refNo: "FP/LWR-2026/0402",
        validity: "1 month",
        city: "Abu Dhabi",
        subject: "Work Execution Report: Swimming Pool Leakage Repair & Waterproofing",
        intro: "This report outlines the step-by-step technical repair, pressure testing, and waterproofing protocol executed for the swimming pool and pump room infrastructure.",
        terms: "Payment terms per contract agreement.",
        account: "Ijaz Hussain\nMeshruq Bank\nIBAN: AE 660330000019200061112\nContact No: +971564378296",
        footerText: "Thanks and Regards: Fit Pool Building Maintenance L.L.C",
        footerColor: "#0d05fa",
        showPricing: false,
        showAdvance: false,
        showValidity: true
    }
};

// Technician Auto-Report Work Presets
const workPresets = {
    pool_light_replacement: {
        title: "Swimming Pool Light Replacement",
        subject: "swimming pool light replacement",
        scope: `• Pool Light Replacement: Replaced non-working underwater pool light fixture with a new LED warm white light unit.
• Transformer & Wiring Inspection: Checked 12V safety transformer connections and verified safe underwater electrical operation.
• Testing & Verification: All pool lights tested, fully operational, and illuminated successfully.`,
        item: { desc: "Swimming Pool under water light .", qty: "1 No's", amount: 450.00 }
    },
    pool_overall_repair: {
        title: "COMPLETED WORKS & REPLACED COMPONENTS",
        subject: "swimming pool maintenance work",
        scope: `• Inlet Nozzles: Replaced 2 damaged inlet nozzles.
• Pool Tile & Grouting: Repaired tile and applied missing grouting across pool floor and walls.
• Pool Lights: Repaired and restored functionality to 2 non-working swimming pool lights.
• Light Electrical Transformers: Replaced 2 electrical transformers for both pool lights.
• Pool Light Magnetic Contactor: Replaced 1 burnt/noisy magnetic contactor electrical part for the pool lights.
• Filtration Pump Relay: Replaced 1 noisy magnetic contactor overload relay for the swimming pool filtration pump.
• Filtration Pump Valve: Replaced 1 damaged filtration pump valve.
• On-Site Technical Labor: Complete physical installation, electrical testing, and maintenance work.`,
        item: { desc: "Swimming Pool maintenance, tile grouting, light & pump repair parts.", qty: "1 Lot", amount: 2100.00 }
    },
    pool_deep_cleaning: {
        title: "Cleaning and Maintenance Services",
        subject: "swimming pool maintenance work",
        scope: `• Apt 601 Pool Deep Cleaning: Performed a complete draining of the pool followed by pressure washing and chemical deep cleaning of all floors and walls.
• Debris and Algae Removal: Successfully removed all algae, calcium deposits, and general debris from the pool structure.
• Sanitization: Completed full disinfection and preparation of the pool for refilling.
• Apt 605 Pool Deep Cleaning: Completed a full deep cleaning of the second pool unit.
• Pump Room Maintenance: Conducted a thorough cleaning of the pump room located at Apt 605.`,
        item: { desc: "Swimming pool chemical deep cleaning & sanitization service.", qty: "1 Job", amount: 1500.00 }
    },
    filtration_upgrade: {
        title: "System Repairs and Modifications",
        subject: "swimming pool maintenance work",
        scope: `• Filtration System Replacement: Modified the filtration system by removing the existing cartridge filter, which was identified as unsuitable and ineffective for clearing the pool water.
• Sand Filter Installation: Installed a new 500mm Filter and Multiport valve (50m) to upgrade the system.
• Media Upgrade: Added 100kg of sand media to the new filtration system to ensure proper water clarity.
• Lighting Upgrade: Installed 4 new LED warm white swimming pool lights.`,
        item: { desc: "Filter 500mm, Multiport valve, 100kg Sand Media & 4 LED Lights.", qty: "1 Set", amount: 7650.00 }
    },
    electrical_panel: {
        title: "Control Panel & Electrical Replacements",
        subject: "electrical maintenance work",
        scope: `The following work has been finished:
• Electrical Replacements: Installed 2 new magnet contactors and 2 overload relays in the control panel.
• System Repairs: Replaced the filtration pump to ensure proper pool circulation.
• Automation Upgrade: Installed a new float valve to automate the swimming pool water filling process.`,
        item: { desc: "Control Panel Magnet contactors, relays & Float valve automation.", qty: "1 Set", amount: 2100.00 }
    },
    waterproofing_5day: {
        title: "Report and Scope of Work: Waterproofing",
        subject: "building maintenance work",
        scope: `This report outlines the standard operating procedure for the waterproofing of the pump room, which covers an area of 40 to 44 square meters. The duration of this project is scheduled for 5 days.

Site Conditions & Challenges: The project presents a level of difficulty due to existing PVC piping, valves, pump, and filters.

5-Day Work Schedule:
• Day 1: Surface Preparation and Crack Repair - Thorough inspection and filling all holes/cracks using specialized chemical crack filler.
• Day 2: First Coat Application - Application of cement and liquid waterproofing chemical mixture with 24-hour curing.
• Day 3: Mesh Reinforcement and Second Coat - Embedding Mapei Mapetex Sel non-woven fabric mesh and applying second liquid membrane coat.
• Day 4: Complex Detailing and Wall Upturns - Waterproofing around PVC pipes, filters, risers, and extending up walls to 300mm height.
• Day 5: Final Inspection and Handover Preparation - Final inspection and 72-hour curing prior to active use.`,
        item: { desc: "Pump room 5-day liquid membrane waterproofing treatment.", qty: "44 Sqm", amount: 4500.00 }
    },
    leakage_repair: {
        title: "Work Execution Report: Swimming Pool Leakage Repair",
        subject: "plumbing maintenance work",
        scope: `• Concrete Cutting & Deep Excavation: Accurately locating leakage point, cutting surface concrete, and excavating underground pipeline.
• Pipeline Repair & Fixation: Repairing damaged pipeline section and securely stabilizing pipe structure.
• Pressure Testing: Conducting mandatory pressure test to ensure zero hidden leaks remain in system.
• System Restart & Final Restoration: Verifying full functionality under normal working conditions and refilling excavated area with concrete surface restoration.`,
        item: { desc: "Underground pool pipeline leak detection, excavation & repair.", qty: "1 Job", amount: 3200.00 }
    },
    pool_water_treatment: {
        title: "Swimming Pool Water Treatment & Chemical Balancing",
        subject: "swimming pool maintenance work",
        scope: `• Water Analysis: Tested pH, free chlorine, cyanuric acid, and total alkalinity levels.
• Shock Chemical Treatment: Dosed pool water with chlorine shock treatment and anti-algaecide chemical.
• Clarifier & Flocculant Application: Added pool water clarifier to eliminate turbidity and restore crystal-clear water.
• Vacuuming & Filtration Run: Conducted manual bottom vacuuming and ran filtration system for 12 continuous hours.`,
        item: { desc: "Pool water chemical balancing & shock dosing treatment.", qty: "1 Job", amount: 650.00 }
    },
    pump_piping_overhaul: {
        title: "Pump Room Motor Repair & Piping Overhaul",
        subject: "plumbing maintenance work",
        scope: `• Pump Motor Overhaul: Serviced pool circulation pump motor, replaced worn bearings, and renewed mechanical seals.
• Check Valve & Union Replacements: Replaced 2 faulty PVC non-return check valves and 2 high-pressure ball unions.
• Pressure Gauge Installation: Fitted 2 new stainless steel liquid-filled pressure gauges on filtration lines.`,
        item: { desc: "Circulation pump motor bearings & PVC check valves overhaul.", qty: "1 Set", amount: 1250.00 }
    },
    pool_heat_pump: {
        title: "Pool Heat Pump & AC Maintenance Services",
        subject: "AC maintenance work",
        scope: `• Heat Pump Servicing: Cleaned titanium heat exchanger coils and inspected R410A refrigerant operating pressures.
• Electrical & Sensor Calibration: Calibrated digital water temperature thermostat sensors and verified flow switch operation.
• Fan & Compressor Inspection: Inspected compressor amp draw and lubricated condenser fan motor.`,
        item: { desc: "Pool heat pump coil cleaning, gas top-up & sensor calibration.", qty: "1 Job", amount: 850.00 }
    },
    mep_ac_maintenance: {
        title: "MEP & AC Maintenance Services",
        subject: "MEP maintenance work",
        scope: `• AC Coil & Filter Cleaning: Conducted deep chemical cleaning of indoor evaporator coils and outdoor condenser units.
• Refrigerant Top-up: Checked system pressures and topped up R410A refrigerant to optimal operating level.
• Drainage Flushing: Cleared and flushed all AC condensate drain lines to prevent overflow and water leaks.
• MEP Inspection: Checked electrical breaker connections, water pump pressure switches, and plumbing fixtures.`,
        item: { desc: "Comprehensive MEP & AC chemical cleaning and preventive maintenance.", qty: "1 Lot", amount: 1800.00 }
    }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    // Set date field to today
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    document.getElementById("doc-date").value = `${dd}/${mm}/${yyyy}`;

    // Load defaults
    loadPreset(currentDocType);
    renderItemsTable();
    onVersionChange();
    setupDragAndDrop();
    updatePreview();
});

// Load Presets when changing Document Type
function loadPreset(docType) {
    const preset = docPresets[docType] || docPresets.Quotation;
    
    document.getElementById("main-heading").innerText = `Generate ${docType}`;
    document.getElementById("doc-ref").value = preset.refNo;
    
    // Reset subject select to default first option
    document.getElementById("doc-subject").value = "swimming pool maintenance work";
    document.getElementById("doc-custom-subject").value = "";
    document.getElementById("custom-subject-group").style.display = "none";
    
    updateIntroText();

    document.getElementById("doc-validity").value = preset.validity;
    document.getElementById("doc-city").value = preset.city;
    document.getElementById("doc-custom-city").value = "";
    document.getElementById("custom-city-group").style.display = "none";
    document.getElementById("doc-terms").value = preset.terms;
    document.getElementById("doc-account").value = preset.account;
    document.getElementById("doc-footer-text").value = preset.footerText;
    document.getElementById("doc-footer-color").value = preset.footerColor;
    document.getElementById("color-hex-val").innerText = preset.footerColor;

    // Apply document section toggle defaults
    document.getElementById("pricing-table-toggle").checked = preset.showPricing;
    document.getElementById("advance-remaining-toggle").checked = preset.showAdvance;
    
    // Apply validity state
    showValidity = preset.showValidity;
    syncValidityUI();

    updatePreview();
}

function syncValidityUI() {
    const valInput = document.getElementById("doc-validity");
    const btn = document.getElementById("btn-toggle-validity");
    const toggleSwitch = document.getElementById("validity-toggle");
    
    if (showValidity) {
        valInput.disabled = false;
        valInput.style.opacity = "1";
        if (!valInput.value.trim()) valInput.value = "1 month";
        if (btn) {
            btn.innerText = "✕ Remove";
            btn.style.color = "var(--danger)";
        }
        if (toggleSwitch) toggleSwitch.checked = true;
    } else {
        valInput.disabled = true;
        valInput.style.opacity = "0.4";
        if (btn) {
            btn.innerText = "+ Add Validity";
            btn.style.color = "var(--success)";
        }
        if (toggleSwitch) toggleSwitch.checked = false;
    }
}

function toggleValidityField() {
    showValidity = !showValidity;
    syncValidityUI();
    updatePreview();
}

function toggleValidityFromSidebar() {
    showValidity = document.getElementById("validity-toggle").checked;
    syncValidityUI();
    updatePreview();
}

function onCityChange() {
    const citySelect = document.getElementById("doc-city").value;
    const customCityGroup = document.getElementById("custom-city-group");
    if (citySelect === "Other") {
        customCityGroup.style.display = "flex";
    } else {
        customCityGroup.style.display = "none";
    }
}

function onSubjectChange() {
    const subjectSelect = document.getElementById("doc-subject").value;
    const customSubjectGroup = document.getElementById("custom-subject-group");
    
    if (subjectSelect === "Other") {
        customSubjectGroup.style.display = "flex";
    } else {
        customSubjectGroup.style.display = "none";
    }
    
    updateIntroText();
}

function onCustomSubjectInput() {
    updateIntroText();
}

function updateIntroText() {
    const subjectSelect = document.getElementById("doc-subject").value;
    const customSubject = document.getElementById("doc-custom-subject").value;
    const subjectVal = subjectSelect === "Other" ? (customSubject || "maintenance work") : subjectSelect;
    
    let introText = "";
    if (currentDocType === "Quotation") {
        introText = `With reference to your inquiry for the ${subjectVal}. We are pleased to submit our best competitive offer for your kind consideration.`;
    } else if (currentDocType === "Invoice") {
        introText = `With reference to the completed ${subjectVal}. We are pleased to submit our invoice for your kind payment.`;
    } else if (currentDocType === "Receipt") {
        introText = `We are pleased to acknowledge receipt of payment for the ${subjectVal} as detailed below.`;
    } else if (currentDocType === "Work Completion Report") {
        introText = `This report confirms the successful completion of the ${subjectVal} as detailed below.`;
    } else if (currentDocType === "Site Inspection & Scope Report") {
        introText = `Following our site inspection for the ${subjectVal}, this report outlines the scope of work and technical requirements.`;
    } else if (currentDocType === "Leakage & Waterproofing Report") {
        introText = `This report details the work execution and technical steps for the ${subjectVal}.`;
    }
    
    document.getElementById("doc-intro").value = introText;
}

function onVersionChange() {
    const version = document.getElementById("template-version").value;
    const a4Page = document.getElementById("document-preview");
    if (version === "1.0") {
        a4Page.classList.add("version-classic");
    } else {
        a4Page.classList.remove("version-classic");
    }
}

// Set Document Type Handler
function setDocumentType(docType) {
    currentDocType = docType;
    
    document.querySelectorAll(".doc-btn").forEach(btn => btn.classList.remove("active"));
    if (docType === "Quotation") document.getElementById("btn-quotation").classList.add("active");
    if (docType === "Invoice") document.getElementById("btn-invoice").classList.add("active");
    if (docType === "Receipt") document.getElementById("btn-receipt").classList.add("active");
    if (docType === "Work Completion Report") document.getElementById("btn-completion-report").classList.add("active");
    if (docType === "Site Inspection & Scope Report") document.getElementById("btn-scope-report").classList.add("active");
    if (docType === "Leakage & Waterproofing Report") document.getElementById("btn-leakage-report").classList.add("active");

    loadPreset(docType);
}

// Technician Auto-Report Preset Helper
function applyWorkPreset() {
    const presetKey = document.getElementById("quick-preset-select").value;
    if (!presetKey || !workPresets[presetKey]) {
        alert("Please select a Work Category Preset from the dropdown first!");
        return;
    }

    const preset = workPresets[presetKey];
    document.getElementById("doc-scope-title").value = preset.title;
    document.getElementById("doc-scope").value = preset.scope;
    document.getElementById("scope-toggle").checked = true;

    if (preset.subject) {
        document.getElementById("doc-subject").value = preset.subject;
        updateIntroText();
    }

    if (preset.item) {
        items = [{ desc: preset.item.desc, qty: preset.item.qty, amount: preset.item.amount }];
        renderItemsTable();
    }

    updatePreview();
}

// Client-Side High-Speed Image Compressor (Downscales camera photos to max 1200px JPEG)
function handlePhotoUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const maxDim = 1200; // max dimension 1200px for crystal-clear print quality
                
                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
                uploadedPhotos.push({
                    id: Date.now() + "_" + index + "_" + Math.random().toString(36).substr(2, 5),
                    dataUrl: compressedDataUrl,
                    caption: file.name.replace(/\.[^/.]+$/, "")
                });
                renderPhotosList();
                updatePreview();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    event.target.value = "";
}

function setupDragAndDrop() {
    const dropzone = document.getElementById("photo-dropzone");
    if (!dropzone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.style.borderColor = "var(--accent)";
            dropzone.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.style.borderColor = "var(--border-dark)";
            dropzone.style.backgroundColor = "rgba(15, 23, 42, 0.5)";
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files && files.length > 0) {
            handlePhotoUpload({ target: { files: files } });
        }
    }, false);
}

function renderPhotosList() {
    const container = document.getElementById("photos-list-container");
    container.innerHTML = "";

    uploadedPhotos.forEach(photo => {
        const item = document.createElement("div");
        item.className = "photo-card-item";
        item.innerHTML = `
            <img src="${photo.dataUrl}" alt="Site Photo">
            <input type="text" value="${photo.caption}" oninput="updatePhotoCaption('${photo.id}', this.value)" placeholder="Caption (e.g. Before / After Work)">
            <button type="button" class="btn-remove-photo" onclick="removePhoto('${photo.id}')">×</button>
        `;
        container.appendChild(item);
    });
}

function updatePhotoCaption(id, val) {
    const photo = uploadedPhotos.find(p => p.id === id);
    if (photo) {
        photo.caption = val;
        updatePreview();
    }
}

function removePhoto(id) {
    uploadedPhotos = uploadedPhotos.filter(p => p.id !== id);
    renderPhotosList();
    updatePreview();
}

// Render dynamic items in input form
function renderItemsTable() {
    const tbody = document.getElementById("items-tbody");
    tbody.innerHTML = "";

    items.forEach((item, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <input type="text" value="${item.desc}" oninput="updateItemField(${idx}, 'desc', this.value)" placeholder="Item Description">
            </td>
            <td>
                <input type="text" value="${item.qty}" oninput="updateItemField(${idx}, 'qty', this.value)" placeholder="Qty (e.g. 1 No's)">
            </td>
            <td>
                <input type="number" step="0.01" value="${item.amount}" oninput="updateItemField(${idx}, 'amount', this.value)" placeholder="Amount (AED)">
            </td>
            <td>
                <button type="button" class="btn-delete-row" onclick="removeItemRow(${idx})">×</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function addItemRow() {
    items.push({ desc: "", qty: "1 No's", amount: 0.00 });
    renderItemsTable();
    updatePreview();
}

function removeItemRow(idx) {
    if (items.length > 1) {
        items.splice(idx, 1);
    } else {
        items[0] = { desc: "", qty: "1 No's", amount: 0.00 };
    }
    renderItemsTable();
    updatePreview();
}

function updateItemField(idx, field, val) {
    if (field === 'amount') {
        items[idx][field] = parseFloat(val) || 0;
    } else {
        items[idx][field] = val;
    }
    updatePreview();
}

function toggleVat() {
    updatePreview();
}

function formatScopeText(text) {
    if (!text || !text.trim()) return "";

    const lines = text.split('\n');
    let html = "";
    let inList = false;

    lines.forEach(line => {
        let trimmed = line.trim();
        if (!trimmed) return;

        if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
            if (!inList) {
                html += "<ul>";
                inList = true;
            }
            let content = trimmed.substring(1).trim();

            if (content.includes(":") && !content.startsWith("http")) {
                const parts = content.split(":");
                content = `<strong>${parts[0]}:</strong>${parts.slice(1).join(":")}`;
            }

            html += `<li>${content}</li>`;
        } else {
            if (inList) {
                html += "</ul>";
                inList = false;
            }
            if (trimmed.includes(":") && trimmed.length < 80) {
                const parts = trimmed.split(":");
                html += `<p style="margin-top: 8px; margin-bottom: 4px;"><strong>${parts[0]}:</strong>${parts.slice(1).join(":")}</p>`;
            } else {
                html += `<p style="margin-bottom: 6px;">${trimmed}</p>`;
            }
        }
    });

    if (inList) {
        html += "</ul>";
    }

    return html;
}

// Live Update Preview Section
function updatePreview() {
    // Read Section Toggles
    const showPricing = document.getElementById("pricing-table-toggle").checked;
    const showPhotos = document.getElementById("photos-toggle").checked;
    const showScope = document.getElementById("scope-toggle").checked;
    const showAdvance = document.getElementById("advance-remaining-toggle").checked;
    const showTerms = document.getElementById("terms-toggle").checked;
    const showAccount = document.getElementById("account-toggle").checked;

    // Toggle Form Card Visibilities
    document.getElementById("form-card-pricing").style.display = showPricing ? "block" : "none";
    document.getElementById("form-card-photos").style.display = showPhotos ? "block" : "none";
    document.getElementById("form-card-scope").style.display = showScope ? "block" : "none";
    document.getElementById("form-card-advance").style.display = showAdvance ? "block" : "none";
    document.getElementById("form-group-terms").style.display = showTerms ? "block" : "none";
    document.getElementById("form-group-account").style.display = showAccount ? "block" : "none";

    // Client info
    const clientName = document.getElementById("client-name").value;
    const clientAddress = document.getElementById("client-address").value;

    const nameEl = document.getElementById("prev-client-name");
    const addrEl = document.getElementById("prev-client-address");

    if (clientName.trim()) {
        nameEl.innerText = clientName;
        nameEl.classList.remove("empty-field");
    } else {
        nameEl.innerText = "Client Name";
        nameEl.classList.add("empty-field");
    }

    if (clientAddress.trim()) {
        addrEl.innerText = clientAddress;
        addrEl.classList.remove("empty-field");
    } else {
        addrEl.innerText = "Client Address";
        addrEl.classList.add("empty-field");
    }

    // City logic in preview
    const citySelect = document.getElementById("doc-city").value;
    const customCity = document.getElementById("doc-custom-city").value;
    const cityVal = citySelect === "Other" ? (customCity || "UAE City") : citySelect;
    document.getElementById("prev-city").innerText = cityVal;

    // Metadata
    const refNo = document.getElementById("doc-ref").value;
    const dateVal = document.getElementById("doc-date").value || "25/06/2026";
    const validityVal = document.getElementById("doc-validity").value || "1 month";
    
    document.getElementById("prev-date").innerText = dateVal;
    document.getElementById("prev-date-type").innerText = currentDocType;
    
    const refContainer = document.getElementById("prev-ref-container");
    const refVal = document.getElementById("prev-ref");
    if (refNo.trim()) {
        refContainer.style.display = "block";
        refVal.innerText = refNo.trim();
    } else {
        refContainer.style.display = "none";
    }

    // Toggle Validity in preview
    const validityContainer = document.getElementById("prev-validity-container");
    if (showValidity && validityVal.trim()) {
        validityContainer.style.display = "block";
        document.getElementById("prev-validity").innerText = validityVal;
    } else {
        validityContainer.style.display = "none";
    }
    
    const docPreset = docPresets[currentDocType];
    const docTitle = docPreset ? docPreset.title : currentDocType.toUpperCase();
    document.getElementById("prev-doc-title").innerText = docTitle;
    
    // Subject and Intro
    const subjectSelect = document.getElementById("doc-subject").value;
    const customSubject = document.getElementById("doc-custom-subject").value;
    const subjectVal = subjectSelect === "Other" ? (customSubject || "maintenance work") : subjectSelect;
    
    const fullSubjectText = `${currentDocType} for ${subjectVal}`;
    document.getElementById("prev-subject").innerText = fullSubjectText;
    document.getElementById("prev-intro").innerText = document.getElementById("doc-intro").value || "";

    // Site Photos Preview
    const photosSection = document.getElementById("prev-photos-section");
    const photosGrid = document.getElementById("prev-photos-grid");
    if (showPhotos && uploadedPhotos.length > 0) {
        photosSection.style.display = "block";
        photosGrid.innerHTML = "";
        uploadedPhotos.forEach(photo => {
            const box = document.createElement("div");
            box.className = "preview-photo-box";
            box.innerHTML = `
                <img src="${photo.dataUrl}" alt="${photo.caption}">
                ${photo.caption ? `<div class="caption-text">${photo.caption}</div>` : ""}
            `;
            photosGrid.appendChild(box);
        });
    } else {
        photosSection.style.display = "none";
    }

    // Scope & Work Bullets Preview
    const scopeSection = document.getElementById("prev-scope-section");
    const scopeTitleEl = document.getElementById("prev-scope-title");
    const scopeContentEl = document.getElementById("prev-scope-content");
    const scopeTitleVal = document.getElementById("doc-scope-title").value;
    const scopeTextVal = document.getElementById("doc-scope").value;

    if (showScope && (scopeTitleVal.trim() || scopeTextVal.trim())) {
        scopeSection.style.display = "block";
        scopeTitleEl.innerText = scopeTitleVal.trim() || "Work Scope & Details";
        scopeContentEl.innerHTML = formatScopeText(scopeTextVal);
    } else {
        scopeSection.style.display = "none";
    }

    // Items Pricing Table Preview
    const prevTableContainer = document.getElementById("prev-table-container");
    if (showPricing) {
        prevTableContainer.style.display = "block";

        let subtotal = 0;
        items.forEach(item => {
            subtotal += item.amount;
        });

        const isVat = document.getElementById("vat-toggle").checked;
        let grandTotal = subtotal;
        
        if (isVat) {
            const vatAmount = subtotal * 0.05;
            grandTotal = subtotal + vatAmount;
            
            document.getElementById("prev-row-subtotal").style.display = "table-row";
            document.getElementById("prev-row-vat").style.display = "table-row";
            
            document.getElementById("prev-subtotal-val").innerText = subtotal.toFixed(2);
            document.getElementById("prev-vat-val").innerText = vatAmount.toFixed(2);
            document.getElementById("prev-total-label").innerText = "Grand Total:";
        } else {
            document.getElementById("prev-row-subtotal").style.display = "none";
            document.getElementById("prev-row-vat").style.display = "none";
            document.getElementById("prev-total-label").innerText = "Total Amount:";
        }

        document.getElementById("prev-total-val").innerText = grandTotal.toFixed(2);

        const words = convertNumberToWords(grandTotal);
        document.getElementById("prev-words-val").innerText = words;

        const prevTbody = document.getElementById("prev-table-tbody");
        prevTbody.innerHTML = "";
        items.forEach((item, idx) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${String(idx + 1).padStart(2, '0')}</td>
                <td style="white-space: pre-wrap;">${item.desc || "Item Description"}</td>
                <td>${item.qty}</td>
                <td>${item.amount.toFixed(2)}</td>
            `;
            prevTbody.appendChild(tr);
        });
    } else {
        prevTableContainer.style.display = "none";
    }

    // Advance & Remaining Payment Section
    const advanceSection = document.getElementById("prev-advance-remaining-section");
    if (showAdvance) {
        advanceSection.style.display = "block";
        const advVal = parseFloat(document.getElementById("doc-advance-amount").value) || 0;
        const remVal = parseFloat(document.getElementById("doc-remaining-amount").value) || 0;
        document.getElementById("prev-advance-val").innerText = `${advVal.toFixed(2)} AED`;
        document.getElementById("prev-remaining-val").innerText = `${remVal.toFixed(2)} AED`;
    } else {
        advanceSection.style.display = "none";
    }

    // Terms & Conditions section
    const termsVal = document.getElementById("doc-terms").value;
    const termsSection = document.getElementById("prev-terms-section");
    if (showTerms && termsVal.trim()) {
        termsSection.style.display = "block";
        document.getElementById("prev-terms").innerText = termsVal;
    } else {
        termsSection.style.display = "none";
    }

    // Account details section
    const accVal = document.getElementById("doc-account").value;
    const accSection = document.getElementById("prev-account-section");
    if (showAccount && accVal.trim()) {
        accSection.style.display = "block";
        document.getElementById("prev-account").innerText = accVal;
    } else {
        accSection.style.display = "none";
    }

    // Footer Banner
    const footerText = document.getElementById("doc-footer-text").value;
    const footerColor = document.getElementById("doc-footer-color").value;
    const prevFooter = document.getElementById("prev-footer-banner");

    prevFooter.innerText = footerText;
    prevFooter.style.backgroundColor = footerColor;
    document.getElementById("color-hex-val").innerText = footerColor.toUpperCase();
}

// Submit data to backend and download document
function generateDocument(format) {
    const clientName = document.getElementById("client-name").value;
    if (!clientName.trim()) {
        alert("Please enter a Client / Company Name before exporting!");
        document.getElementById("client-name").focus();
        return;
    }

    let subtotal = 0;
    items.forEach(item => {
        subtotal += item.amount;
    });

    const isVat = document.getElementById("vat-toggle").checked;
    const grandTotal = isVat ? subtotal * 1.05 : subtotal;
    const wordsTotal = convertNumberToWords(grandTotal);

    const citySelect = document.getElementById("doc-city").value;
    const customCity = document.getElementById("doc-custom-city").value;
    const cityVal = citySelect === "Other" ? (customCity || "Abu Dhabi") : citySelect;

    const subjectSelect = document.getElementById("doc-subject").value;
    const customSubject = document.getElementById("doc-custom-subject").value;
    const subjectVal = subjectSelect === "Other" ? (customSubject || "maintenance work") : subjectSelect;
    const subjectLine = `${currentDocType} for ${subjectVal}`;

    const showPricing = document.getElementById("pricing-table-toggle").checked;
    const showPhotos = document.getElementById("photos-toggle").checked;
    const showScope = document.getElementById("scope-toggle").checked;
    const showAdvance = document.getElementById("advance-remaining-toggle").checked;
    const showTerms = document.getElementById("terms-toggle").checked;
    const showAccount = document.getElementById("account-toggle").checked;

    const payload = {
        doc_type: currentDocType,
        client_name: clientName,
        client_address: document.getElementById("client-address").value,
        contact_no: document.getElementById("client-contact").value,
        date: document.getElementById("doc-date").value,
        ref_no: document.getElementById("doc-ref").value,
        validity: document.getElementById("doc-validity").value,
        show_validity: showValidity,
        city: cityVal,
        subject: subjectLine,
        intro_text: document.getElementById("doc-intro").value,
        items: items,
        vat_enabled: isVat,
        vat_rate: 5,
        words_total: wordsTotal,
        terms: document.getElementById("doc-terms").value,
        account_details: document.getElementById("doc-account").value,
        footer_text: document.getElementById("doc-footer-text").value,
        footer_color: document.getElementById("doc-footer-color").value,
        format: format,
        version: document.getElementById("template-version").value,
        
        photos: uploadedPhotos,
        show_pricing: showPricing,
        show_photos: showPhotos,
        show_scope: showScope,
        show_advance: showAdvance,
        show_terms: showTerms,
        show_account: showAccount,
        advance_amount: parseFloat(document.getElementById("doc-advance-amount").value) || 0,
        remaining_amount: parseFloat(document.getElementById("doc-remaining-amount").value) || 0,
        scope_title: document.getElementById("doc-scope-title").value,
        scope_text: document.getElementById("doc-scope").value
    };

    document.getElementById("loading-overlay").style.display = "flex";

    if (format === 'pdf') {
        const sourceElement = document.getElementById("document-preview");
        const element = sourceElement.cloneNode(true);
        
        element.style.boxSizing = "border-box";
        element.style.width = "794px";
        element.style.height = "auto";
        element.style.minHeight = "1123px";
        element.style.overflow = "visible";
        element.style.padding = "45px 50px";
        element.style.fontSize = "11pt";
        element.style.transform = "none";
        element.style.borderRadius = "0";
        element.style.boxShadow = "none";
        
        element.querySelectorAll(".company-header-real").forEach(header => {
            header.style.height = "85px";
            header.style.marginBottom = "25px";
            header.style.display = "flex";
        });
        element.querySelectorAll(".header-logo-img").forEach(img => {
            img.src = window.location.origin + "/static/new_logo.png";
            img.style.height = "65px";
            img.style.width = "auto";
        });
        element.querySelectorAll(".header-title-text h2").forEach(h2 => {
            h2.style.fontSize = "0.95rem";
            h2.style.display = "block";
        });
        element.querySelectorAll(".header-right-wrapper").forEach(wrapper => {
            wrapper.style.display = "flex";
            wrapper.style.flexGrow = "1";
            wrapper.style.maxWidth = "58%";
            wrapper.style.borderRadius = "0 12px 12px 0";
            wrapper.style.overflow = "hidden";
            wrapper.style.background = "transparent";
        });
        element.querySelectorAll(".header-right-shape").forEach(shape => {
            shape.style.paddingLeft = "55px";
            shape.style.paddingRight = "20px";
            shape.style.display = "flex";
            shape.style.width = "100%";
            shape.style.background = "linear-gradient(135deg, #1e3a8a, #0d05fa)";
            shape.style.clipPath = "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)";
            shape.style.webkitClipPath = "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)";
            shape.style.borderRadius = "0";
        });
        element.querySelectorAll(".header-right-shape .arabic-text").forEach(txt => {
            txt.style.fontSize = "1rem";
            txt.style.whiteSpace = "nowrap";
            txt.style.display = "inline";
        });
        element.querySelectorAll("#prev-doc-title").forEach(title => {
            title.style.fontSize = "1.2rem";
            title.style.display = "inline-block";
        });
        element.querySelectorAll(".preview-items-table").forEach(tbl => {
            tbl.style.fontSize = "0.9rem";
            tbl.style.width = "100%";
        });

        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "-9999px";
        container.appendChild(element);
        document.body.appendChild(container);

        const safeClientName = clientName.replace(/[^a-zA-Z0-9]/g, "_");
        const formattedDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
        const filename = `${currentDocType.replace(/\s+/g, "_")}_${safeClientName}_${formattedDate}.pdf`;

        const opt = {
            margin:       10,
            filename:     filename,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' },
            pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            document.body.removeChild(container);
            document.getElementById("loading-overlay").style.display = "none";
        }).catch(err => {
            if (document.body.contains(container)) {
                document.body.removeChild(container);
            }
            document.getElementById("loading-overlay").style.display = "none";
            alert("PDF generation failed: " + err.message);
        });
        return;
    }

    // DOCX download via POST to /generate
    fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            return response.json()
                .catch(() => ({ error: "Server error occurred during generation." }))
                .then(err => {
                    throw new Error(err.error || "Failed to generate document");
                });
        }
        let filename = "document";
        const disposition = response.headers.get("Content-Disposition");
        if (disposition && disposition.indexOf("filename=") !== -1) {
            const matches = disposition.split("filename=");
            if (matches.length > 1) {
                filename = matches[1].replace(/[";]/g, "").trim();
            }
        } else {
            filename = `Document_${clientName.replace(/\s+/g, "_")}_${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.${format}`;
        }
        
        return response.blob().then(blob => ({ blob, filename }));
    })
    .then(data => {
        document.getElementById("loading-overlay").style.display = "none";
        
        const url = window.URL.createObjectURL(data.blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = data.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    })
    .catch(error => {
        document.getElementById("loading-overlay").style.display = "none";
        alert("Error: " + error.message);
    });
}

// Helper: Convert numbers to English words (AED / Fils currency format)
function convertNumberToWords(amount) {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
                   'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Million', 'Billion'];

    function convertGroup(n) {
        let groupText = '';
        if (n >= 100) {
            groupText += units[Math.floor(n / 100)] + ' Hundred ';
            n %= 100;
        }
        if (n >= 20) {
            groupText += tens[Math.floor(n / 10)] + ' ';
            n %= 10;
        }
        if (n > 0) {
            groupText += units[n] + ' ';
        }
        return groupText.trim();
    }

    let parts = parseFloat(amount).toFixed(2).split('.');
    let dirhamsVal = parseInt(parts[0]);
    let filsVal = parseInt(parts[1]);

    if (dirhamsVal === 0 && filsVal === 0) return 'Zero AED Only';

    let dirhamWords = '';
    if (dirhamsVal === 0) {
        dirhamWords = 'Zero';
    } else {
        let groups = [];
        while (dirhamsVal > 0) {
            groups.push(dirhamsVal % 1000);
            dirhamsVal = Math.floor(dirhamsVal / 1000);
        }
        
        let wordsArr = [];
        for (let i = 0; i < groups.length; i++) {
            if (groups[i] !== 0) {
                let groupWord = convertGroup(groups[i]);
                if (scales[i]) {
                    groupWord += ' ' + scales[i];
                }
                wordsArr.unshift(groupWord);
            }
        }
        dirhamWords = wordsArr.join(' ').trim();
    }

    let result = dirhamWords + ' AED';
    
    if (filsVal > 0) {
        let filsWords = convertGroup(filsVal);
        result += ' and ' + filsWords + ' Fils';
    }
    
    return result + ' Only';
}

// Mobile Responsiveness Handlers
function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("active");
}

function switchMobileTab(tab) {
    const workspace = document.querySelector(".workspace-main");
    const tabForm = document.getElementById("tab-btn-form");
    const tabPreview = document.getElementById("tab-btn-preview");

    if (tab === 'form') {
        workspace.classList.remove("show-preview");
        tabForm.classList.add("active");
        tabPreview.classList.remove("active");
    } else {
        workspace.classList.add("show-preview");
        tabForm.classList.remove("active");
        tabPreview.classList.add("active");
    }
}
