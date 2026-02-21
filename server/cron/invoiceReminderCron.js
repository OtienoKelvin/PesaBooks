const cron = require("node-cron");
const { sendInvoiceReminders } = require("../utils/invoiceReminderService");

exports.startInvoiceReminderCron = () => {
  // Runs every day at 8 AM
  cron.schedule("0 8 * * *", async () => {
    console.log("Running invoice reminder job...");
    await sendInvoiceReminders();
  });
};
