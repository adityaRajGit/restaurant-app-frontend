const EMOJIS = ['🍕', '🍔', '🍰']

const SIZES = {
  sm: 'text-base gap-1',
  md: 'text-2xl gap-1.5',
  lg: 'text-4xl gap-2',
}

/**
 * Three food emojis bouncing in a staggered wave — a lightweight,
 * dependency-free "loading dots" stand-in that matches the emoji imagery
 * already used for menu items (ItemThumbnail's fallback).
 */
function FoodLoader({ size = 'md', className = '' }) {
  const sizeClass = SIZES[size] || SIZES.md

  return (
    <div className={`flex items-end ${sizeClass} ${className}`} role="status" aria-label="Loading">
      {EMOJIS.map((emoji, index) => (
        <span
          key={emoji}
          className="animate-bounce"
          style={{ animationDelay: `${index * 0.12}s`, animationDuration: '0.9s' }}
        >
          {emoji}
        </span>
      ))}
    </div>
  )
}

export default FoodLoader
