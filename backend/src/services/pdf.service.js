import PDFDocument from "pdfkit";

export function generateReportPDF(res, machineId, aiAnalysis) {
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=machine_${machineId}_report.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("Hydraulic Maintenance Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Machine ID: ${machineId}`);
    doc.text(`Generated on: ${new Date().toLocaleString()}`);
    doc.moveDown();


    doc.fontSize(11).text(aiAnalysis);

    doc.end();
}
