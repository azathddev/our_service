import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="glass page-card">
      <h2>Управление каталогом</h2>
      <p className="lead-text">
        Выберите раздел в меню: регистрация нового пользователя, создание категорий
        или добавление товаров.
      </p>

      <div className="quick-links">
        <Link to="/register" className="chip-link">
          Перейти к регистрации
        </Link>
        <Link to="/categories" className="chip-link">
          Перейти к категориям
        </Link>
        <Link to="/products" className="chip-link">
          Перейти к товарам
        </Link>
      </div>
    </section>
  )
}

export default HomePage
