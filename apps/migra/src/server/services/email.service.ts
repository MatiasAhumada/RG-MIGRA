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
    filename: string,
  ) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3fcf0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3fcf0; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(43, 100, 133, 0.1); overflow: hidden;">
                <tr>
                  <td style="background: linear-gradient(135deg, #2b6485 0%, #336366 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                      Documentación de Pedido
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #e0f2f1; font-size: 14px;">
                      Pedido PED-${pedidoId}
                    </p>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="margin: 0 0 20px 0; color: #161d16; font-size: 16px; line-height: 1.6;">
                      Estimado cliente,
                    </p>
                    
                    <p style="margin: 0 0 30px 0; color: #3d4a3d; font-size: 15px; line-height: 1.6;">
                      Adjuntamos la documentación correspondiente a su pedido <strong style="color: #2b6485;">PED-${pedidoId}</strong>.
                    </p>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f3fcf0 0%, #e8f5e9 100%); border-left: 4px solid #7cb56e; border-radius: 8px; margin: 30px 0;">
                      <tr>
                        <td style="padding: 25px;">
                          <p style="margin: 0; color: #3d4a3d; font-size: 14px; line-height: 1.6;">
                            📎 <strong>Archivo adjunto:</strong> ${filename}
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 30px 0 0 0; color: #3d4a3d; font-size: 14px; line-height: 1.6;">
                      Si tiene alguna consulta, no dude en contactarnos.
                    </p>
                  </td>
                </tr>
                
                <tr>
                  <td style="background-color: #f3fcf0; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                    <p style="margin: 0 0 10px 0; color: #2b6485; font-size: 16px; font-weight: 600;">
                      MIGRA Distribuciones S.R.L
                    </p>
                    <p style="margin: 0; color: #3d4a3d; font-size: 12px; line-height: 1.5;">
                      Este es un correo automático, por favor no responder.<br>
                      C.U.I.T: 33-70903990-9
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    return this.sendEmail({
      to,
      subject: `Documentación - Pedido PED-${pedidoId}`,
      html,
      attachments: [
        {
          filename,
          content: documentBuffer,
        },
      ],
    });
  },

  async sendClientCredentials(
    to: string,
    razonSocial: string,
    email: string,
    password: string,
  ) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3fcf0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3fcf0; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(43, 100, 133, 0.1); overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2b6485 0%, #336366 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                      ¡Bienvenido a MIGRA!
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #e0f2f1; font-size: 14px;">
                      Su cuenta ha sido aprobada
                    </p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="margin: 0 0 20px 0; color: #161d16; font-size: 16px; line-height: 1.6;">
                      Estimado/a cliente de <strong style="color: #2b6485;">${razonSocial}</strong>,
                    </p>
                    
                    <p style="margin: 0 0 30px 0; color: #3d4a3d; font-size: 15px; line-height: 1.6;">
                      Su solicitud de registro ha sido <strong style="color: #7cb56e;">aprobada exitosamente</strong>. A continuación encontrará sus credenciales de acceso al sistema:
                    </p>
                    
                    <!-- Credentials Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f3fcf0 0%, #e8f5e9 100%); border-left: 4px solid #2b6485; border-radius: 8px; margin: 30px 0;">
                      <tr>
                        <td style="padding: 25px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom: 15px;">
                                <p style="margin: 0; color: #3d4a3d; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                  Usuario
                                </p>
                                <p style="margin: 5px 0 0 0; color: #161d16; font-size: 16px; font-weight: 600;">
                                  ${email}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p style="margin: 0; color: #3d4a3d; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                  Contraseña Temporal
                                </p>
                                <div style="margin: 8px 0 0 0; background-color: #ffffff; border: 2px dashed #2b6485; border-radius: 6px; padding: 12px 16px; display: inline-block;">
                                  <code style="color: #2b6485; font-size: 18px; font-weight: 700; letter-spacing: 1px; font-family: 'Courier New', monospace;">${password}</code>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Important Notice -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 8px; margin: 25px 0;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                            <strong>⚠️ Importante:</strong> Por seguridad, le recomendamos cambiar su contraseña al iniciar sesión por primera vez.
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3009"}/login" style="display: inline-block; background: linear-gradient(135deg, #2b6485 0%, #336366 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(43, 100, 133, 0.3);">
                            Iniciar Sesión Ahora
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 30px 0 0 0; color: #3d4a3d; font-size: 14px; line-height: 1.6;">
                      Si tiene alguna consulta o necesita asistencia, no dude en contactarnos.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f3fcf0; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                    <p style="margin: 0 0 10px 0; color: #2b6485; font-size: 16px; font-weight: 600;">
                      MIGRA Distribuciones S.R.L
                    </p>
                    <p style="margin: 0; color: #3d4a3d; font-size: 12px; line-height: 1.5;">
                      Este es un correo automático, por favor no responder.<br>
                      C.U.I.T: 33-70903990-9
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    return this.sendEmail({
      to,
      subject: "🎉 Credenciales de Acceso - MIGRA Distribuciones",
      html,
    });
  },
};
