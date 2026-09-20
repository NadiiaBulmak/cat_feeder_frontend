import { apiClient } from '../../api/client'
import { AUTH_COPY } from '../constants/auth'
import type { AuthService } from '../interfaces/auth'
import type { AuthResult, User } from '../types/auth'

const AUTH_TOKEN_KEY = 'access_token'
const USER_SESSION_KEY = 'user'

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function persistSession(user: User, token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user))
}

export const authService: AuthService = {
  async login(email, password): Promise<AuthResult> {
    try {
      const response = await apiClient.post('/auth/login', {
        email: normalizeEmail(email),
        password,
      })

      const data = response.data ?? {}
      const token = data.access_token ?? data.token
      const user = data.user as User | undefined

      if (!user || !token) {
        return { success: false, message: AUTH_COPY.errors.invalidCredentials }
      }

      persistSession(user, token)
      return { success: true, user }
    } catch (error: unknown) {
      const message =
        typeof error === 'object' && error !== null && 'response' in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined

      return {
        success: false,
        message: message || AUTH_COPY.errors.invalidCredentials,
      }
    }
  },

  async signup(name, email, password): Promise<AuthResult> {
    try {
      const response = await apiClient.post('/auth/register', {
        name: name.trim(),
        email: normalizeEmail(email),
        password,
      })

      const data = response.data ?? {}
      const token = data.access_token ?? data.token
      const user = data.user as User | undefined

      if (!user || !token) {
        return { success: false, message: AUTH_COPY.errors.duplicateEmail }
      }

      persistSession(user, token)
      return { success: true, user }
    } catch (error: unknown) {
      const message =
        typeof error === 'object' && error !== null && 'response' in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined

      return {
        success: false,
        message: message || AUTH_COPY.errors.duplicateEmail,
      }
    }
  },

  getSession(): User | null {
    try {
      const storedUser =
        sessionStorage.getItem(USER_SESSION_KEY) ?? localStorage.getItem(USER_SESSION_KEY)
      return storedUser ? (JSON.parse(storedUser) as User) : null
    } catch {
      return null
    }
  },

  logout() {
    sessionStorage.removeItem(AUTH_TOKEN_KEY)
    sessionStorage.removeItem(USER_SESSION_KEY)
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(USER_SESSION_KEY)
  },
}
