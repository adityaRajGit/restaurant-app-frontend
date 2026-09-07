import { useState } from 'react'

/**
 * Shows the item's uploaded image when it has one, and falls back to the
 * category emoji when the field is empty or the image fails to load.
 */
function ItemThumbnail({ item, className = '', emojiClassName = '' }) {
  const [hasFailed, setHasFailed] = useState(false)
  const showImage = Boolean(item.imageUrl) && !hasFailed

  return (
    <div
      className={`overflow-hidden bg-gradient-to-br from-brand-100 to-brand-50 ${className}`}
    >
      {showImage ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          onError={() => setHasFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className={`flex h-full w-full items-center justify-center ${emojiClassName}`}>
          {item.emoji}
        </div>
      )}
    </div>
  )
}

export default ItemThumbnail
