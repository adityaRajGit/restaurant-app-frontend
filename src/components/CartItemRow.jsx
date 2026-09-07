import { Clock } from 'lucide-react'
import ItemThumbnail from './ItemThumbnail.jsx'
import VegBadge from './VegBadge.jsx'
import Stepper from './Stepper.jsx'

function CartItemRow({ item, quantity, onIncrement, onDecrement }) {
  return (
    <div className="flex gap-3 border-b border-gray-100 py-4 last:border-b-0">
      <ItemThumbnail
        item={item}
        className="h-20 w-20 shrink-0 rounded-xl"
        emojiClassName="text-4xl"
      />

      <div className="flex flex-1 flex-col">
        <VegBadge foodType={item.foodType} />
        <h3 className="mt-1 text-sm font-bold text-gray-900">{item.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{item.description}</p>
        {item.prepMinutes > 0 && (
          <span className="mt-1 flex items-center gap-0.5 text-xs font-semibold text-gray-500">
            <Clock size={12} className="text-gray-400" />
            {item.prepMinutes} min
          </span>
        )}

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">₹{item.price * quantity}</span>
          <Stepper quantity={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
        </div>
      </div>
    </div>
  )
}

export default CartItemRow
