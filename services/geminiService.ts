
import { GoogleGenAI } from "@google/genai";
import { DOCS_CONTENT } from "../constants";

/**
 * ⚠️ SECURITY WARNING: This implementation exposes the API key in the client bundle!
 *
 * The API key is embedded directly in the compiled JavaScript, making it visible to anyone.
 * This is acceptable ONLY if:
 * 1. You use API key restrictions (HTTP referrer restrictions) in Google Cloud Console
 * 2. You set up billing alerts and quota limits
 * 3. This is for a demo/prototype only
 *
 * RECOMMENDED: Move this to a backend API endpoint that:
 * - Keeps the API key server-side
 * - Implements rate limiting
 * - Validates requests before calling Gemini
 *
 * Example backend (Node.js/Express):
 * ```
 * app.post('/api/chat', async (req, res) => {
 *   const { query } = req.body;
 *   const response = await geminiClient.generateContent(query);
 *   res.json({ response });
 * });
 * ```
 */
export const askGeminiAssistant = async (query: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  // Format documentation content for context
  const docsContext = Object.values(DOCS_CONTENT).map(section => {
    let text = `Section: ${section.title}\nContent: ${section.content || ''}`;
    if (section.subItems) {
      Object.values(section.subItems).forEach(sub => {
        text += `\n\nSub-section: ${sub.title}\nContent: ${sub.content}`;
      });
    }
    return text;
  }).join('\n\n---\n\n');

  const systemInstruction = `
    You are the BookHere Technical Support Assistant. 
    BookHere is a React Native mobile app for property rentals using WordPress (Homey Theme) as a backend.
    
    Use the following documentation context to answer the user's questions accurately:
    ${docsContext}
    
    Guidelines:
    1. Only answer questions related to BookHere and the provided documentation.
    2. If the answer is not in the docs, politely state that you don't have that information but can help with installation or setup.
    3. Keep answers concise, helpful, and technically accurate.
    4. Format your response using clean Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while connecting to the AI assistant. Please try again later.";
  }
};
