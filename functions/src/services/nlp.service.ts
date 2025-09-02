
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as functions from 'firebase-functions';

const GEMINI_API_KEY = functions.config().gemini?.key;

if (!GEMINI_API_KEY) {
  throw new Error("La variable de entorno GEMINI_API_KEY no está definida.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyzeIntent(message: string): Promise<string> {
  const prompt = `
    Analiza el siguiente mensaje de un cliente y clasifica su intención principal.
    Las únicas categorías posibles son: "ventas", "soporte", "reclamos", "promociones", "rrhh", "alianzas", "facturacion", "human_handoff", "general".
    Responde únicamente con una de esas palabras, en minúsculas.
    Mensaje: "${message}"
    Respuesta:
  `;

  try {
    functions.logger.info("Enviando prompt a la API de Gemini...");
    const result = await model.generateContent(prompt);
    const response = result.response;
    const intent = response.text().trim().toLowerCase();
    
    functions.logger.info(`Intención detectada por Gemini: ${intent}`);
    const validIntents = ['ventas', 'soporte', 'reclamos', 'promociones', 'rrhh', 'alianzas', 'facturacion', 'human_handoff', 'general'];
    
    if (validIntents.includes(intent)) {
      return intent;
    }
    
    functions.logger.warn(`Intención no válida o desconocida '${intent}', se usará 'general'.`);
    return 'general';
  } catch (error) {
    functions.logger.error("Error al analizar la intención con Gemini:", error);
    return 'general';
  }
}
