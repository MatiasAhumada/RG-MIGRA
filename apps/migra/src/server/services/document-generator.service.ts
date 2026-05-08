import ExcelJS from "exceljs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import type { PedidoWithRelations } from "@/types/pedido.types";

export const documentGeneratorService = {
  async generateExcel(pedido: PedidoWithRelations): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Pedido");

    worksheet.columns = [
      { header: "Producto", key: "producto", width: 30 },
      { header: "SKU", key: "sku", width: 15 },
      { header: "Color", key: "color", width: 12 },
      { header: "Talle", key: "talle", width: 10 },
      { header: "Cantidad", key: "cantidad", width: 12 },
      { header: "Precio Unit.", key: "precio", width: 15 },
      { header: "Total", key: "total", width: 15 },
    ];

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF2b6485" },
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };

    worksheet.addRow({});
    worksheet.addRow({
      producto: `Pedido: PED-${pedido.id}`,
    });
    worksheet.addRow({
      producto: `Cliente: ${pedido.cliente.razonSocial}`,
    });
    worksheet.addRow({
      producto: `Fecha: ${new Date(pedido.fecha).toLocaleDateString("es-AR")}`,
    });
    worksheet.addRow({});

    pedido.detalles.forEach((detalle) => {
      worksheet.addRow({
        producto: detalle.producto.name,
        sku: detalle.producto.sku,
        color: detalle.color ?? "-",
        talle: detalle.talle ?? "-",
        cantidad: detalle.cantidad,
        precio: `$${detalle.producto.price.toFixed(2)}`,
        total: `$${detalle.total.toFixed(2)}`,
      });
    });

    worksheet.addRow({});
    const totalRow = worksheet.addRow({
      producto: "",
      sku: "",
      color: "",
      talle: "",
      cantidad: "",
      precio: "TOTAL:",
      total: `$${pedido.totalPedido.toFixed(2)}`,
    });
    totalRow.font = { bold: true };

    return Buffer.from(await workbook.xlsx.writeBuffer());
  },

  async generatePDF(pedido: PedidoWithRelations): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let yPosition = 800;

    page.drawText(`Pedido PED-${pedido.id}`, {
      x: 200,
      y: yPosition,
      size: 20,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    yPosition -= 40;

    page.drawText(`Cliente: ${pedido.cliente.razonSocial}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font,
    });
    yPosition -= 20;

    page.drawText(
      `Fecha: ${new Date(pedido.fecha).toLocaleDateString("es-AR")}`,
      { x: 50, y: yPosition, size: 12, font },
    );
    yPosition -= 20;

    page.drawText(`CUIT: ${pedido.cliente.cuit}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font,
    });
    yPosition -= 40;

    page.drawText("Detalle del Pedido", {
      x: 50,
      y: yPosition,
      size: 14,
      font: fontBold,
    });
    yPosition -= 25;

    page.drawText("Producto", {
      x: 50,
      y: yPosition,
      size: 10,
      font: fontBold,
    });
    page.drawText("SKU", { x: 200, y: yPosition, size: 10, font: fontBold });
    page.drawText("Cant.", { x: 280, y: yPosition, size: 10, font: fontBold });
    page.drawText("Precio", { x: 330, y: yPosition, size: 10, font: fontBold });
    page.drawText("Total", { x: 450, y: yPosition, size: 10, font: fontBold });
    yPosition -= 20;

    for (const detalle of pedido.detalles) {
      const productName =
        detalle.producto.name.length > 25
          ? detalle.producto.name.substring(0, 25) + "..."
          : detalle.producto.name;
      const variant = [detalle.color, detalle.talle]
        .filter((v) => v)
        .join(" - ");

      page.drawText(productName, { x: 50, y: yPosition, size: 10, font });
      if (variant) {
        page.drawText(variant, { x: 50, y: yPosition - 10, size: 8, font });
      }
      page.drawText(detalle.producto.sku, {
        x: 200,
        y: yPosition,
        size: 10,
        font,
      });
      page.drawText(detalle.cantidad.toString(), {
        x: 280,
        y: yPosition,
        size: 10,
        font,
      });
      page.drawText(`$${detalle.producto.price.toFixed(2)}`, {
        x: 330,
        y: yPosition,
        size: 10,
        font,
      });
      page.drawText(`$${detalle.total.toFixed(2)}`, {
        x: 450,
        y: yPosition,
        size: 10,
        font,
      });
      yPosition -= variant ? 25 : 20;

      if (yPosition < 100) {
        const newPage = pdfDoc.addPage([595, 842]);
        yPosition = 800;
      }
    }

    yPosition -= 20;
    page.drawText(`TOTAL: $${pedido.totalPedido.toFixed(2)}`, {
      x: 400,
      y: yPosition,
      size: 14,
      font: fontBold,
    });

    if (pedido.observaciones) {
      yPosition -= 30;
      page.drawText("Observaciones:", {
        x: 50,
        y: yPosition,
        size: 12,
        font: fontBold,
      });
      yPosition -= 15;
      const obsLines = pedido.observaciones.match(/.{1,80}/g) || [];
      for (const line of obsLines) {
        page.drawText(line, { x: 50, y: yPosition, size: 10, font });
        yPosition -= 15;
      }
    }

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  },

  async generateWord(pedido: PedidoWithRelations): Promise<Buffer> {
    const tableRows = [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "Producto", bold: true })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "SKU", bold: true })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "Cantidad", bold: true })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "Precio", bold: true })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "Total", bold: true })],
              }),
            ],
          }),
        ],
      }),
      ...pedido.detalles.map(
        (detalle) =>
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph(detalle.producto.name),
                  ...((detalle.color ?? detalle.talle)
                    ? [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: [detalle.color, detalle.talle]
                                .filter((v) => v)
                                .join(" - "),
                              size: 18,
                              color: "666666",
                            }),
                          ],
                        }),
                      ]
                    : []),
                ],
              }),
              new TableCell({
                children: [new Paragraph(detalle.producto.sku)],
              }),
              new TableCell({
                children: [new Paragraph(detalle.cantidad.toString())],
              }),
              new TableCell({
                children: [
                  new Paragraph(`$${detalle.producto.price.toFixed(2)}`),
                ],
              }),
              new TableCell({
                children: [new Paragraph(`$${detalle.total.toFixed(2)}`)],
              }),
            ],
          }),
      ),
    ];

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: `Pedido PED-${pedido.id}`,
              heading: "Heading1",
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `Cliente: ${pedido.cliente.razonSocial}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `Fecha: ${new Date(pedido.fecha).toLocaleDateString("es-AR")}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `CUIT: ${pedido.cliente.cuit}`,
              spacing: { after: 300 },
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: tableRows,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `TOTAL: $${pedido.totalPedido.toFixed(2)}`,
                  bold: true,
                }),
              ],
              spacing: { before: 300 },
            }),
            ...(pedido.observaciones
              ? [
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Observaciones:", bold: true }),
                    ],
                    spacing: { before: 300, after: 100 },
                  }),
                  new Paragraph({ text: pedido.observaciones }),
                ]
              : []),
          ],
        },
      ],
    });

    return Buffer.from(await Packer.toBuffer(doc));
  },
};
