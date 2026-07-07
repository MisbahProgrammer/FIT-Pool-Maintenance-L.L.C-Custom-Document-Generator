// Document States and Defaults
let currentDocType = "Quotation";
let items = [
    { desc: "Standard Swimming pool maintenance chemical and cleaning service", qty: "1 No's", amount: 1500.00 }
];

// Default configurations
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
        footerColor: "#0d05fa"
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
        footerColor: "#0d05fa"
    },
    Receipt: {
        title: "PAYMENT RECEIPT",
        refNo: "FP/REC-2026/0402",
        validity: "1 month",
        city: "Abu Dhabi",
        subject: "Payment Receipt for swimming pool maintenance work",
        intro: "We are pleased to acknowledge receipt of payment for the swimming pool maintenance work as detailed below.",
        terms: "Paid in full. Thank you for your business!",
        account: "", // Receipts don't necessarily need to demand payment details
        footerText: "Thanks and Regards: Fit Pool Building Maintenance L.L.C",
        footerColor: "#0d05fa"
    }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    // Set date field to today
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const yyyy = today.getFullYear();
    document.getElementById("doc-date").value = `${dd}/${mm}/${yyyy}`;

    // Load defaults
    loadPreset(currentDocType);
    renderItemsTable();
    onVersionChange();
    updatePreview();
});

// Load Presets when changing Document Type
function loadPreset(docType) {
    const preset = docPresets[docType];
    
    document.getElementById("main-heading").innerText = `Generate ${docType}`;
    document.getElementById("doc-ref").value = preset.refNo;
    
    // Reset subject select to default first option
    document.getElementById("doc-subject").value = "swimming pool maintenance work";
    document.getElementById("doc-custom-subject").value = "";
    document.getElementById("custom-subject-group").style.display = "none";
    
    // Update intro text automatically based on subject
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
    
    // Update button active states
    document.querySelectorAll(".doc-btn").forEach(btn => btn.classList.remove("active"));
    if (docType === "Quotation") document.getElementById("btn-quotation").classList.add("active");
    if (docType === "Invoice") document.getElementById("btn-invoice").classList.add("active");
    if (docType === "Receipt") document.getElementById("btn-receipt").classList.add("active");

    loadPreset(docType);
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

// Add row item
function addItemRow() {
    items.push({ desc: "", qty: "1 No's", amount: 0.00 });
    renderItemsTable();
    updatePreview();
}

// Remove row item
function removeItemRow(idx) {
    if (items.length > 1) {
        items.splice(idx, 1);
    } else {
        items[0] = { desc: "", qty: "1 No's", amount: 0.00 };
    }
    renderItemsTable();
    updatePreview();
}

// Update Item Field Handler
function updateItemField(idx, field, val) {
    if (field === 'amount') {
        items[idx][field] = parseFloat(val) || 0;
    } else {
        items[idx][field] = val;
    }
    updatePreview();
}

// Toggle VAT Handler
function toggleVat() {
    updatePreview();
}

// Live Update Preview Section
function updatePreview() {
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
    document.getElementById("prev-validity").innerText = validityVal;
    
    document.getElementById("prev-doc-title").innerText = currentDocType.toUpperCase();
    
    // Subject and Intro
    const subjectSelect = document.getElementById("doc-subject").value;
    const customSubject = document.getElementById("doc-custom-subject").value;
    const subjectVal = subjectSelect === "Other" ? (customSubject || "maintenance work") : subjectSelect;
    
    // Dynamic subject text in preview
    const fullSubjectText = `${currentDocType} for ${subjectVal}`;
    document.getElementById("prev-subject").innerText = fullSubjectText;
    document.getElementById("prev-intro").innerText = document.getElementById("doc-intro").value || "";

    // Calculate totals
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

    // Update Amount in Words
    const words = convertNumberToWords(grandTotal);
    document.getElementById("prev-words-val").innerText = words;

    // Render Preview Table Items
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

    // Terms & Conditions section
    const termsVal = document.getElementById("doc-terms").value;
    const termsSection = document.getElementById("prev-terms-section");
    if (termsVal.trim()) {
        termsSection.style.display = "block";
        document.getElementById("prev-terms").innerText = termsVal;
    } else {
        termsSection.style.display = "none";
    }

    // Account details section
    const accVal = document.getElementById("doc-account").value;
    const accSection = document.getElementById("prev-account-section");
    if (accVal.trim()) {
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

    // Calculate totals
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

    // Assemble payload
    const payload = {
        doc_type: currentDocType,
        client_name: clientName,
        client_address: document.getElementById("client-address").value,
        contact_no: document.getElementById("client-contact").value,
        date: document.getElementById("doc-date").value,
        ref_no: document.getElementById("doc-ref").value,
        validity: document.getElementById("doc-validity").value,
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
        version: document.getElementById("template-version").value
    };

    // Show loading spinner
    document.getElementById("loading-overlay").style.display = "flex";

    if (format === 'pdf') {
        // Clone the preview element to force standard desktop A4 dimensions during PDF capture
        const sourceElement = document.getElementById("document-preview");
        const element = sourceElement.cloneNode(true);
        
        // Apply inline styles to force correct desktop print sizing on the clone
        element.style.width = "794px"; // 210mm at 96 DPI
        element.style.minHeight = "1123px"; // 297mm at 96 DPI
        element.style.padding = "50px";
        element.style.fontSize = "11pt";
        element.style.transform = "none";
        element.style.borderRadius = "0";
        element.style.boxShadow = "none";
        
        // Ensure child elements inside the clone match their correct desktop dimensions
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
        element.querySelectorAll(".preview-meta-grid").forEach(grid => {
            grid.style.fontSize = "0.9rem";
            grid.style.display = "grid";
        });
        element.querySelectorAll(".preview-client-box").forEach(box => {
            box.style.fontSize = "0.95rem";
        });
        element.querySelectorAll(".preview-subject-line").forEach(sub => {
            sub.style.fontSize = "0.95rem";
        });
        element.querySelectorAll(".preview-salutation, .preview-intro").forEach(el => {
            el.style.fontSize = "0.95rem";
        });
        element.querySelectorAll(".preview-terms-section, .preview-account-section").forEach(sec => {
            sec.style.fontSize = "0.85rem";
        });
        element.querySelectorAll(".preview-footer-banner").forEach(footer => {
            footer.style.fontSize = "0.9rem";
            footer.style.borderRadius = "4px";
            footer.style.padding = "8px";
        });

        // Create an off-screen container to mount the styled clone
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "-9999px";
        container.appendChild(element);
        document.body.appendChild(container);

        const safeClientName = clientName.replace(/[^a-zA-Z0-9]/g, "_");
        const formattedDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
        const filename = `${currentDocType}_${safeClientName}_${formattedDate}.pdf`;

        const opt = {
            margin:       0,
            filename:     filename,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'px', format: [794, 1123], hotfixes: ['px_scaling'] }
        };

        // Render the clone to PDF and save
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

    // Call /generate endpoint with JSON payload to download the DOCX file directly from backend
    fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            // Read response as JSON to extract custom error message, fallback to generic
            return response.json()
                .catch(() => ({ error: "Server error occurred during generation." }))
                .then(err => {
                    throw new Error(err.error || "Failed to generate document");
                });
        }
        // Extract filename from Content-Disposition header
        let filename = "document";
        const disposition = response.headers.get("Content-Disposition");
        if (disposition && disposition.indexOf("filename=") !== -1) {
            const matches = disposition.split("filename=");
            if (matches.length > 1) {
                filename = matches[1].replace(/[";]/g, "").trim();
            }
        } else {
            // Fallback extension based on format
            filename = `Document_${clientName.replace(/\s+/g, "_")}_${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.${format}`;
        }
        
        return response.blob().then(blob => ({ blob, filename }));
    })
    .then(data => {
        document.getElementById("loading-overlay").style.display = "none";
        
        // Trigger programmatic browser download
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

    // Ensure double-digit accuracy
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
