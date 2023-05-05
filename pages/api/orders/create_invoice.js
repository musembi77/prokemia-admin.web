import * as fs from 'fs/promises';
import PDFDocument from "pdfkit"

export default function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);
  
  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("https://res.cloudinary.com/musembi77/image/upload/v1671824849/ooa1dvpgz9relvhe6pfd.jpg", 50, 45, { width: 50 })
    .fontSize(10)
    .text("Innovation Core Limited.", 200, 50, { align: "right" })
    .text("Kibo street, Industrial Area", 200, 65, { align: "right" })
    .text("+254202525265", 200, 65, { align: "right" })
    .text("Nairobi, Kenya", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice._id, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Due Date:", 50, customerInformationTop + 30)
    .text(invoice.delivery_date,150,customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.company_name_of_client, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.name_of_client, 300, customerInformationTop + 15)
    .text(invoice.email_of_client, 300, customerInformationTop + 15)
    .text(invoice.mobile_of_client, 300, customerInformationTop + 15)
    .text(invoice.location_of_client,300,customerInformationTop + 30)
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  generateTableRow(
    doc,
    invoiceTableTop,
    invoice.item,
    formatCurrency(invoice.unit_price),
    invoice.volume_of_items,
    formatCurrency(invoice.total)
  );

  generateHr(doc, invoiceTableTop + 20);

//   for (i = 0; i < invoice.items.length; i++) {
//     const item = invoice.items[i];
//     const position = invoiceTableTop + (i + 1) * 30;
//     generateTableRow(
//       doc,
//       position,
//       item.item,
//       item.description,
//       formatCurrency(item.amount / item.quantity),
//       item.quantity,
//       formatCurrency(item.amount)
//     );

//     generateHr(doc, position + 20);
//   }

  const subtotalPosition = invoiceTableTop + 20;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.total)
  );

  const service_fee_position = subtotalPosition + 25;

  generateTableRow(
    doc,
    service_fee_position,
    "",
    "",
    "service fee",
    "",
    formatCurrency(invoice.total % 5)
  );

  const tax_position = service_fee_position + 25;

  generateTableRow(
    doc,
    tax_position,
    "",
    "",
    "service fee",
    "",
    formatCurrency(invoice.total % 16)
  );

  const total_position = tax_position + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    total_position,
    "",
    "",
    "Total Due",
    "",
    formatCurrency(invoice.total + invoice.total % 16 + invoice.total % 5)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Make Payments to Innovation Core LTD, ",
      50,
      780,
      { align: "center", width: 500 }
    )
    .text(
        "SBM BANK KENYA, ACC No.0082102124001, Riverside Branch",
        50,
        780,
        { align: "center", width: 500 }
      )
      .text(
        "Payment is due within 15 days. Thank you for your business.",
        50,
        780,
        { align: "center", width: 500 }
      )
    ;
}

function generateTableRow(
  doc,
  y,
  item,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(unitCost, 150, y)
    .text(quantity, 280, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "ksh" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}
