import { useMemo, useState } from 'react'
import { apiRequest } from '../api/client'
import ApiResult from '../components/ApiResult'

function ProductsPage({ token }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
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

    const payload = {
      ...form,
      price: Number(form.price),
      categoryId: Number(form.categoryId),
    }

    try {
      const response = await apiRequest('/products', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      })
      setResult(response)
      setForm({
        title: '',
        description: '',
        price: '',
        categoryId: '',
      })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="glass page-card">
      <h2>Создание товара</h2>
      <p className="lead-text">
        Товар привязывается к категории через поле `categoryId`.
      </p>

      <form className="form-grid" onSubmit={onSubmit}>
        <label htmlFor="product-title">Название</label>
        <input
          id="product-title"
          value={form.title}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, title: event.target.value }))
          }
          required
        />

        <label htmlFor="product-description">Описание</label>
        <textarea
          id="product-description"
          rows={4}
          value={form.description}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, description: event.target.value }))
          }
          required
        />

        <label htmlFor="product-price">Цена</label>
        <input
          id="product-price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, price: event.target.value }))
          }
          required
        />

        <label htmlFor="product-category-id">ID категории</label>
        <input
          id="product-category-id"
          type="number"
          min="1"
          value={form.categoryId}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, categoryId: event.target.value }))
          }
          required
        />

        <button className="btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Создание...' : 'Создать товар'}
        </button>
      </form>

      <ApiResult error={error} result={result} />
    </section>
  )
}

export default ProductsPage
