import { ENV } from "./_core/env";
import { notifyOwner } from "./_core/notification";

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
    await notifyOwner({
      title: `Nova Solicitação de Camiseta - ${fullName}`,
      content: `
Uma nova solicitação de camiseta foi criada:

**Solicitante:** ${fullName}
**Área:** ${area}
**Gestor:** ${gestor}
**Tamanho:** ${size}
**ID da Solicitação:** ${requestId}

Acesse o dashboard para revisar e aprovar/rejeitar a solicitação.
      `,
    });
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
    // Using the built-in notification system
    // In production, this would integrate with an email service
    console.log(`[Email] Sending approval email to ${email}`);
    
    // TODO: Integrate with actual email service
    // For now, we'll log the intent
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
    console.log(`[Email] Sending rejection email to ${email}`);
    
    // TODO: Integrate with actual email service
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
    console.log(`[Email] Sending approved request details to marketing`);
    
    // TODO: Integrate with actual email service
    // Should send to ENV.marketingEmail with details:
    // - Solicitante
    // - Área
    // - Tamanho
    // - Gestor
    // - Motivo
    // - ID da solicitação
  } catch (error) {
    console.error("[Email] Failed to notify marketing:", error);
  }
}
