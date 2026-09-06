import { useEffect, useState } from 'react'
import { menuItems } from '../data/menuData.js'
import CartPage from '../components/CartPage.jsx'

function CartContainer({ cart, onIncrement, onDecrement, onBack }) {
  const [note, setNote] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  const lines = Object.entries(cart)
    .map(([id, quantity]) => ({
      item: menuItems.find((menuItem) => menuItem.id === Number(id)),
      quantity,
    }))
    .filter((line) => line.item)

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
