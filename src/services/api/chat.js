import api from './client'

/**
 * Envía un mensaje al chatbot de VetSync.
 * @param {string} message - Mensaje del usuario
 * @param {Array<{role: 'user'|'assistant', content: string}>} history - Historial de conversación
 * @returns {Promise<string>} Respuesta del asistente
 */
export const sendChatMessage = async ({ message, history = [] }) => {
  const { data } = await api.post('/chat/message', { message, history })
  return data.reply
}
