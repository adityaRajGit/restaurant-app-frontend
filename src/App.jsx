import { useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import HeaderContainer from './containers/HeaderContainer.jsx'
import MenuContainer from './containers/MenuContainer.jsx'
import FooterContainer from './containers/FooterContainer.jsx'
import CartContainer from './containers/CartContainer.jsx'
import useMenu from './hooks/useMenu.js'

function App() {
  const { categories, items, isLoading, error, reload } = useMenu()
  const [cart, setCart] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [view, setView] = useState('menu')

  const handleIncrement = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
  }

  const handleDecrement = (itemId) => {
    setCart((prev) => {
      const nextQty = (prev[itemId] || 0) - 1
      if (nextQty <= 0) {
        const { [itemId]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: nextQty }
    })
  }

  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      {view === 'cart' ? (
        <div className="min-h-screen bg-gray-50">
          <CartContainer
            items={items}
            isLoading={isLoading}
            cart={cart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onBack={() => setView('menu')}
          />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <HeaderContainer
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            cart={cart}
            onCartClick={() => setView('cart')}
          />
          <MenuContainer
            categories={categories}
            items={items}
            isLoading={isLoading}
            error={error}
            onRetry={reload}
            searchTerm={searchTerm}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            cart={cart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          <FooterContainer cart={cart} onViewCart={() => setView('cart')} />
        </div>
      )}
    </SkeletonTheme>
  )
}

export default App
