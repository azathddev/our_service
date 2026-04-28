import { useState } from 'react'
import { apiRequest } from '../api/client'
import ApiResult from '../components/ApiResult'

function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      setResult(response)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="glass page-card">
      <h2>Регистрация пользователя</h2>
      <p className="lead-text">Создаёт нового пользователя в системе.</p>

      <form className="form-grid" onSubmit={onSubmit}>
        <label htmlFor="register-name">Имя</label>
        <input
          id="register-name"
          value={form.name}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, name: event.target.value }))
          }
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, email: event.target.value }))
          }
          required
        />

        <label htmlFor="register-password">Пароль</label>
        <input
          id="register-password"
          type="password"
          minLength={6}
          value={form.password}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, password: event.target.value }))
          }
          required
        />

        <button className="btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Отправка...' : 'Зарегистрировать'}
        </button>
      </form>

      <ApiResult error={error} result={result} />
    </section>
  )
}

export default RegisterPage
