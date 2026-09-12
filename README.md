# Health INN Diagnostic LIMS — Architecture Case Study

[![Framework: Next.js 16](https://img.shields.io/badge/Framework-Next.js_16-black?style=flat-square)]()
[![Runtime: React 19](https://img.shields.io/badge/Runtime-React_19-blue?style=flat-square)]()
[![Database: MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=flat-square)]()
[![Type: Case Study](https://img.shields.io/badge/Type-LIMS_Architecture_Case_Study-purple?style=flat-square)]()

Systems architecture and engineering case study for the Laboratory Information Management System (LIMS) deployed for **Health INN Diagnostic & Clinical Laboratories** (DHA, Karachi).

---

## Role & Scope

* **Role:** Sole Full-Stack Developer
* **Context:** Built under Softsols Pakistan. Engineered the production system from scratch.
* **Scope of Ownership:** Built the full application: patient registration, webcam barcode scanning for specimen vials, test result entry with automatic reference range flags, PDF report generation, and automated email delivery.

---

## System Flow

```mermaid
flowchart TD
    subgraph Reception [Patient Intake]
        P[Patient Registration]
        TOKEN[Assign Barcode Identifier]
        P --> TOKEN
    end

    subgraph Laboratory [Lab Technician Workflow]
        SCAN[Webcam Barcode Scan - Quagga]
        ENTRY[Biochemical Value Input]
        FLAG{Reference Range Check}
        TOKEN --> SCAN --> ENTRY --> FLAG
    end

    subgraph Service Tier [Next.js & API Core]
        PDF[PDF Report Generation - jsPDF]
        AUTH[Session & Role Gate]
        AUTH --> PDF
    end

    subgraph Output [Delivery & Verification]
        QR[Verification QR Code]
        SMTP[Automated Email Dispatch]
        FLAG --> PDF --> QR --> SMTP
    end
```

---

## Technical Highlights

* **Webcam Barcode Scanning:** Integrated client-side barcode scanning using `quagga`, enabling lab technicians to scan sample vial barcodes directly using regular webcams or mobile cameras without external handheld scanners.
* **Automated PDF Report Generation:** Built dynamic laboratory report generation using `jsPDF`, laying out test panels, patient details, doctor signatures, and verification QR codes.
* **Reference Range Flagging:** Configured automated checks comparing entered biochemical values against established reference ranges, highlighting abnormal values on the technician console and final report.
* **Role-Based Access:** Structured role-separated views for receptionists, lab technicians, and administrators to maintain sample tracking discipline.

---

## Tech Stack

* **Frontend & Backend:** Next.js 16 (Turbopack), React 19, TypeScript
* **Database:** MongoDB, Mongoose
* **Barcode & Document Utilities:** QuaggaJS, jsPDF, QRCode
* **Visualization & Styling:** Chart.js, Tailwind CSS

---

## Notice

Proprietary diagnostic schemas, patient personal health information (PHI), and clinical records are confidential under Health INN Laboratories and Softsols Pakistan. This repository documents system architecture and software workflows.
