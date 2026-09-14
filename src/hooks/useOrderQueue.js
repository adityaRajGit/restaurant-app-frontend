import { useCallback, useEffect, useRef, useState } from 'react'
import { placeOrder } from '../api/orderApi.js'

const COUNTDOWN_SECONDS = 20

/**
 * Owns the whole "place order" cooldown pipeline, lifted up to App so it
 * survives navigating back to the menu and returning to the cart (the view
 * switch unmounts CartContainer, but not App).
 *
 * At most one batch is ever counting down ("pending"). Anything sitting in
 * the live cart while a batch is pending is the "queue" — still fully
 * editable — and is promoted into a fresh pending batch (with its own
 * 20s countdown) the instant the current one resolves or every line in it
 * gets cancelled. Only one manual click ever starts this chain; every
 * later batch promotes itself automatically.
 */
export default function useOrderQueue({ cart, items, onClearCart, onRestoreLines }) {
  const [note, setNote] = useState('')
  const [pendingBatch, setPendingBatch] = useState(null) // { lines, note, secondsLeft }
  const [orders, setOrders] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const cartRef = useRef(cart)
  const itemsRef = useRef(items)
  cartRef.current = cart
  itemsRef.current = items

  // Guards the fire-on-zero effect against double submission. Deliberately
  // a ref, not state: the effect below used to gate on `isSubmitting`
  // *state*, but since it also set that same state, the state update
  // triggered a dependency change that re-ran the effect's own cleanup —
  // flipping `active` to false on the request that was still in flight, so
  // a real 200 response got silently discarded. A ref sidesteps that
  // because writing to it doesn't schedule a re-render or a dependency
  // change.
  const hasFiredRef = useRef(false)

  const snapshotQueueLines = useCallback(() => {
    return Object.entries(cartRef.current)
      .map(([id, quantity]) => ({
        item: itemsRef.current.find((menuItem) => menuItem.id === id),
        quantity,
      }))
      .filter((line) => line.item)
  }, [])

  const startBatch = useCallback(
    (lines) => {
      hasFiredRef.current = false
      setPendingBatch({ lines, note, secondsLeft: COUNTDOWN_SECONDS })
      setNote('')
      onClearCart()
    },
    [note, onClearCart],
  )

  const placeCartOrder = useCallback(() => {
    const lines = snapshotQueueLines()
    if (lines.length === 0) return
    startBatch(lines)
  }, [snapshotQueueLines, startBatch])

  const cancelPendingLine = useCallback(
    (itemId) => {
      if (!pendingBatch) return
      const nextLines = pendingBatch.lines.filter((line) => line.item.id !== itemId)

      if (nextLines.length > 0) {
        setPendingBatch({ ...pendingBatch, lines: nextLines })
        return
      }

      // Every line in this batch was cancelled — free the slot right away
      // instead of making a queued batch wait out a now-empty countdown.
      const queued = snapshotQueueLines()
      if (queued.length > 0) {
        startBatch(queued)
      } else {
        setPendingBatch(null)
      }
    },
    [pendingBatch, snapshotQueueLines, startBatch],
  )

  // Tick the shared countdown once a second.
  useEffect(() => {
    if (!pendingBatch || pendingBatch.secondsLeft <= 0) return undefined

    const timer = setTimeout(() => {
      setPendingBatch((prev) => (prev ? { ...prev, secondsLeft: prev.secondsLeft - 1 } : prev))
    }, 1000)

    return () => clearTimeout(timer)
  }, [pendingBatch])

  // Fire the order the instant the countdown hits zero, then promote
  // whatever queued up in the meantime.
  useEffect(() => {
    if (!pendingBatch || pendingBatch.secondsLeft > 0 || hasFiredRef.current) return undefined

    hasFiredRef.current = true
    let active = true
    setIsSubmitting(true)
    setSubmitError(null)

    placeOrder({ lines: pendingBatch.lines, customerNotes: pendingBatch.note })
      .then((order) => {
        if (!active) return
        setOrders((prev) => [...prev, order])
        const queued = snapshotQueueLines()
        if (queued.length > 0) {
          startBatch(queued)
        } else {
          setPendingBatch(null)
        }
      })
      .catch((err) => {
        if (!active) return
        setSubmitError(err.message || 'Could not place your order. Please try again.')
        onRestoreLines(pendingBatch.lines)
        setNote(pendingBatch.note)
        setPendingBatch(null)
      })
      .finally(() => {
        if (active) setIsSubmitting(false)
      })

    return () => {
      active = false
    }
    // pendingBatch's identity changes every tick; only the zero-crossing
    // this effect guards on (via hasFiredRef) matters here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingBatch])

  return {
    note,
    setNote,
    pendingBatch,
    orders,
    isSubmitting,
    submitError,
    placeCartOrder,
    cancelPendingLine,
  }
}
