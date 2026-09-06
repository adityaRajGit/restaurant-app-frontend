function VegBadge({ veg }) {
  const color = veg ? 'border-green-600' : 'border-red-600'
  const dot = veg ? 'bg-green-600' : 'bg-red-600'

  return (
    <span
      className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center border ${color} rounded-[3px]`}
      aria-label={veg ? 'Veg' : 'Non-veg'}
      title={veg ? 'Veg' : 'Non-veg'}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
    </span>
  )
}

export default VegBadge
