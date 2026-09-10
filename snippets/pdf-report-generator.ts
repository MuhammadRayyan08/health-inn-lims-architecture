import { jsPDF } from "jspdf";

interface LabParameter {
  name: string;
  value: number | string;
  unit: string;
  normalRange: string;
  isAbnormal: boolean;
}

interface ReportData {
  patientName: string;
  patientId: string;
  specimenId: string;
  date: string;
  testCategory: string;
  parameters: LabParameter[];
}

export function generateDiagnosticVectorPDF(data: ReportData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(30, 41, 59);
  doc.text("HEALTH INN DIAGNOSTIC LABORATORIES", 20, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("DHA Phase Clinical Pathology Department | Automated Laboratory Dossier", 20, 26);
  doc.line(20, 29, 190, 29);

  let cursorY = 48;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Test Parameter", 20, cursorY);
  doc.text("Result", 90, cursorY);
  doc.text("Reference Interval", 130, cursorY);
  doc.text("Units", 175, cursorY);
  doc.line(20, cursorY + 2, 190, cursorY + 2);

  cursorY += 8;
  doc.setFont("helvetica", "normal");

  data.parameters.forEach((param) => {
    if (param.isAbnormal) {
      doc.setTextColor(220, 38, 38);
      doc.setFont("helvetica", "bold");
    } else {
      doc.setTextColor(51, 65, 85);
      doc.setFont("helvetica", "normal");
    }

    doc.text(param.name, 20, cursorY);
    doc.text(String(param.value), 90, cursorY);
    doc.text(param.normalRange, 130, cursorY);
    doc.text(param.unit, 175, cursorY);

    cursorY += 6;
  });

  return doc;
}
