export type AuthMode = 'login' | 'signup'

export type User = {
  name?: string
  email: string
  password?: string
}

export type AuthResult =
  | { success: true; user: User }
  | { success: false; message: string }
