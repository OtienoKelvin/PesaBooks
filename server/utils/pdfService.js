const puppeteer = require("puppeteer");
const db = require("../config/db");


const formatInvoiceData = (invoice, items) => {
    const currency = new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' });
    const dateOpt = { day: 'numeric', month: 'short', year: 'numeric' };

    return {
        ...invoice,
        branding: {
            logo_url: invoice.logo_url,
            primary_color: invoice.primary_color,
            secondary_color: invoice.secondary_color,
            invoice_footer: invoice.invoice_footer
        },
        created_at: new Date(invoice.created_at).toLocaleDateString('en-GB', dateOpt),
        due_date: new Date(invoice.due_date).toLocaleDateString('en-GB', dateOpt),
        subtotal_raw: invoice.subtotal,
        tax_raw: invoice.tax,
        total_raw: invoice.total,
        subtotal: currency.format(invoice.subtotal),
        tax: currency.format(invoice.tax),
        total: currency.format(invoice.total),
        items: items.map(item => ({
            ...item,
            formattedPrice: currency.format(item.price),
            formattedTotal: currency.format(item.quantity * item.price)
        }))
    };
};

exports.getInvoiceDataAndBuffer = async (id, userId, templateFn) => {
    let browser;
    try {
        // 1. Database Fetch
        const [invoiceResult] = await db.promise().query(
            `SELECT i.*, c.first_name, c.last_name, c.email AS client_email,
                    b.name AS business_name, 
                    b.email AS business_email, 
                    b.phone AS business_phone,
                    b.logo_url,
                    b.primary_color,
                    b.secondary_color,
                    b.invoice_footer
             FROM invoices i
             JOIN clients c ON i.client_id = c.id
             JOIN businesses b ON i.business_id = b.id
             WHERE i.id = ? AND b.user_id = ?`,
            [id, userId]
        );

        if (!invoiceResult.length) return null;

        const [items] = await db.promise().query(
            "SELECT * FROM invoice_items WHERE invoice_id = ?", [id]
        );

        // 2. Format Data
        const formattedInvoice = formatInvoiceData(invoiceResult[0], items);

        // 3. Generate PDF
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
            headless: "new"
        });

        const page = await browser.newPage();
        const html = templateFn(formattedInvoice);
        
        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' }
        });

        return { pdfBuffer, invoice: formattedInvoice };

    } finally {
        if (browser) await browser.close();
    }
};