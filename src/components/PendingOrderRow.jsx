import ItemThumbnail from './ItemThumbnail.jsx'

function PendingOrderRow({ item, quantity, secondsLeft, onCancel, disabled }) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-b-0">
      <ItemThumbnail item={item} className="h-14 w-14 shrink-0 rounded-lg" emojiClassName="text-2xl" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-gray-900">{item.name}</p>
        <p className="text-xs text-gray-500">
          Qty {quantity} · ₹{item.price * quantity}
        </p>
      </div>

      <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-bold tabular-nums text-gray-600">
        {secondsLeft}s
      </span>

      <button
        type="button"
        onClick={onCancel}
        disabled={disabled}
        className="shrink-0 cursor-pointer rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancel
      </button>
    </div>
  )
}

export default PendingOrderRow
