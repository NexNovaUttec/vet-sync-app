import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'
import { sendChatMessage } from '@/services/api/chat'

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: '¡Hola! Soy el asistente virtual de VetSync 🐾 ¿En qué puedo ayudarte hoy? Puedo orientarte sobre el cuidado de tu mascota o sobre el uso de la plataforma.'
}

function ChatMessage ({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-sm'
            : 'bg-muted text-foreground rounded-tl-sm'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

export function ChatBot () {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    // El historial que se envía al backend excluye el welcome message
    const history = updatedMessages.slice(1, -1)

    try {
      const reply = await sendChatMessage({ message: text, history })
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (error) {
      let errorMsg

      if (!error.response) {
        // Error de red: no se pudo conectar al servidor
        errorMsg = 'No se pudo conectar con el servidor. Verifica que el backend esté activo.'
      } else if (error.response.status === 429) {
        errorMsg = 'Demasiadas solicitudes, espera un momento e intenta de nuevo.'
      } else if (error.response.status === 400) {
        errorMsg = error.response.data?.error || 'Mensaje inválido.'
      } else if (error.response.status === 503) {
        errorMsg = 'El servicio de chat no está disponible en este momento.'
      } else {
        errorMsg = error.response.data?.error || 'Ocurrió un error inesperado, intenta de nuevo.'
      }

      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${errorMsg}` }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e)
    }
  }

  return (
    <>
      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 flex flex-col shadow-2xl rounded-2xl overflow-hidden border border-border bg-background animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <div>
                <p className="text-sm font-semibold leading-none">Asistente VetSync</p>
                <p className="text-xs opacity-75 mt-0.5">Siempre disponible</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 h-80 bg-background/95">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {isLoading && (
              <div className="flex gap-2 flex-row">
                <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
                  <Bot size={14} />
                </div>
                <div className="bg-muted text-foreground rounded-2xl rounded-tl-sm px-3 py-2 flex items-center gap-1">
                  <Loader2 size={14} className="animate-spin" />
                  <span className="text-sm text-muted-foreground">Escribiendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-border bg-background">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              maxLength={500}
              disabled={isLoading}
              className="flex-1 text-sm bg-muted rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Enviar mensaje"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-4 right-4 z-50 w-13 h-13 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-200 flex items-center justify-center"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  )
}
