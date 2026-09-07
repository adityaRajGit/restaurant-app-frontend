// Mirrors FOOD_TYPES on the server: veg | egg | non_veg.
const FOOD_TYPE_STYLES = {
  veg: { border: 'border-green-600', dot: 'bg-green-600', label: 'Veg' },
  egg: { border: 'border-amber-500', dot: 'bg-amber-500', label: 'Contains egg' },
  non_veg: { border: 'border-red-600', dot: 'bg-red-600', label: 'Non-veg' },
}

function VegBadge({ foodType = 'veg' }) {
  const style = FOOD_TYPE_STYLES[foodType] || FOOD_TYPE_STYLES.non_veg

  return (
    <span
      className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center border ${style.border} rounded-[3px]`}
      aria-label={style.label}
      title={style.label}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
    </span>
  )
}

export default VegBadge
