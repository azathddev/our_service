import { NavLink, Outlet } from 'react-router-dom'

function AppLayout({ token, onTokenChange }) {
  const linkClassName = ({ isActive }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <p className="brand-label">Catalog</p>
          <h1>Admin UI</h1>
        </div>

        <nav className="nav-menu">
          <NavLink className={linkClassName} to="/">
            Главная
          </NavLink>
          <NavLink className={linkClassName} to="/register">
            Регистрация
          </NavLink>
          <NavLink className={linkClassName} to="/categories">
            Категории
          </NavLink>
          <NavLink className={linkClassName} to="/products">
            Товары
          </NavLink>
        </nav>
      </aside>

      <div className="content">
        <header className="topbar glass">
          <label htmlFor="token" className="token-label">
            JWT токен для защищенных запросов
          </label>
          <input
            id="token"
            type="text"
            className="token-input"
            placeholder="Bearer token"
            value={token}
            onChange={(event) => onTokenChange(event.target.value)}
          />
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
