import { useState } from 'react'
import { AuthForm } from './components/auth/AuthForm'
import { FeederDashboard } from './components/dashboard/FeederDashboard'
import { authService } from './shared/services/authService'
import type { User } from './shared/types/auth'

function App() {
  const [user, setUser] = useState<User | null>(() => authService.getSession())

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  // return <FeederDashboard user={user} onLogout={logout} />;
  return user
    ? <FeederDashboard user={user} onLogout={logout} />
    : <AuthForm onSuccess={setUser} />
}

export default App
