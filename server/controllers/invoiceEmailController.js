const { getInvoiceDataAndBuffer } = require("../utils/pdfService");
const { sendInvoiceEmail } = require("../utils/emailService");
const invoiceTemplate = require("../templates/invoiceTemplate");

exports.emailInvoicePdf = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getInvoiceDataAndBuffer(id, req.user.id, invoiceTemplate);

        if (!result) return res.status(404).json({"message": "Invoice not found"});

        const { invoice, pdfBuffer } = result;

        await sendInvoiceEmail({
            to: invoice.client_email,
            subject: `Invoice ${invoice.invoice_number} from ${invoice.business_name}`,
            text: `Hello ${invoice.first_name},\n\nPlease find attached your invoice.\n\nTotal: ${invoice.total}\nDue: ${invoice.due_date}`,
            pdfBuffer,
            filename: `invoice-${invoice.invoice_number}.pdf`,
        });

        res.json({"message": "Invoice emailed successfully"});
    } catch (err) {
        res.status(500).json({"message": "Failed to email invoice"});
    }
};