import FoodLoader from './FoodLoader.jsx'

/**
 * `fixed` (default) covers the whole viewport — for app-wide transitions
 * (login/logout, switching between the menu and cart views). Pass
 * `fixed={false}` to instead cover the nearest `relative` ancestor, for a
 * loader scoped to one panel (e.g. the auth card, the cart page).
 */
function LoadingOverlay({ message, fixed = true, className = '' }) {
  const positionClass = fixed ? 'fixed inset-0 z-50' : 'absolute inset-0 z-40'

  return (
    <div
      className={`${positionClass} flex flex-col items-center justify-center gap-3 bg-white/85 backdrop-blur-sm ${className}`}
    >
      <FoodLoader size="lg" />
      {message && <p className="text-sm font-semibold text-gray-600">{message}</p>}
    </div>
  )
}

export default LoadingOverlay
