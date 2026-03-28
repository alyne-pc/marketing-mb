import nodemailer from "nodemailer";
import { ENV } from "./_core/env";

// Create transporter for sending emails
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    // Use Gmail or your email service
    transporter = nodemailer.createTransport({
      host: ENV.emailHost,
      port: ENV.emailPort,
      secure: ENV.emailSecure,
      auth: {
        user: ENV.emailUser,
        pass: ENV.emailPassword,
      },
    });
  }
  return transporter;
}

/**
 * Send email notification to manager when new request is created
 */
export async function notifyManagerNewRequest(
  requestId: number,
  fullName: string,
  area: string,
  size: string,
  gestor: string
) {
  try {
    const transporter = getTransporter();
    
    await transporter.sendMail({
      from: ENV.emailUser,
      to: ENV.adminEmail,
      subject: `Nova Solicitação de Camiseta - ${fullName}`,
      html: `
        <h2>Nova Solicitação de Camiseta</h2>
        <p><strong>Solicitante:</strong> ${fullName}</p>
        <p><strong>Área:</strong> ${area}</p>
        <p><strong>Gestor:</strong> ${gestor}</p>
        <p><strong>Tamanho:</strong> ${size}</p>
        <p><strong>ID da Solicitação:</strong> ${requestId}</p>
        <p>Acesse o dashboard para revisar e aprovar/rejeitar a solicitação.</p>
      `,
    });
    
    console.log(`[Email] Manager notification sent for request ${requestId}`);
  } catch (error) {
    console.error("[Email] Failed to notify manager:", error);
  }
}

/**
 * Send email notification to user when request is approved
 */
export async function notifyUserApproved(
  email: string,
  fullName: string,
  size: string,
  area: string
) {
  try {
    const transporter = getTransporter();
    
    await transporter.sendMail({
      from: ENV.emailUser,
      to: email,
      subject: "Sua Solicitação de Camiseta foi Aprovada!",
      html: `
        <h2>Solicitação Aprovada</h2>
        <p>Olá ${fullName},</p>
        <p>Sua solicitação de camiseta foi aprovada!</p>
        <p><strong>Detalhes:</strong></p>
        <ul>
          <li>Tamanho: ${size}</li>
          <li>Área: ${area}</li>
        </ul>
        <p>Você será notificado quando a camiseta estiver pronta para entrega.</p>
      `,
    });
    
    console.log(`[Email] Approval notification sent to ${email}`);
  } catch (error) {
    console.error("[Email] Failed to notify user of approval:", error);
  }
}

/**
 * Send email notification to user when request is rejected
 */
export async function notifyUserRejected(
  email: string,
  fullName: string,
  reason: string
) {
  try {
    const transporter = getTransporter();
    
    await transporter.sendMail({
      from: ENV.emailUser,
      to: email,
      subject: "Sua Solicitação de Camiseta foi Rejeitada",
      html: `
        <h2>Solicitação Rejeitada</h2>
        <p>Olá ${fullName},</p>
        <p>Infelizmente, sua solicitação de camiseta foi rejeitada.</p>
        <p><strong>Motivo:</strong> ${reason}</p>
        <p>Entre em contato com o seu gestor para mais informações.</p>
      `,
    });
    
    console.log(`[Email] Rejection notification sent to ${email}`);
  } catch (error) {
    console.error("[Email] Failed to notify user of rejection:", error);
  }
}

/**
 * Send email notification to marketing when request is approved
 */
export async function notifyMarketingApproved(
  fullName: string,
  area: string,
  size: string,
  gestor: string,
  motivo: string,
  requestId: number
) {
  try {
    const transporter = getTransporter();
    
    await transporter.sendMail({
      from: ENV.emailUser,
      to: ENV.marketingEmail,
      subject: `Solicitação Aprovada - ${fullName}`,
      html: `
        <h2>Solicitação de Camiseta Aprovada</h2>
        <p><strong>Solicitante:</strong> ${fullName}</p>
        <p><strong>Área:</strong> ${area}</p>
        <p><strong>Tamanho:</strong> ${size}</p>
        <p><strong>Gestor:</strong> ${gestor}</p>
        <p><strong>Motivo:</strong> ${motivo}</p>
        <p><strong>ID da Solicitação:</strong> ${requestId}</p>
        <p>Prepare a camiseta para entrega.</p>
      `,
    });
    
    console.log(`[Email] Marketing notification sent for request ${requestId}`);
  } catch (error) {
    console.error("[Email] Failed to notify marketing:", error);
  }
}
