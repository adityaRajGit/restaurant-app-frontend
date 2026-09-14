import { ArrowLeft, ShoppingBag } from 'lucide-react'
import CartItemRow from './CartItemRow.jsx'
import CartItemRowSkeleton from './CartItemRowSkeleton.jsx'
import FoodLoader from './FoodLoader.jsx'
import LoadingOverlay from './LoadingOverlay.jsx'
import PendingOrderRow from './PendingOrderRow.jsx'
import PlacedOrdersSummary from './PlacedOrdersSummary.jsx'
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
  isConfirmingOrder,
  isPlacingOrder,
  orderError,
  pendingBatch,
  onCancelPendingLine,
  placedOrders,
}) {
  const hasPending = Boolean(pendingBatch)
  const hasQueue = lines.length > 0
  const totalCount = lines.length + (pendingBatch?.lines.length || 0)
  const isAllCaughtUp = !hasPending && !hasQueue

  return (
    <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col bg-white">
      {isConfirmingOrder && <LoadingOverlay fixed={false} message="Confirming your order…" />}

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
          {totalCount > 0 && (
            <p className="text-xs text-gray-500">
              {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>
      </header>

      <div className="flex-1 px-4">
        <PlacedOrdersSummary orders={placedOrders} />

        {hasPending && (
          <section className="py-2">
            {pendingBatch.secondsLeft > 0 ? (
              <p className="mb-2 text-xs font-semibold text-gray-500">
                Placing your order in {pendingBatch.secondsLeft}s — cancel any item before then
              </p>
            ) : (
              <div className="mb-2 flex items-center gap-2">
                <FoodLoader size="sm" />
                <p className="text-xs font-semibold text-gray-500">Placing your order…</p>
              </div>
            )}
            {pendingBatch.lines.map(({ item, quantity }) => (
              <PendingOrderRow
                key={item.id}
                item={item}
                quantity={quantity}
                secondsLeft={pendingBatch.secondsLeft}
                onCancel={() => onCancelPendingLine(item.id)}
                disabled={isPlacingOrder}
              />
            ))}
          </section>
        )}

        {hasQueue && (
          <section className="py-2">
            {hasPending && <h2 className="mb-2 text-sm font-bold text-gray-900">Up next</h2>}
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
          </section>
        )}

        {hasQueue && (
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
        )}

        {isAllCaughtUp && placedOrders.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-20 text-center">
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
        )}

        {isAllCaughtUp && placedOrders.length > 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-16 text-center">
            <span className="text-4xl">🎉</span>
            <h2 className="text-base font-bold text-gray-900">You're all set!</h2>
            <p className="text-sm text-gray-500">Your food is being prepared and will be ready soon.</p>
            <button
              type="button"
              onClick={onBack}
              className="mt-3 cursor-pointer rounded-xl border border-brand-500 px-5 py-2 text-sm font-bold text-brand-500 transition hover:border-brand-700"
            >
              Back to menu
            </button>
          </div>
        )}
      </div>

      {hasQueue && !hasPending && (
        <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-500">Item Total</span>
            {isLoading ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <span className="text-lg font-bold text-gray-900">₹{totalPrice}</span>
            )}
          </div>
          {orderError && <p className="mb-3 text-sm font-medium text-red-600">{orderError}</p>}
          <button
            type="button"
            onClick={onPlaceOrder}
            disabled={isConfirmingOrder || isPlacingOrder}
            className="w-full cursor-pointer rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-md transition hover:bg-brand-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  )
}

export default CartPage
