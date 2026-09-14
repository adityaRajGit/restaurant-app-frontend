import { useState } from 'react'
import AuthForm from '../components/AuthForm.jsx'

function AuthContainer({ auth }) {
  const [mode, setMode] = useState('login')

  return (
    <AuthForm
      mode={mode}
      onModeChange={setMode}
      onSubmit={mode === 'login' ? auth.login : auth.signup}
      isSubmitting={auth.isSubmitting}
      error={auth.error}
    />
  )
}

export default AuthContainer
