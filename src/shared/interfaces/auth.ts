import type { AuthResult, User } from '../types/auth'

export interface AuthService {
  login(email: string, password: string): Promise<AuthResult>
  signup(name: string, email: string, password: string): Promise<AuthResult>
  getSession(): User | null
  logout(): void
}
