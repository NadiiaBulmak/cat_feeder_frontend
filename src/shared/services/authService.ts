import { AUTH_COPY } from '../constants/auth'
import { STORAGE_KEYS } from '../constants/storage'
import type { AuthService } from '../interfaces/auth'
import type { AuthResult, User } from '../types/auth'

function readUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) ?? '[]') as User[]
  } catch {
    return []
  }
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export const authService: AuthService = {
  login(email, password): AuthResult {
    const user = readUsers().find(
      (candidate) => candidate.email === normalizeEmail(email) && candidate.password === password,
    )

    if (!user) return { success: false, message: AUTH_COPY.errors.invalidCredentials }
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(user))
    return { success: true, user }
  },

  signup(name, email, password): AuthResult {
    const users = readUsers()
    const normalizedEmail = normalizeEmail(email)

    if (users.some((user) => user.email === normalizedEmail)) {
      return { success: false, message: AUTH_COPY.errors.duplicateEmail }
    }

    const user = { name: name.trim(), email: normalizedEmail, password }
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify([...users, user]))
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(user))
    return { success: true, user }
  },

  getSession(): User | null {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.session) ?? 'null') as User | null
    } catch {
      return null
    }
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.session)
  },
}
