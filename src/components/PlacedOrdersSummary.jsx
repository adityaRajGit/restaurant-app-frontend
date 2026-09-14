function PlacedOrdersSummary({ orders }) {
  if (orders.length === 0) return null

  return (
    <div className="flex flex-col gap-2 py-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between rounded-xl border border-brand-100 bg-brand-50 px-3 py-2.5"
        >
          <div>
            <p className="text-sm font-bold text-gray-900">{order.orderNumber}</p>
            <p className="text-xs text-brand-700">Order placed · being prepared</p>
          </div>
          <span className="text-sm font-bold text-gray-900">₹{order.total}</span>
        </div>
      ))}
    </div>
  )
}

export default PlacedOrdersSummary
