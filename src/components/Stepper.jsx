import { Minus, Plus } from 'lucide-react'

function Stepper({ quantity, onIncrement, onDecrement }) {
  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={onIncrement}
        className="w-24 cursor-pointer rounded-xl border border-brand-500 bg-white py-2 text-sm font-bold text-brand-500 shadow-md transition hover:border-brand-700 active:scale-95"
      >
        ADD
      </button>
    )
  }

  return (
    <div className="flex w-24 items-center justify-between rounded-xl bg-brand-500 py-1.5 px-2 text-white shadow-md">
      <button
        type="button"
        onClick={onDecrement}
        aria-label="Decrease quantity"
        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-white/70 transition hover:border-white hover:bg-white/15 active:scale-90"
      >
        <Minus size={12} strokeWidth={3} />
      </button>
      <span className="text-sm font-bold tabular-nums">{quantity}</span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-white/70 transition hover:border-white hover:bg-white/15 active:scale-90"
      >
        <Plus size={12} strokeWidth={3} />
      </button>
    </div>
  )
}

export default Stepper
