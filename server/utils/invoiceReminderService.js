const db = require("../config/db");
const { getInvoiceDataAndBuffer } = require("../utils/pdfService");
const { sendInvoiceEmail } = require("../utils/emailService");
const invoiceTemplate = require("../templates/invoiceTemplate");

exports.sendInvoiceReminders = async () => {
    try {

           //1. FIND DUE SOON (3 DAYS)

        const [dueSoonInvoices] = await db.promise().query(
            `
            SELECT i.id, b.user_id
            FROM invoices i
            JOIN businesses b ON i.business_id = b.id
            WHERE i.status = 'pending'
                AND i.due_date = DATE_ADD(CURDATE(), INTERVAL 3 DAY)
            `
        );


           //2. FIND OVERDUE

        const [overdueInvoices] = await db.promise().query(
            `
            SELECT i.id, b.user_id
            FROM invoices i
            JOIN businesses b ON i.business_id = b.id
            WHERE i.status = 'pending'
                AND i.due_date < CURDATE()
            `
        );


           //3. SEND REMINDERS

        for (const invoice of [...dueSoonInvoices, ...overdueInvoices]) {
            const result = await getInvoiceDataAndBuffer(
                invoice.id,
                invoice.user_id,
                invoiceTemplate
            );

            if (!result) continue;

            const { invoice: data, pdfBuffer } = result;

            const isOverdue = new Date(data.due_date_raw || data.due_date) < new Date();

            await sendInvoiceEmail({
                to: data.client_email,
                subject: isOverdue
                    ? `Overdue Invoice ${data.invoice_number}`
                    : `Reminder: Invoice ${data.invoice_number} Due Soon`,
                text: isOverdue
                    ? `Hello ${data.first_name},

                    This is a reminder that invoice ${data.invoice_number} is overdue.

                    Outstanding Amount: ${data.total}
                    Original Due Date: ${data.due_date}

                    Please find the invoice attached.

                    Regards,
                    ${data.business_name}`
                    : `Hello ${data.first_name},

                    This is a friendly reminder that invoice ${data.invoice_number} is due in 3 days.

                    Amount Due: ${data.total}
                    Due Date: ${data.due_date}

                    Invoice attached for your reference.

                    Regards,
                    ${data.business_name}`,
                pdfBuffer,
                filename: `invoice-${data.invoice_number}.pdf`,
            });
        }

        console.log("Invoice reminders sent");
    } catch (err) {
        console.error("Invoice Reminder Error:", err);
    }
};
