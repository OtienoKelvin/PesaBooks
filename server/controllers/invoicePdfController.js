const { getInvoiceDataAndBuffer } = require("../utils/pdfService");
const invoiceTemplate = require("../templates/invoiceTemplate");

exports.generateInvoicePdf = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getInvoiceDataAndBuffer(id, req.user.id, invoiceTemplate);

        if (!result) return res.status(404).json({"message": "Invoice not found"});

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=invoice-${result.invoice.invoice_number}.pdf`);
        res.send(result.pdfBuffer);
    } catch (err) {
        res.status(500).json({"message": "Failed to generate PDF"});
    }
};