import { useMemo, useState } from 'react'
import { apiRequest } from '../api/client'
import ApiResult from '../components/ApiResult'

function CategoriesPage({ token }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const headers = useMemo(() => {
    if (!token.trim()) {
      return {}
    }
    return { Authorization: `Bearer ${token.trim()}` }
  }, [token])

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await apiRequest('/categories', {
        method: 'POST',
        headers,
        body: JSON.stringify(form),
      })
      setResult(response)
      setForm({ name: '', description: '' })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="glass page-card">
      <h2>Создание категории</h2>
      <p className="lead-text">
        Для отправки нужен токен из верхней панели (`Authorization: Bearer ...`).
      </p>

      <form className="form-grid" onSubmit={onSubmit}>
        <label htmlFor="category-name">Название</label>
        <input
          id="category-name"
          value={form.name}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, name: event.target.value }))
          }
          required
        />

        <label htmlFor="category-description">Описание</label>
        <textarea
          id="category-description"
          rows={4}
          value={form.description}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, description: event.target.value }))
          }
          required
        />

        <button className="btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Создание...' : 'Создать категорию'}
        </button>
      </form>

      <ApiResult error={error} result={result} />
    </section>
  )
}

export default CategoriesPage
