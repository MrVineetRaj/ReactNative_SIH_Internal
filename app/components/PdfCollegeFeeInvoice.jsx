const PdfCodeFee = (form) => {
  // Extract data from form for easier access
  const {
    collegeName,
    collegeAddress,
    studentName,
    rollNumber,
    fatherName,
    department,
    degree,
    semester,
    year,
    paymentMode,
    tuitionFee,
    institutionFee,
    universityFee,
    examinationFee,
  } = form;

  // Calculate total fee
  const totalFee = (
    parseFloat(tuitionFee || 0) +
    parseFloat(institutionFee || 0) +
    parseFloat(universityFee || 0) +
    parseFloat(examinationFee || 0)
  ).toFixed(2);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>College Fee Receipt</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 20px;">
      <div style="width: 700px; margin: auto; padding: 20px; border: 1px solid #000; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="margin: 5px 0;">College Fee Invoice</h2>
          <p><strong>${collegeName}</strong></p>
          <p>${collegeAddress}</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div style="width: 48%;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td><b>Student Name</b></td><td>${studentName}</td></tr>
              <tr><td><b>Roll Number</b></td><td>${rollNumber}</td></tr>
              <tr><td><b>Father Name</b></td><td>${fatherName}</td></tr>
              <tr><td><b>Department</b></td><td>${department}</td></tr>
              <tr><td><b>Degree</b></td><td>${degree}</td></tr>
              <tr><td><b>Semester</b></td><td>${semester}</td></tr>
            </table>
          </div>
          <div style="width: 48%;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td><b>Year</b></td><td>${year}</td></tr>
              <tr><td><b>Payment Mode</b></td><td>${paymentMode}</td></tr>
            </table>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <th colspan="2" style="border: 1px solid #000; padding: 8px; text-align: center;">Fee Details (In Rupees)</th>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">Tuition Fee</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">${tuitionFee}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">Institution Fee</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">${institutionFee}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">University Fee</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">${universityFee}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">Examination Fee</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">${examinationFee}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #000; padding: 8px; text-align: center;">Total Fee</th>
            <th style="border: 1px solid #000; padding: 8px; text-align: center;">${totalFee}</th>
          </tr>
        </table>

      </div>
    </body>
    </html>
  `;
};

export default PdfCodeFee;
