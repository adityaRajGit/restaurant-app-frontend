// The API stores an optional `image_url` per item. Until an item has one, the
// card falls back to an emoji picked from its category so the grid never shows
// an empty tile. Keys are matched case-insensitively against the category name
// coming back from the API (MENU_CATEGORIES on the server).
const CATEGORY_EMOJI = {
  cakes: '🍰',
  pastries: '🥐',
  'cookies & biscuits': '🍪',
  breads: '🍞',
  desserts: '🍮',
  beverages: '☕',
  coffee: '☕',
  tea: '🍵',
  other: '🍽️',
}

const FALLBACK_EMOJI = '🍽️'

export function emojiForCategory(category) {
  if (!category) return FALLBACK_EMOJI
  return CATEGORY_EMOJI[category.trim().toLowerCase()] || FALLBACK_EMOJI
}
