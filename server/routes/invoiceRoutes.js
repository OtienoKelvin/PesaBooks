const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const invoice = require("../controllers/invoiceController");
const invoicePdf = require("../controllers/invoicePdfController");
const invoiceEmail = require("../controllers/invoiceEmailController");

router.post("/", auth, invoice.createInvoice);
router.get("/", auth, invoice.getInvoices);
router.get("/:id", auth, invoice.getInvoiceById);
router.patch("/:id/status", auth, invoice.updateStatus);
router.get("/:id/pdf", auth, invoicePdf.generateInvoicePdf);
router.post("/:id/email", auth, invoiceEmail.emailInvoicePdf);

module.exports = router;
