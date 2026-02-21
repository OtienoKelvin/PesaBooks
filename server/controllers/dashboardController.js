const db = require("../config/db");

exports.getDashboardStats = async (req, res) => {
    const { business_id, range = "year" } = req.query;
    const userId = req.user.id;

    try {
        /* =====================================================
           1. VERIFY BUSINESS OWNERSHIP (SECURITY FIRST)
        ===================================================== */
        const [business] = await db
            .promise()
            .query(
                "SELECT id FROM businesses WHERE id = ? AND user_id = ?",
                [business_id, userId]
            );

        if (business.length === 0) {
            return res
                .status(403)
                .json({ error: "Unauthorized access to this business." });
        }


           //2. DATE FILTERS (INVOICES VS EXPENSES)

        let invoiceDateFilter = "";
        let expenseDateFilter = "";

        if (range === "30days") {
            invoiceDateFilter =
                "AND i.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
            expenseDateFilter =
                "AND e.date >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
        } else if (range === "90days") {
            invoiceDateFilter =
                "AND i.created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)";
            expenseDateFilter =
                "AND e.date >= DATE_SUB(NOW(), INTERVAL 90 DAY)";
        } else if (range === "year") {
            invoiceDateFilter =
                "AND i.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)";
            expenseDateFilter =
                "AND e.date >= DATE_SUB(NOW(), INTERVAL 1 YEAR)";
        }


           //3. PARALLEL DASHBOARD QUERIES

        const [
            summaryResult,
            revenueTrendResult,
            topClientsResult,
            expenseCategoriesResult,
            recentActivityResult,
        ] = await Promise.all([
            // A. INVOICE SUMMARY
            db.promise().query(
                `
                SELECT 
                SUM(CASE WHEN status = 'paid' THEN total ELSE 0 END) AS collected,
                SUM(CASE WHEN status = 'pending' THEN total ELSE 0 END) AS outstanding,
                COUNT(id) AS total_invoices,
                AVG(total) AS avg_invoice_value
                FROM invoices i
                WHERE i.business_id = ? ${invoiceDateFilter}
                `,
                [business_id]
            ),

            // B. REVENUE TREND (LAST 12 MONTHS)
            db.promise().query(
                `
                SELECT 
                DATE_FORMAT(i.created_at, '%b %Y') AS month,
                SUM(i.total) AS total
                FROM invoices i
                WHERE i.business_id = ?
                GROUP BY YEAR(i.created_at), MONTH(i.created_at)
                ORDER BY MIN(i.created_at) ASC
                LIMIT 12
                `,
                [business_id]
            ),

            // C. TOP CLIENTS (FIXED JOIN)
            db.promise().query(
                `
                SELECT 
                CONCAT(c.first_name, ' ', c.last_name) AS client_name,
                SUM(i.total) AS value
                FROM invoices i
                JOIN clients c ON i.client_id = c.id
                WHERE i.business_id = ?
                GROUP BY i.client_id
                ORDER BY value DESC
                LIMIT 5
                `,
                [business_id]
            ),

            // D. EXPENSE BREAKDOWN
            db.promise().query(
                `
                SELECT 
                e.category,
                SUM(e.amount) AS amount
                FROM expenses e
                WHERE e.business_id = ? ${expenseDateFilter}
                GROUP BY e.category
                ORDER BY amount DESC
                `,
                [business_id]
            ),

            // E. RECENT ACTIVITY
            db.promise().query(
                `
                SELECT 
                id, total, status, created_at
                FROM invoices
                WHERE business_id = ?
                ORDER BY created_at DESC
                LIMIT 5
                `,
                [business_id]
            ),
        ]);


           //4. RESPONSE FORMATTING

        const summary = summaryResult[0][0];

        const expenseCategories = expenseCategoriesResult[0];
        const totalExpenses = expenseCategories.reduce(
            (sum, item) => sum + parseFloat(item.amount),
            0
        );

        const collected = parseFloat(summary.collected) || 0;
        const outstanding = parseFloat(summary.outstanding) || 0;
        const revenue = collected + outstanding;

        res.json({
            metrics: {
                revenue,
                collected,
                outstanding,
                expenses: totalExpenses,
                net_profit: collected - totalExpenses,
                avg_invoice_value: Math.round(summary.avg_invoice_value || 0),
                invoice_count: summary.total_invoices || 0,
            },
            visuals: {
                revenueTrend: revenueTrendResult[0],
                topClients: topClientsResult[0],
                expenseBreakdown: expenseCategories,
            },
            recentActivity: recentActivityResult[0],
        });
    } catch (err) {
        console.error("Dashboard Error:", err);
        res
            .status(500)
            .json({"message": "An internal error occurred while loading dashboard stats."});
    }
};
