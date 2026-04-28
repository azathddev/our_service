import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import CategoriesPage from './pages/CategoriesPage'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('authToken') ?? '')

  useEffect(() => {
    if (token.trim()) {
      localStorage.setItem('authToken', token.trim())
      return
    }

    localStorage.removeItem('authToken')
  }, [token])

  return (
    <Routes>
      <Route path="/" element={<AppLayout token={token} onTokenChange={setToken} />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="categories" element={<CategoriesPage token={token} />} />
        <Route path="products" element={<ProductsPage token={token} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
