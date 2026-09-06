import { ArrowLeft, ShoppingBag } from 'lucide-react'
import CartItemRow from './CartItemRow.jsx'
import CartItemRowSkeleton from './CartItemRowSkeleton.jsx'
import Skeleton from './Skeleton.jsx'

function CartPage({
  lines,
  isLoading,
  totalPrice,
  note,
  onNoteChange,
  onIncrement,
  onDecrement,
  onBack,
  onPlaceOrder,
  orderPlaced,
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col bg-white">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to menu"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-gray-400"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-base font-bold text-gray-900">Your Cart</h1>
          {lines.length > 0 && !orderPlaced && (
            <p className="text-xs text-gray-500">
              {lines.length} {lines.length === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>
      </header>

      {orderPlaced ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
          <span className="text-5xl">🎉</span>
          <h2 className="text-lg font-bold text-gray-900">Order placed!</h2>
          <p className="text-sm text-gray-500">Your food is being prepared and will be on its way soon.</p>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 cursor-pointer rounded-xl border border-brand-500 px-5 py-2 text-sm font-bold text-brand-500 transition hover:border-brand-700"
          >
            Back to menu
          </button>
        </div>
      ) : lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
          <ShoppingBag size={40} className="text-gray-300" />
          <h2 className="text-lg font-bold text-gray-900">Your cart is empty</h2>
          <p className="text-sm text-gray-500">Add some delicious food to get started.</p>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 cursor-pointer rounded-xl bg-brand-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-600"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 px-4">
            {isLoading
              ? lines.map(({ item }) => <CartItemRowSkeleton key={item.id} />)
              : lines.map(({ item, quantity }) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    quantity={quantity}
                    onIncrement={() => onIncrement(item.id)}
                    onDecrement={() => onDecrement(item.id)}
                  />
                ))}

            <div className="py-4">
              <label htmlFor="chef-note" className="text-sm font-bold text-gray-900">
                Add a note for the chef
              </label>
              <textarea
                id="chef-note"
                value={note}
                onChange={(event) => onNoteChange(event.target.value)}
                placeholder="E.g. less spicy, no onions..."
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">Item Total</span>
              {isLoading ? (
                <Skeleton className="h-6 w-16" />
              ) : (
                <span className="text-lg font-bold text-gray-900">₹{totalPrice}</span>
              )}
            </div>
            <button
              type="button"
              onClick={onPlaceOrder}
              className="w-full cursor-pointer rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-md transition hover:bg-brand-600 active:scale-[0.98]"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage
