import { apiRequest } from './httpClient.js'

/**
 * POST /order/new — there is no separate cart resource on the server; the
 * cart lives client-side (see CartContainer) until this call turns it into
 * an order. Only menu item id + quantity are sent — the server re-prices
 * every line from the menu so the client can never under/over-charge.
 *
 * `orderType` defaults to takeaway (dine-in/delivery need a table number or
 * address the UI doesn't collect yet).
 */
export async function placeOrder({ lines, orderType = 'takeaway', customerNotes }) {
  const data = await apiRequest('/order/new', {
    method: 'POST',
    body: {
      order_type: orderType,
      items: lines.map((line) => ({
        menu_item: line.item.id,
        quantity: line.quantity,
      })),
      ...(customerNotes ? { customer_notes: customerNotes } : {}),
    },
  })
  return normalizeOrder(data.order)
}

function normalizeOrder(order) {
  if (!order) return null

  return {
    id: order._id,
    orderNumber: order.order_number,
    status: order.status,
    subtotal: order.subtotal,
    tax: order.tax,
    deliveryFee: order.delivery_fee,
    total: order.total,
  }
}
