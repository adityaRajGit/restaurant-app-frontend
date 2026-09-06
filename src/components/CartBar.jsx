import { ShoppingBag } from 'lucide-react'

function CartBar({ itemCount, onViewCart }) {
  if (itemCount === 0) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 sm:left-1/2 sm:right-auto sm:w-96 sm:-translate-x-1/2">
      <button
        type="button"
        onClick={onViewCart}
        className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-brand-500 px-5 py-3.5 text-white shadow-lg shadow-brand-500/30 transition active:scale-[0.98]"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <ShoppingBag size={18} />
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
        <span className="text-sm font-bold">View Cart →</span>
      </button>
    </div>
  )
}

export default CartBar
