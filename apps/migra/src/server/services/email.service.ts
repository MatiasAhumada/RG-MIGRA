import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  attachments?: Attachment[];
}

export const emailService = {
  async sendEmail({ to, subject, html, attachments }: SendEmailParams) {
    return transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
      attachments,
    });
  },

  async sendInvoice(to: string, pedidoId: number, invoiceBuffer: Buffer) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2b6485;">Factura de Pedido PED-${pedidoId}</h2>
        <p>Estimado cliente,</p>
        <p>Adjuntamos la factura correspondiente a su pedido PED-${pedidoId}.</p>
        <p>Gracias por su compra.</p>
        <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">Este es un correo automático, por favor no responder.</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject: `Factura - Pedido PED-${pedidoId}`,
      html,
      attachments: [
        {
          filename: `factura-PED-${pedidoId}.pdf`,
          content: invoiceBuffer,
        },
      ],
    });
  },

  async sendShippingDocuments(
    to: string,
    pedidoId: number,
    documentBuffer: Buffer,
  ) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2b6485;">Documentación de Envío - Pedido PED-${pedidoId}</h2>
        <p>Estimado cliente,</p>
        <p>Su pedido PED-${pedidoId} ha sido enviado.</p>
        <p>Adjuntamos la documentación de envío correspondiente.</p>
        <p>Gracias por su compra.</p>
        <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">Este es un correo automático, por favor no responder.</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject: `Envío Confirmado - Pedido PED-${pedidoId}`,
      html,
      attachments: [
        {
          filename: `envio-PED-${pedidoId}.pdf`,
          content: documentBuffer,
        },
      ],
    });
  },
};
