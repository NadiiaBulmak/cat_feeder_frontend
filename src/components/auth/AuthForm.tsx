import { useState } from 'react'
import type { FormEvent } from 'react'
import { AUTH_COPY } from '../../shared/constants/auth'
import { AUTH_STAGES, type AuthStage } from '../../shared/stages/authStages'
import { authService } from '../../shared/services/authService'
import type { User } from '../../shared/types/auth'
import { AuthStory } from './AuthStory'

type AuthFormProps = { onSuccess: (user: User) => void }

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [stage, setStage] = useState<AuthStage>(AUTH_STAGES.LOGIN)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const isSignup = stage === AUTH_STAGES.SIGNUP

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (password.length < 8) return setError(AUTH_COPY.errors.shortPassword)
    if (isSignup && name.trim().length < 2) return setError(AUTH_COPY.errors.shortName)

    setPending(true)
    window.setTimeout(() => {
      const result = isSignup
        ? authService.signup(name, email, password)
        : authService.login(email, password)
      setPending(false)
      if (result.success) onSuccess(result.user)
      else setError(result.message)
    }, 350)
  }

  const changeStage = () => {
    setStage(isSignup ? AUTH_STAGES.LOGIN : AUTH_STAGES.SIGNUP)
    setError('')
  }

  return (
    <main className="grid min-h-screen bg-[#e7e8de] md:grid-cols-[minmax(280px,.9fr)_minmax(380px,1.1fr)]">
      <AuthStory />
      <section className="mx-auto flex w-[min(calc(100%-3rem),30rem)] flex-col justify-center py-10 md:py-12" aria-labelledby="auth-heading">
        <div className="text-[.85rem] font-extrabold tracking-[.02em] text-[#26382f]"><span className="mr-2">🐾</span>{AUTH_COPY.brand}</div>
        <div className="mb-8 mt-14 md:mt-20">
          <span className="text-[.68rem] font-extrabold tracking-[.16em] text-[#9aa894]">{AUTH_COPY.form.eyebrow}</span>
          <h2 id="auth-heading" className="mb-2 mt-2 font-serif text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[.95] tracking-[-.05em] text-[#26382f]">{isSignup ? AUTH_COPY.form.signupHeading : AUTH_COPY.form.loginHeading}</h2>
          <p className="text-[.9rem] text-[#748076]">{isSignup ? AUTH_COPY.form.signupDescription : AUTH_COPY.form.loginDescription}</p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          {isSignup && <label className="flex flex-col gap-2 text-[.74rem] font-extrabold tracking-[.05em] text-[#536057]">{AUTH_COPY.form.nameLabel}<input className="rounded-sm border border-[#c8cec2] bg-[#f6f6ef] px-4 py-3 text-[.88rem] font-normal tracking-normal text-[#26382f] outline-none placeholder:text-[#929b90] focus:border-[#7d932f] focus:ring-4 focus:ring-[#d8ed7555]" value={name} onChange={(event) => setName(event.target.value)} placeholder={AUTH_COPY.form.namePlaceholder} autoComplete="name" /></label>}
          <label className="flex flex-col gap-2 text-[.74rem] font-extrabold tracking-[.05em] text-[#536057]">{AUTH_COPY.form.emailLabel}<input className="rounded-sm border border-[#c8cec2] bg-[#f6f6ef] px-4 py-3 text-[.88rem] font-normal tracking-normal text-[#26382f] outline-none placeholder:text-[#929b90] focus:border-[#7d932f] focus:ring-4 focus:ring-[#d8ed7555]" value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder={AUTH_COPY.form.emailPlaceholder} required autoComplete="email" /></label>
          <label className="flex flex-col gap-2 text-[.74rem] font-extrabold tracking-[.05em] text-[#536057]">{AUTH_COPY.form.passwordLabel}<input className="rounded-sm border border-[#c8cec2] bg-[#f6f6ef] px-4 py-3 text-[.88rem] font-normal tracking-normal text-[#26382f] outline-none placeholder:text-[#929b90] focus:border-[#7d932f] focus:ring-4 focus:ring-[#d8ed7555]" value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder={AUTH_COPY.form.passwordPlaceholder} required autoComplete={isSignup ? 'new-password' : 'current-password'} /></label>
          {error && <p className="m-0 text-[.78rem] text-[#a13c34]" role="alert">{error}</p>}
          <button className="mt-1 rounded-sm bg-[#26382f] p-4 text-[.72rem] font-black tracking-[.08em] text-[#f7f6ef] transition hover:bg-[#435b4d] disabled:cursor-wait disabled:opacity-65" type="submit" disabled={pending}>{pending ? AUTH_COPY.form.pending : isSignup ? AUTH_COPY.form.signupAction : AUTH_COPY.form.loginAction}</button>
        </form>
        <div className="my-6 flex items-center gap-3 text-[.7rem] text-[#929b90] before:h-px before:flex-1 before:bg-[#d0d4ca] after:h-px after:flex-1 after:bg-[#d0d4ca]"><span>або</span></div>
        <button className="flex w-full items-center justify-center gap-3 rounded-sm border border-[#c8cec2] bg-transparent p-3 text-[.72rem] font-black tracking-[.08em] text-[#26382f] transition hover:bg-[#f6f6ef]" type="button" onClick={() => setError(AUTH_COPY.errors.googleUnavailable)}>G <span>{AUTH_COPY.form.google}</span></button>
        <p className="mt-6 text-center text-[.78rem] text-[#748076]">{isSignup ? 'Вже маєте акаунт?' : 'Ще немає акаунта?'} <button className="font-extrabold text-[#566f23]" type="button" onClick={changeStage}>{isSignup ? 'Увійти' : 'Зареєструватися'}</button></p>
      </section>
    </main>
  )
}
