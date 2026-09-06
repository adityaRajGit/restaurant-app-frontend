import { Star } from 'lucide-react'
import VegBadge from './VegBadge.jsx'
import Stepper from './Stepper.jsx'

function FoodItemCard({ item, quantity, onIncrement, onDecrement }) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-5xl sm:text-6xl">
          <div className="flex h-full w-full items-center justify-center">{item.emoji}</div>
        </div>
        {item.bestseller && (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
            Bestseller
          </span>
        )}
        <div className="absolute -bottom-3 right-2">
          <Stepper quantity={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <VegBadge veg={item.veg} />
        <h3 className="mt-1 truncate text-sm font-bold text-gray-900 sm:text-base">{item.name}</h3>
        <p className="mt-0.5 line-clamp-2 flex-1 text-xs text-gray-500 sm:text-sm">
          {item.description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900 sm:text-base">₹{item.price}</span>
          <span className="flex items-center gap-0.5 text-xs font-semibold text-gray-500">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {item.rating}
          </span>
        </div>
      </div>
    </div>
  )
}

export default FoodItemCard
