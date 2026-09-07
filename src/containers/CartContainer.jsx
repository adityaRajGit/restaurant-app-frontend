import { useMemo, useState } from 'react'
import CartPage from '../components/CartPage.jsx'

function CartContainer({ items, isLoading, cart, onIncrement, onDecrement, onBack }) {
  const [note, setNote] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Cart keys are MenuItem ids from the API, so a line only resolves once the
  // menu has loaded; anything that no longer exists on the menu is dropped.
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

  const totalPrice = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0)

  return (
    <CartPage
      lines={lines}
      isLoading={isLoading}
      totalPrice={totalPrice}
      note={note}
      onNoteChange={setNote}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onBack={onBack}
      onPlaceOrder={() => setOrderPlaced(true)}
      orderPlaced={orderPlaced}
    />
  )
}

export default CartContainer
