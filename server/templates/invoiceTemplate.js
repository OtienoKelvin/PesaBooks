module.exports = (invoice) => {
    const {
        invoice_number,
        created_at,
        due_date,
        total,
        tax,
        subtotal,
        first_name,
        last_name,
        items,
        business_name,
        business_email,
        business_phone
    } = invoice;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          @page { margin: 20px; }
          body { font-family: 'Helvetica', 'Arial', sans-serif; padding: 30px; color: #333; line-height: 1.6; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 20px; }
          .title { font-size: 32px; font-weight: bold; color: #222; }
          .business-info p, .invoice-info p { margin: 2px 0; font-size: 13px; }
          .section { margin-top: 40px; }
          .billed-to { font-size: 14px; }
          
          table { width: 100%; border-collapse: collapse; margin-top: 25px; table-layout: fixed; }
          th { background: #f8f9fa; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #555; }
          th, td { border-bottom: 1px solid #eee; padding: 12px 10px; text-align: left; }
          
          /* Avoid breaking a row across pages */
          tr { page-break-inside: avoid; page-break-after: auto; }

          .totals-container { margin-top: 30px; display: flex; justify-content: flex-end; }
          .totals-table { width: 250px; }
          .totals-table td { border: none; padding: 5px 0; }
          .right { text-align: right; }
          .grand-total { font-size: 18px; color: #000; border-top: 2px solid #333 !important; }
        </style>
      </head>
      <body>

        <div class="header">
          <div class="business-info">
            <div class="title">INVOICE</div>
            <p><strong>${business_name}</strong></p>
            <p>${business_email}</p>
            <p>${business_phone}</p>
          </div>
          <div class="invoice-info" style="text-align: right;">
            <p><strong>Invoice #:</strong> ${invoice_number}</p>
            <p><strong>Date:</strong> ${created_at}</p>
            <p><strong>Due Date:</strong> ${due_date}</p>
          </div>
        </div>

        <div class="section">
          <div class="billed-to">
            <p style="color: #777; margin-bottom: 5px;">BILLED TO:</p>
            <p><strong>${first_name} ${last_name}</strong></p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 50%;">Description</th>
              <th style="width: 10%;">Qty</th>
              <th style="width: 20%;">Price</th>
              <th style="width: 20%;" class="right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.formattedPrice}</td>
                <td class="right">${item.formattedTotal}</td>
              </tr>`).join("")}
          </tbody>
        </table>

        <div class="totals-container">
          <table class="totals-table">
            <tr>
              <td>Subtotal:</td>
              <td class="right">${subtotal}</td>
            </tr>
            <tr>
              <td>Tax:</td>
              <td class="right">${tax}</td>
            </tr>
            <tr class="grand-total">
              <td><strong>Total:</strong></td>
              <td class="right"><strong>${total}</strong></td>
            </tr>
          </table>
        </div>

      </body>
      </html>
      `;
};