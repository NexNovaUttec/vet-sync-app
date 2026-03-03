import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { logout as apiLogout } from '../services/api/auth'
import { refreshToken as apiRefreshToken } from '../services/api/auth'
import { toast } from 'sonner'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get('accessToken')
      const userData = Cookies.get('userData')

      if (token && userData) {
        try {
          setIsAuthenticated(true)
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error('Failed to parse user data from cookies:', error)
          // Limpiar cookies si los datos están corruptos
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
          Cookies.remove('userData')
          setIsAuthenticated(false)
          setUser(null)
        }
      } else {
        // Intentar renovar usando refreshToken
        const refreshToken = Cookies.get('refreshToken')
        if (refreshToken) {
          try {
            const data = await apiRefreshToken({ refreshToken })
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data

            // Guardar nuevas cookies
            const accessExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hora
            Cookies.set('accessToken', newAccessToken, {
              expires: accessExpires,
              secure: true,
              sameSite: 'strict'
            })
            const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            Cookies.set('refreshToken', newRefreshToken, {
              expires: refreshExpires,
              secure: true,
              sameSite: 'strict'
            })

            // Derivar userData decodificando el JWT con soporte para UTF-8 y padding
            const base64Url = newAccessToken.split('.')[1]
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            const jsonPayload = decodeURIComponent(
              window
                .atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            )
            const payload = JSON.parse(jsonPayload)
            const userData = {
              id: payload.id,
              email: payload.email,
              nombre: payload.nombre,
              apellido: payload.apellido,
              role: payload.role || 'user'
            }
            Cookies.set('userData', JSON.stringify(userData), {
              expires: accessExpires,
              secure: true,
              sameSite: 'strict'
            })

            setIsAuthenticated(true)
            setUser(userData)
          } catch (err) {
            console.error('Refresh token failed on mount:', err)
            // refresh inválido → limpiar todo
            Cookies.remove('refreshToken')
            setIsAuthenticated(false)
            setUser(null)
          }
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      }
      setLoading(false)
    }

    checkLogin()
  }, [])

  const login = (data) => {
    const { accessToken, refreshToken } = data
    console.log('3.a. Ejecutando login en AuthContext. data recibida:', data)

    // Obtener userData del payload del access token
    const base64Url = accessToken.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    const payload = JSON.parse(jsonPayload)
    console.log('3.b. Payload JWT decodificado:', payload)

    const userData = {
      id: payload.id,
      email: payload.email,
      nombre: payload.nombre,
      apellido: payload.apellido,
      role: payload.role || 'user'
    }
    console.log('3.c. userData construido:', userData)

    const expires = new Date(new Date().getTime() + 60 * 60 * 1000)

    Cookies.set('accessToken', accessToken, { expires, secure: true, sameSite: 'strict' })
    Cookies.set('refreshToken', refreshToken, {
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: 'strict'
    }) // Refresh token por 7 días
    Cookies.set('userData', JSON.stringify(userData), { expires, secure: true, sameSite: 'strict' })

    setIsAuthenticated(true)
    setUser(userData)

    return userData
  }

  const logout = async () => {
    const refreshToken = Cookies.get('refreshToken')
    try {
      if (refreshToken) {
        await apiLogout({ refreshToken })
      }
      toast.success('Sesión cerrada exitosamente')
    } catch (error) {
      console.error('Error calling logout API:', error)
    }
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('userData')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>{children}</AuthContext.Provider>
  )
}

export { AuthContext }
