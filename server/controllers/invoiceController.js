const db = require("../config/db");

const generateInvoiceNumber = () => {
    return "INV-" + Date.now();
};

exports.createInvoice = (req, res) => {
    const { client_id, items, due_date } = req.body;

    if (!items || !items.length) {
        return res.status(400).json({"message": "Invoice items required"});
    }

    db.query(
        "SELECT id FROM businesses WHERE user_id = ?",
        [req.user.id],
        (err, biz) => {
            if (!biz.length) return res.status(400).json({"message": "Create business first"});

            const businessId = biz[0].id;

            let subtotal = 0;
            items.forEach((i) => {
                subtotal += i.quantity * i.price;
            });

            const tax = 0; // MVP
            const total = subtotal + tax;

            const invoiceNumber = generateInvoiceNumber();

            db.query(
                `
                INSERT INTO invoices 
                (business_id, client_id, invoice_number, subtotal, tax, total, due_date)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `,
                [businessId, client_id, invoiceNumber, subtotal, tax, total, due_date],
                (err, result) => {
                    if (err) return res.status(500).json({"message": "Invoice creation failed"});

                    const invoiceId = result.insertId;

                    const values = items.map((i) => [
                        invoiceId,
                        i.description,
                        i.quantity,
                        i.price,
                    ]);

                    db.query(
                        "INSERT INTO invoice_items (invoice_id, description, quantity, price) VALUES ?",
                        [values],
                        (err) => {
                            if (err) return res.status(500).json({"message": "Invoice items failed"});
                            res.status(201).json({ invoiceId, invoiceNumber });
                        },
                    );
                },
            );
        },
    );
};

exports.getInvoices = (req, res) => {
    db.query(
        `
        SELECT i.* FROM invoices i
        JOIN businesses b ON i.business_id = b.id
        WHERE b.user_id = ?
        ORDER BY i.created_at DESC
        `,
        [req.user.id],
        (err, results) => {
            if (err) return res.status(500).json({"message": "Failed to fetch invoices"});
            res.json(results);
        },
    );
};

exports.getInvoiceById = (req, res) => {
    const { id } = req.params;

    db.query(
        `
        SELECT i.*, c.first_name, c.last_name 
        FROM invoices i
        JOIN businesses b ON i.business_id = b.id
        JOIN clients c ON i.client_id = c.id
        WHERE i.id = ? AND b.user_id = ?
        `,
        [id, req.user.id],
        (err, invoice) => {
            if (!invoice.length) return res.status(404).json({"message": "Invoice not found"});

            db.query(
                "SELECT * FROM invoice_items WHERE invoice_id = ?",
                [id],
                (err, items) => {
                    res.json({...invoice[0], items});
                },
            );
        },
    );
};


exports.updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.query(
        `
        UPDATE invoices i
        JOIN businesses b ON i.business_id = b.id
        SET i.status = ?
        WHERE i.id = ? AND b.user_id = ?
        `,
        [status, id, req.user.id],
        (err, result) => {
            if (!result.affectedRows) {
                return res.status(404).json({"message": "Invoice not found"});
            }
            res.json({"message": "Status updated"});
        },
    );
};
