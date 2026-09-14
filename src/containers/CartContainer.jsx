import { useMemo, useState } from 'react'
import CartPage from '../components/CartPage.jsx'

const CONFIRM_TRANSITION_MS = 450

function CartContainer({ items, isLoading, cart, onIncrement, onDecrement, onBack, orderQueue }) {
  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false)

  // Cart keys are MenuItem ids from the API, so a line only resolves once the
  // menu has loaded; anything that no longer exists on the menu is dropped.
  // While a batch is pending (see useOrderQueue), this is the queue — still
  // fully editable — not the order that's counting down.
  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, quantity]) => ({
          item: items.find((menuItem) => menuItem.id === id),
          quantity,
        }))
        .filter((line) => line.item),
    [cart, items],
  )

  const queueTotal = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0)

  // A brief confirmation beat before the countdown view appears, instead of
  // an instant snap from "cart" to "20s remaining".
  const handlePlaceOrder = () => {
    setIsConfirmingOrder(true)
    setTimeout(() => {
      orderQueue.placeCartOrder()
      setIsConfirmingOrder(false)
    }, CONFIRM_TRANSITION_MS)
  }

  return (
    <CartPage
      lines={lines}
      isLoading={isLoading}
      totalPrice={queueTotal}
      note={orderQueue.note}
      onNoteChange={orderQueue.setNote}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onBack={onBack}
      onPlaceOrder={handlePlaceOrder}
      isConfirmingOrder={isConfirmingOrder}
      isPlacingOrder={orderQueue.isSubmitting}
      orderError={orderQueue.submitError}
      pendingBatch={orderQueue.pendingBatch}
      onCancelPendingLine={orderQueue.cancelPendingLine}
      placedOrders={orderQueue.orders}
    />
  )
}

export default CartContainer
