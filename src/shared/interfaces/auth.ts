import type { AuthResult, User } from '../types/auth'

export interface AuthService {
  login(email: string, password: string): AuthResult
  signup(name: string, email: string, password: string): AuthResult
  getSession(): User | null
  logout(): void
}
