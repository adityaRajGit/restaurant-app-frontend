import { apiRequest } from './httpClient.js'
import { emojiForCategory } from '../data/categoryVisuals.js'

/**
 * GET /menu/grouped — the customer-facing menu: available, non-deleted items
 * already grouped by category and sorted by display_order on the server.
 *
 * Returns { categories, items } where `categories` drives the tab strip
 * (Coffee, Beverages, Cakes, ... — whatever the kitchen actually has in stock)
 * and `items` is the flat list the grid and the cart both read from.
 */
export async function fetchGroupedMenu({ signal } = {}) {
  const data = await apiRequest('/menu/grouped', { signal })
  const groups = Array.isArray(data.menu) ? data.menu : []

  const categories = []
  const items = []

  groups.forEach((group) => {
    const category = group?.category
    const groupItems = Array.isArray(group?.items) ? group.items : []
    if (!category || groupItems.length === 0) return

    categories.push({ id: category, name: category })
    groupItems.forEach((item) => {
      const normalized = normalizeMenuItem(item, category)
      if (normalized) items.push(normalized)
    })
  })

  return { categories, items }
}

/**
 * Maps a MenuItem document onto the shape the presentational components expect.
 * `rating` and `bestseller` have no column on the server yet, so they are left
 * undefined and the components simply omit those badges.
 */
function normalizeMenuItem(item, category) {
  if (!item?._id) return null

  return {
    id: String(item._id),
    name: item.name || 'Unnamed item',
    description: item.description || '',
    price: Number(item.price) || 0,
    category,
    foodType: item.food_type || 'veg',
    imageUrl: item.image_url || '',
    emoji: emojiForCategory(category),
    prepMinutes: Number(item.prep_minutes) || 0,
  }
}
