import { Clock } from 'lucide-react'
import ItemThumbnail from './ItemThumbnail.jsx'
import VegBadge from './VegBadge.jsx'
import Stepper from './Stepper.jsx'

function FoodItemCard({ item, quantity, onIncrement, onDecrement }) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="relative">
        <ItemThumbnail
          item={item}
          className="aspect-square rounded-xl"
          emojiClassName="text-5xl sm:text-6xl"
        />
        <div className="absolute -bottom-3 right-2">
          <Stepper quantity={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <VegBadge foodType={item.foodType} />
        <h3 className="mt-1 truncate text-sm font-bold text-gray-900 sm:text-base">{item.name}</h3>
        <p className="mt-0.5 line-clamp-2 flex-1 text-xs text-gray-500 sm:text-sm">
          {item.description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900 sm:text-base">₹{item.price}</span>
          {item.prepMinutes > 0 && (
            <span className="flex items-center gap-0.5 text-xs font-semibold text-gray-500">
              <Clock size={12} className="text-gray-400" />
              {item.prepMinutes} min
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodItemCard
