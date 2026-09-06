import { Star } from 'lucide-react'
import VegBadge from './VegBadge.jsx'
import Stepper from './Stepper.jsx'

function CartItemRow({ item, quantity, onIncrement, onDecrement }) {
  return (
    <div className="flex gap-3 border-b border-gray-100 py-4 last:border-b-0">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-4xl">
        {item.emoji}
      </div>

      <div className="flex flex-1 flex-col">
        <VegBadge veg={item.veg} />
        <h3 className="mt-1 text-sm font-bold text-gray-900">{item.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{item.description}</p>
        <span className="mt-1 flex items-center gap-0.5 text-xs font-semibold text-gray-500">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {item.rating}
        </span>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">₹{item.price * quantity}</span>
          <Stepper quantity={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
        </div>
      </div>
    </div>
  )
}

export default CartItemRow
