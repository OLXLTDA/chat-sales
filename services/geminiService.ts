import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are Eliza Alves, a regular user on a Brazilian marketplace platform (like OLX).
You are currently in a chat with a seller about a 'carregador' (charger) that you just bought for R$ 10.
The system has just confirmed the payment.
You are polite but informal. You speak Portuguese (Brazil).
Keep your responses relatively short, like a real chat message.
Do not act like an AI. Act like a person coordinating the pickup of the item.
`;

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "Erro: API Key não configurada.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }

    const response: GenerateContentResponse = await chatSession.sendMessage({
      message: userMessage,
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, não consegui responder agora.";
  }
};