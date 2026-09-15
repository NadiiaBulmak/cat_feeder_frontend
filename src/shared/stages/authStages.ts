export const AUTH_STAGES = {
  LOGIN: 'login',
  SIGNUP: 'signup',
} as const

export type AuthStage = (typeof AUTH_STAGES)[keyof typeof AUTH_STAGES]
