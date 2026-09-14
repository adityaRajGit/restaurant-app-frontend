import { ShoppingCart, UtensilsCrossed } from 'lucide-react'
import SearchBar from './SearchBar.jsx'
import UserBadge from './UserBadge.jsx'

function Header({ searchTerm, onSearchChange, cartCount, onCartClick, user, onLogout }) {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6">
        <div className="flex shrink-0 items-center gap-1.5 text-brand-500">
          <UtensilsCrossed size={22} strokeWidth={2.5} />
          <span className="text-lg font-bold tracking-tight sm:text-xl">Foodie</span>
        </div>

        <div className="hidden flex-1 sm:block">
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <UserBadge user={user} onLogout={onLogout} />

          <button
            type="button"
            onClick={onCartClick}
            aria-label="View cart"
            className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-brand-50 p-2.5 text-brand-500 transition hover:border-brand-300 hover:bg-white"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="px-4 pb-3 sm:hidden">
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>
    </header>
  )
}

export default Header
