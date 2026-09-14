import { useCallback, useEffect, useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { UtensilsCrossed } from 'lucide-react'
import HeaderContainer from './containers/HeaderContainer.jsx'
import MenuContainer from './containers/MenuContainer.jsx'
import FooterContainer from './containers/FooterContainer.jsx'
import CartContainer from './containers/CartContainer.jsx'
import AuthContainer from './containers/AuthContainer.jsx'
import LoadingOverlay from './components/LoadingOverlay.jsx'
import useMenu from './hooks/useMenu.js'
import useAuth from './hooks/useAuth.js'
import useOrderQueue from './hooks/useOrderQueue.js'

const NAVIGATE_TRANSITION_MS = 450

function App() {
  const auth = useAuth()
  const { categories, items, isLoading, error, reload } = useMenu()
  const [cart, setCart] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [view, setView] = useState('menu')
  const [navigatingTo, setNavigatingTo] = useState(null) // 'menu' | 'cart' | null

  // A brief branded transition instead of an instant snap between the two
  // views — the target only actually takes effect once the pause ends.
  useEffect(() => {
    if (!navigatingTo) return undefined
    const timer = setTimeout(() => {
      setView(navigatingTo)
      setNavigatingTo(null)
    }, NAVIGATE_TRANSITION_MS)
    return () => clearTimeout(timer)
  }, [navigatingTo])

  const handleIncrement = useCallback((itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
  }, [])

  const handleDecrement = useCallback((itemId) => {
    setCart((prev) => {
      const nextQty = (prev[itemId] || 0) - 1
      if (nextQty <= 0) {
        const { [itemId]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: nextQty }
    })
  }, [])

  const handleClearCart = useCallback(() => setCart({}), [])

  const handleRestoreLines = useCallback((lines) => {
    setCart((prev) => {
      const next = { ...prev }
      lines.forEach(({ item, quantity }) => {
        next[item.id] = (next[item.id] || 0) + quantity
      })
      return next
    })
  }, [])

  // Lifted to App (not CartContainer) so the countdown survives switching
  // back to the menu view and returning to the cart.
  const orderQueue = useOrderQueue({
    cart,
    items,
    onClearCart: handleClearCart,
    onRestoreLines: handleRestoreLines,
  })

  if (!auth.isAuthenticated) {
    return (
      <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4">
          <div className="flex items-center gap-1.5 text-brand-500">
            <UtensilsCrossed size={26} strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight">Foodie</span>
          </div>
          <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white shadow-sm">
            <AuthContainer auth={auth} />
          </div>
        </div>
      </SkeletonTheme>
    )
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
            onBack={() => setNavigatingTo('menu')}
            orderQueue={orderQueue}
          />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <HeaderContainer
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            cart={cart}
            onCartClick={() => setNavigatingTo('cart')}
            user={auth.user}
            onLogout={auth.logout}
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
          <FooterContainer cart={cart} onViewCart={() => setNavigatingTo('cart')} />
        </div>
      )}

      {navigatingTo && (
        <LoadingOverlay message={navigatingTo === 'cart' ? 'Loading your cart…' : 'Back to the menu…'} />
      )}

      {auth.isLoggingOut && <LoadingOverlay message="Logging out…" />}
    </SkeletonTheme>
  )
}

export default App
