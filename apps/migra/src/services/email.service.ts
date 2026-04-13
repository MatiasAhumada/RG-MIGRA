import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface SendCredentialsOptions {
  to: string;
  name: string;
  password: string;
}

export async function sendCredentialsEmail({ to, name, password }: SendCredentialsOptions) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject: "Bienvenido a MIGRA Distribuciones - Credenciales de acceso",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c0392b;">Bienvenido a MIGRA Distribuciones</h2>
        <p>Hola <strong>${name}</strong>,</p>
        <p>Tu solicitud de registro ha sido <strong style="color: #5a9a4e;">aprobada</strong>.</p>
        <p>Ya puedes acceder a tu cuenta con las siguientes credenciales:</p>
        <div style="background-color: #f3fcf0; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <p style="margin: 8px 0;"><strong>Usuario:</strong> ${to}</p>
          <p style="margin: 8px 0;"><strong>Contraseña:</strong> <code style="background-color: #e8e8e8; padding: 2px 8px; border-radius: 4px;">${password}</code></p>
        </div>
        <p>Te recomendamos cambiar tu contraseña después del primer inicio de sesión.</p>
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
          Este mensaje fue enviado automáticamente por el sistema de MIGRA Distribuciones S.R.L.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
