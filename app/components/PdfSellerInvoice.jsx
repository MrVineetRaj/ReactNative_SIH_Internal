const PdfCode = (form) => {
  // Extract data from form for easier access
  const {
    name,
    companyName,
    address,
    invoiceNumber,
    date,
    email,
    phone,
    customerName,
    customerAddress,
    customerEmail,
    customerPhone,
    items,
  } = form;

  // Calculate the total for each item and overall total
  const calculateItemTotal = (item) =>
    (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2);

  const totalAmount = items
    .reduce((total, item) => total + parseFloat(calculateItemTotal(item)), 0)
    .toFixed(2);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        
        <div style="max-width: 800px; margin: 20px auto; padding: 20px; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px;">
        
            <div style="text-align: center; margin: 50px 0;">
                <h1 style="margin: 0; color: #333333;">Invoice</h1>
                <p style="margin: 5px 0; color: #777777;">Invoice Number: ${invoiceNumber}</p>
                <p style="margin: 5px 0; color: #777777;">Date: ${date}</p>
            </div>

            <!-- Seller and Customer Information -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <!-- Seller Information -->
                <div style="width: 48%;">
                    <h3 style="margin: 0; color: #333333;">From</h3>
                    <p style="margin: 5px 0; color: #555555;">
                        <strong>Company Name:</strong> ${companyName}<br>
                        <strong>Address:</strong> ${address}<br>
                        <strong>Email:</strong> ${email}<br>
                        <strong>Phone:</strong> ${phone}
                    </p>
                </div>

                <!-- Customer Information -->
                <div style="width: 48%;">
                    <h3 style="margin: 0; color: #333333;">Bill To</h3>
                    <p style="margin: 5px 0; color: #555555;">
                        <strong>Name:</strong> ${customerName}<br>
                        <strong>Address:</strong> ${customerAddress}<br>
                        <strong>Email:</strong> ${customerEmail}<br>
                        <strong>Phone:</strong> ${customerPhone}
                    </p>
                </div>
            </div>

            <!-- Invoice Details -->
            <div style="margin-bottom: 20px;">
                <h2 style="margin: 0; color: #333333;">Invoice Details</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background-color: #f2f2f2;">
                            <th style="border: 1px solid #dddddd; padding: 8px min-width: 200px; text-align: left;">Item</th>
                            <th style="border: 1px solid #dddddd; padding: 8px; text-align: right;">Quantity</th>
                            <th style="border: 1px solid #dddddd; padding: 8px; text-align: right;">Price</th>
                            <th style="border: 1px solid #dddddd; padding: 8px; text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items
                          .map(
                            (item) => `
                        <tr>
                            <td style="border: 1px solid #dddddd; padding: 8px;">${
                              item.name
                            }</td>
                            <td style="border: 1px solid #dddddd; padding: 8px; text-align: right;">${
                              item.quantity
                            }</td>
                            <td style="border: 1px solid #dddddd; padding: 8px; text-align: right;">$${parseFloat(
                              item.price
                            ).toFixed(2)}</td>
                            <td style="border: 1px solid #dddddd; padding: 8px; text-align: right;">$${calculateItemTotal(
                              item
                            )}</td>
                        </tr>`
                          )
                          .join("")}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" style="border: 1px solid #dddddd; padding: 8px; text-align: right; font-weight: bold;"></td>
                            <td style="border: 1px solid #dddddd; padding: 8px; text-align: right; font-weight: bold;">$${totalAmount}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div style="margin-bottom: 200px"></div>
        </div>
    </body>
    </html>
  `;
};

export default PdfCode;
