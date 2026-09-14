import Header from '../components/Header.jsx'

function HeaderContainer({ searchTerm, onSearchChange, cart, onCartClick, user, onLogout }) {
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <Header
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      cartCount={cartCount}
      onCartClick={onCartClick}
      user={user}
      onLogout={onLogout}
    />
  )
}

export default HeaderContainer
