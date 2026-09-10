# 🩺 Health INN Diagnostic LIMS — Systems Architecture & Engineering Specification

[![Framework: Next.js 16](https://img.shields.io/badge/Framework-Next.js_16_(Turbopack)-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)]()
[![Runtime: React 19](https://img.shields.io/badge/Runtime-React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)]()
[![Database: MongoDB](https://img.shields.io/badge/Database-MongoDB_%2F_Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)]()
[![Type: Case Study](https://img.shields.io/badge/Type-Architectural_Case_Study-blueviolet?style=for-the-badge)]()

> **Commercial Notice & Proprietary IP Disclaimer**:  
> Engineered for **Health INN Diagnostic & Clinical Laboratories** (DHA Phase, Karachi) via **Softsols Pakistan**.  
> Production database schemas, patient personal health information (PHI), and commercial assets are protected under confidentiality and healthcare privacy regulations. This repository documents the public systems architecture, optical specimen tracking pipeline, and diagnostic report rendering optimizations.

---

## 🏛️ Executive Summary & Workflow Architecture

Diagnostic pathology laboratories handle high volumes of critical biological specimens daily (CBC, Lipid Profiles, Liver Function Tests, Endocrine Panels). In traditional clinic workflows, manual specimen tube tagging, handwritten reference range transcription, and unoptimized DOM-to-image report exports introduce diagnostic latency, sample mix-ups, and bloated 4MB PDF files.

Health INN LIMS was engineered to modernize the end-to-end laboratory intake, optical vial identification, biochemical range evaluation, and instant patient report dispatch across four isolated role tiers.

```mermaid
flowchart TD
    subgraph Intake [Reception Tier]
        P[Patient Registration & Intake]
        TOKEN[Unique Token & Test Assignment]
        PRINT[Specimen Barcode Generation]
        P --> TOKEN --> PRINT
    end

    subgraph Processing [Laboratory & Phlebotomy Tier]
        SCAN[Quagga Optical Barcode Scanner]
        V_IN[Vial Code Verification]
        ENTRY[Biochemical Value Input]
        FLAG{Reference Range Delta Check}
        SCAN --> V_IN --> ENTRY --> FLAG
    end

    subgraph Edge & Compute Tier [Next.js 16 Turbopack]
        AUTH[Role-Gated Next-Auth / JWT Engine]
        PDF_ENG[Hybrid Vector jsPDF Compiler]
        TREND[Chart.js Biochemical Time-Series Engine]
        AUTH --> PDF_ENG
        AUTH --> TREND
    end

    subgraph Delivery [Patient & Notification Tier]
        PORTAL[Secure Patient Verification Portal]
        MAIL[Nodemailer Automated SMTP Dispatch]
        QR[Dynamic Verification QR Stamping]
    end

    PRINT -- Vial Tagged --> SCAN
    FLAG -- Normal / Critical --> PDF_ENG
    PDF_ENG --> QR --> PORTAL
    PDF_ENG --> MAIL
```

---

## 🔬 Core Engineering Innovations

### 1. Browser-Based Optical Specimen Tracking (`Quagga` + `QRCode`)
* **The Problem:** Dedicated hardware barcode scanner guns are expensive and create physical bottlenecks at laboratory workstations.
* **The Solution:** Engineered a client-side computer vision camera pipeline utilizing `quagga` directly in the browser. Laboratory technicians can point any standard webcam or mobile workstation camera at a blood specimen tube to parse Code 128 / EAN-13 barcodes in real time.
* **Verification Loop:** Each generated test report is stamped with a cryptographically signed QR code linking to the server-verified authenticity record, preventing forged medical reports.

### 2. High-Performance Hybrid Vector PDF Synthesis (`jsPDF` + `html2canvas`)
* **The Problem:** Rendering clinical reports via traditional DOM rasterization (`html2canvas`) produced severe memory bloat, blurry small-font reference ranges, and file sizes averaging ~4.2MB, overwhelming clinic bandwidth and patient mobile devices.
* **The Solution:** Engineered a hybrid compilation pipeline:
  * Tabular clinical values, patient demographics, and reference intervals are compiled using **native vector primitives** via `jsPDF`, ensuring razor-sharp typography at any zoom level.
  * Rasterization is strictly confined to small bounding boxes for doctor signatures and laboratory certification stamps.
  * **Results:** Slashed PDF generation latency by **65%** and reduced file size from **~4.2MB to <450KB** per multi-page diagnostic dossier.

### 3. Four-Tier Role Segregation Architecture
* **Reception:** Patient intake, billing ledger, barcode label queue.
* **Technician:** Specimen scan-in, parameter entry (Hematology, Biochemistry, Serology, Microbiology), automated critical value highlighting.
* **Patient:** Token-based report download without exposing broader database queries.
* **Administrator:** Staff audit trails, test price catalogs, and diagnostic volume analytics.

---

## 🛠️ Technology Stack & Rationale

| Layer | Technology | Engineering Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16 (Turbopack), React 19** | Turbopack provides instantaneous HMR; React 19 Server Components minimize client JavaScript bundle size for low-spec clinic computers. |
| **Styling** | **Tailwind CSS 4** | Zero-runtime CSS engine ensuring instant page transitions and lightweight DOM footprint. |
| **Computer Vision** | **QuaggaJS (`quagga`)** | Real-time barcode localization and decoding in browser canvas viewports. |
| **Document Compiler** | **jsPDF & html2canvas** | Hybrid vector-raster rendering for compact, print-ready diagnostic dossiers. |
| **Data Persistence** | **MongoDB & Mongoose** | Document-based schema modeling accommodating diverse test parameter permutations without rigid SQL alter-table migrations. |
| **Observability** | **Chart.js & react-chartjs-2** | Historical patient lipid/sugar time-series visualization for longitudinal care. |

---

## 📁 Repository Contents

* `/docs`: Architecture specifications, role-based state machine, and data flow models.
* `/snippets`: Sanitized, zero-credential micro-utilities showcasing the optical barcode scanner hook and the hybrid vector PDF layout compiler.

---

## 📄 License & Commercial Notice
This architectural case study is published under the **MIT License**. Production client software copyright belongs to Health INN Diagnostic Laboratories / Softsols Pakistan.
