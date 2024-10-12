import { Twilio } from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID; // sua Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // seu Auth Token
const whatsappNumber = 'whatsapp:+14155238886'; // Número padrão do Twilio para WhatsApp

const client = new Twilio(accountSid, authToken);

const sendWhatsAppMessage = async (to: string, message: string) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: whatsappNumber,
      to: `whatsapp:${to}`, // telefone de destino
    });
    return response;
  } catch (error) {
    console.error('Erro ao enviar a mensagem via WhatsApp:', error);
    throw new Error('Falha ao enviar mensagem');
  }
};

export default { sendWhatsAppMessage };
