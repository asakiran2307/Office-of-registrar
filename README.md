# Joy University - Office of the Registrar (OOR) Inward & Outward Portal

A modern, standalone role-based web application for **Joy University** to manage Inward and Outward official communications, sequential reference number generation, data modifications, slip printing, and multi-sheet Excel exports.

---

## 🔐 Default Login Credentials

| Role | Login ID | Default Password | Access & Security Rights |
| :--- | :--- | :--- | :--- |
| **👑 Assistant Registrar (AR)** | `AR` | `Joy@2026` | Full Admin: Executive Dashboard, Inward/Outward Registers, Modify & Delete Records, Ref Engine, Masters, Guidelines, **Password Management (Change AR & Staff Passwords)** |
| **✍️ Staff Operator** | `STAFF` | `Joy@2026` | Operator Access: Inward & Outward Registers only (View/Log/Print Slips). No Dashboard, No Deletion, No Modification, No Password Changing |

*Note: The Assistant Registrar can update both the AR and Staff passwords anytime from the **🔐 Security & Passwords** section.*

---

## 🚀 Vercel Deployment

Deploy with the Vercel CLI from your terminal:

```bash
# Deploy to Production
vercel --prod
```

---

## 📁 Project Architecture

- **`index.html`**: Standalone single-file application containing all HTML, CSS, JavaScript, Master Data, password management, live Excel sync, and state persistence logic.
- **`vercel.json`**: Vercel routing and security header configuration (`outputDirectory: "."`).
- **`package.json`**: Project metadata.
- **`JU_OOR_INWARD_OUTWARD_REGISTER_2026-08-29 (1).xlsx`**: Master reference workbook with pre-populated records.

---

## 🔄 Dual Persistence & Role Synchronization

1. **Dual Persistence across Website & Excel**:
   - **On the Website**: Every single entry, circular, outward dispatch, and master file is instantly persisted in the browser database (`localStorage`) under a unified master key with cross-tab live synchronization. Reloading the page, switching accounts, or reopening the browser always maintains the full updated state.
   - **In Excel (.xlsx)**: Clicking **"📥 Export Excel"** at any time generates a complete institutional workbook containing:
     - 📑 `Inward_Register`
     - 📑 `Outward_Register`
     - 📑 `Circulars_Register`
     - 📁 `File_Register` (R-01 to R-24)
     - 🏛️ `Masters_Directory` (Academic & Administrative Departments and Doc Types)
     - ℹ️ `Guidance_NAAC`
   - **Two-Way Synchronization**: Importing any Excel file via **"Import Excel"** synchronizes and updates the website database immediately.

2. **Role-Based Permissions & Workflows**:
   - **Creation & Drafting**: Both **Staff Operators** and **Assistant Registrar (AR)** can create Inward entries, Outward dispatches, Official Circulars, Office Orders, and Master Files using the **"+ Draft Official Circular"** or Outward creation forms.
   - **Editing & Modifications**: Both **Staff Operators** and **Assistant Registrar (AR)** can **Edit and Modify** circular and outward records at any time (including document titles, subjects, body paragraphs, distribution lists, and embedded custom tables).
   - **Printing & Letterhead**: Both **Staff** and **AR** can **Print** official Word letterhead circulars, inward/outward slips, and file dockets.
   - **Deletion (AR-Only)**: Only the **Assistant Registrar (AR)** has authorization to delete records from the register. The Delete button is hidden from staff, and any deletion attempt by non-AR accounts is blocked.

3. **Dynamic Bill / Invoice Amount Support**:
   - When **Bill**, **Invoice**, **Payment Request**, or **Payment Approval** is selected as the Document Type, a dedicated **Bill Amount (₹ INR)** input automatically appears with currency validation.
   - The Bill Amount is displayed with formatted currency badges (`₹ 1,450.00`) across register tables, slide detail drawers, official print receipt slips, and exported multi-sheet Excel workbooks.

4. **📁 Master File Management & Statutory Sub-File System (R-01 to R-24)**:
   - **24 Standardized Statutory Categories**: Covering Statutory & Governance (`R-01`), Board of Management (`R-02`), Academic Council (`R-03`), Finance & PMB (`R-04`), Admissions (`R-05`), Student Academic Records (`R-06`), Examinations (`R-07`), Degrees & Certificates (`R-08`), Convocation (`R-09`), Affiliations (`R-10`), UGC & Regulatory Authorities (`R-11`), NAAC Accreditation (`R-12`), IQAC Quality Assurance (`R-13`), NIRF/AISHE Statistical Returns (`R-14`), RTI Records (`R-15`), Legal & Court Cases (`R-16`), Registrar Correspondence (`R-17`), Notifications & Orders (`R-18`), Standing Committees (`R-19`), Staff & Personnel (`R-20`), Common Seal & Property (`R-21`), MoUs & Contracts (`R-22`), Annual Reports & Gazettes (`R-23`), and Record Retention & Master Archival (`R-24`).
   - **Interactive Sub-Files Explorer**: Selecting any category (e.g. `R-01` or `1`) renders the complete roster of prescribed statutory sub-files under that category, displays which ones are already created/registered with live reference codes (`JU/OOR/FILE/R-01/...`), and provides a 1-click **"➕ Index This File"** button to instantiate unindexed records.
   - **Auto-Prefill Modal Integration**: The Create and Edit Master File modals automatically populate a dropdown of standard sub-file titles for the selected category, auto-filling the file title, default custodian section, mandated retention period, and UGC/NAAC compliance reference.
   - **Sequential Reference Numbering**: Files automatically generate reference codes in standard format `JU/OOR/FILE/{CatCode}/{SubCode}/{FY}/{Seq}` (e.g. `JU/OOR/FILE/R-01/STAT/26-27/001`).
   - **Cross-Role Availability**: Both AR and Staff can log new files, search by location/rack/custodian, view slide-drawer details, and print official **File Cover Dockets / Labels**.
   - **30 Essential Audit Registers Reference**: Built-in interactive checklist and guidance for UGC compliance and NAAC audit verification.
   - **Manual Excel Export Only**: Excel files (`.xlsx`) are **never** downloaded automatically when logging or saving entries. Downloads happen **only** when the user explicitly clicks the **"📥 Export Excel"** button, which downloads a complete workbook containing `Inward_Register`, `Outward_Register`, `File_Register`, and `Analytics_Summary` worksheets on demand.

5. **🏛️ Official Circular & Letterhead Printout Format**:
   - **Exact 1:1 Matching of Approved Word Letterhead**: Modeled directly after [*`Circular - Launch of JU ERP Portal for Fee Payments.docx`*](file:///c:/ju/ju/CR/ar/Circular%20-%20Launch%20of%20JU%20ERP%20Portal%20for%20Fee%20Payments.docx).
   - **High-Resolution University Emblem Header & Rule**: Embedded base64 Joy University crest with standard horizontal dividing line.
   - **Strict Typography & Font Hierarchy**:
     - **Header, Ref No, Date, Title & Distribution Lists**: `Georgia, 'Times New Roman', serif`.
     - **Subject, Stars (`***`), and Body Content**: `'Times New Roman', Times, Georgia, serif` (12pt, justified, line-height 1.55).
   - **Structured Metadata & Document Banner**:
     - Auto-Generated `Ref No:` and `Dated:` (e.g. `JU/RO/Circular/2026/01` and `Dated 14 May 2025` / `Dated DD Month YYYY`).
     - Centered uppercase bold document title banner (`CIRCULAR`, `OFFICE ORDER`, `UNIVERSITY NOTIFICATION`, etc.).
     - Bold **`Subject:`** followed by centered **`***`** separator.
     - Formal **`REGISTRAR`** / Approving Authority signature block positioned on the **Right Side** in `Georgia` bold uppercase.
     - Clean `To,` distribution list and `Copy to:` endorsement list on the left matching official university format.
    - **📊 Interactive Embedded Document Table Builder with Multi-Column Row Layouts**:
      - Users can embed custom structured data tables directly inside Circulars, Notifications, and Outward letters with full control over rows, columns, and **per-row column spans / layouts**.
      - **Flexible Per-Row Column Layouts**:
        - 🔲 **Full Grid (N Columns)**: Standard row with individual inputs for every column.
        - 📑 **3 Columns Split**: 3-column structured layout for sub-sections.
        - ⚖️ **2 Columns Split (Span + Value / Total)**: Left column spans across `N-1` columns for totals, gross amounts, and sub-headings, with the right column displaying the value/amount.
        - 🏷️ **1 Column Full Banner (Span All Columns)**: Single full-width cell spanning all table columns for Section Headings, Important Notices, and Terms.
      - **Interactive ✏️ Edit Column Prompt per Row**:
        - Click the **✏️ Edit** button on any row to open an instant configuration dialog asking how many columns that specific row should have (e.g. `1` for full banner, `2` for split, `3`, or `N` standard grid).
      - **Dynamic Column & Row Controls**: Add (`➕ Add Column`, `➕ Add Row`) or remove (`➖ Remove Column`, `✕ Delete Row`) dynamically.
      - **Editable Header & Cell Grid**: Direct inline typing in header boxes and data cells with real-time dimension counters.
      - **1-Click Statutory Presets**: Instant pre-population for *Fee Payment Schedules*, *Statutory Committee Rosters*, *Examination Time Tables*, *Sanctioned Intake Lists*, and *General Bill / Item Particulars*.
      - **Clean Letterhead Print Rendering**: Formatted with formal institutional table borders, bold headers, and crisp serif typography.
    - **Integrated Across All Circular & Dispatch Operations**:
      - **Official Outward Dispatch & Circular Engine**: The Outward creation modal (`#outward-modal`) is now directly unified with the official circular drafting format, featuring live template selection (ERP Launch, Holiday, Committee Order, Academic Notification, or Custom), auto-generated outward reference number preview, multi-line body paragraphs, interactive custom table builder, distribution `To,` list, `Copy to:` endorsement list, and instant print to Word letterhead layout.
      - **Inward Diary Slips & Outward Dispatch Slips**: Formatted with standard university letterhead styling matching the institutional Word document.
      - **Master File Dockets**: Physical file cover labels ready to paste on binder folders.

6. **📑 Official Approval Bill & Office Note Format**:
   - **Exact Layout from Approved Document**: Implemented directly from *`Approval bill - 2026.docx`* (`OFFICE NOTE – BILLS` / `OFFICE - APPROVAL NOTE`).
   - **Exact Typography & Strict Font Specifications**:
     - **Font Family**: Google Font `Montserrat`, sans-serif.
     - **Body Font Size**: `12pt` (`12px`).
     - **Headings Font Size**: `14pt` (`OFFICE OF REGISTRAR`, `OFFICE NOTE – BILLS`, `OFFICE - APPROVAL NOTE`).
     - **Reference Number & Date Font Size**: `11pt` (`Ref No: JU/OOR/GEN/...`, `Date: DD.MM.YYYY`).
   - **5-Column Particulars Table**: `S. No.` | `Particulars / Description` | `Amount` | `Recipient` | `Remarks` with dedicated total row `Rs. {Amount} /-`.
   - **Formal Four-Tier Signature Block**:
     - `Prepared by:` Dealing Staff
     - `Verified by:` **Assistant Registrar**
     - `Verified/Recommended by:` **Registrar**
     - `Approved by:` **Hon'ble Chancellor** (for Advance & Executive Approval Notes)
   - **Automatic Integration**:
     - Any Inward or Outward entry marked with document type **Bill**, **Invoice**, or **Payment Request** automatically formats as this official Approval Bill when printed.

---

## 🐘 Online Neon PostgreSQL Cloud Database & Live Sync

The portal is connected to an online **Neon PostgreSQL** serverless cloud database (`neondb`), providing dual-tier real-time synchronization between client sessions and cloud persistence:

### 🌐 Live Endpoints
- **Production Web Application**: [https://registraroffice.vercel.app](https://registraroffice.vercel.app)
- **Vercel Database Gateway**: [https://registraroffice.vercel.app/api/db](https://registraroffice.vercel.app/api/db)
- **Neon Serverless SQL Endpoint**: `https://ep-delicate-mountain-adckue32-pooler.c-2.us-east-1.aws.neon.tech/sql`

### 🗄️ Database Tables Schema
| Table | Rows | Description |
| :--- | :--- | :--- |
| **`ju_inward`** | 6 | Inward communications, diary numbering, vendors, and bill amounts (₹ INR) |
| **`ju_outward`** | 5 | Outward dispatches, official circulars, office orders, and custom tables |
| **`ju_files`** | 9 | Statutory master records (R-01 to R-24 statutory categories) |
| **`ju_departments`** | 18 | Master academic and administrative departments |
| **`ju_doc_types`** | 56 | Standard institutional document types |
| **`ju_sections`** | 20 | Statutory sections and NAAC compliance responsibilities |
| **`ju_auth`** | 2 | Secure role credentials (`AR` & `STAFF`) |
| **`ju_sync_state`** | 1 | Master JSONB snapshot for instant two-way synchronization |

### ⚡ Dual-Tier Resilience Features
1. **Instant Offline-First Rendering**: Loads immediately from local cache on page open.
2. **Automatic Background Cloud Sync**: Auto-pings Neon PostgreSQL on boot, syncs state across all active browser windows and devices.
3. **Live Status Header Pill**: Pulsing 🟢 **Neon DB Online** indicator with live round-trip ping latency.
4. **Cloud Database Center Modal**: Displays live row counts, host connection metadata, and controls for manual synchronization, push, and pull.

