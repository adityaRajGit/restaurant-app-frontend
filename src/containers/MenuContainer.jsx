import { useEffect, useMemo, useState } from 'react'
import { categories, menuItems } from '../data/menuData.js'
import CategoryTabs from '../components/CategoryTabs.jsx'
import CategoryTabsSkeleton from '../components/CategoryTabsSkeleton.jsx'
import FoodItemCard from '../components/FoodItemCard.jsx'
import MenuSkeleton from '../components/MenuSkeleton.jsx'

function MenuContainer({ searchTerm, activeCategory, onCategoryChange, cart, onIncrement, onDecrement }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return menuItems.filter((item) => {
      const matchesQuery = query.length === 0 || item.name.toLowerCase().includes(query)
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      return matchesQuery && matchesCategory
    })
  }, [searchTerm, activeCategory])

  const visibleCategories =
    searchTerm.trim().length > 0
      ? categories.filter((category) => filteredItems.some((item) => item.category === category.id))
      : categories

  const tabs = useMemo(() => [{ id: 'all', name: 'All' }, ...categories], [])

  return (
    <main className="mx-auto max-w-7xl pb-28">
      {isLoading ? (
        <CategoryTabsSkeleton />
      ) : (
        <CategoryTabs categories={tabs} activeCategory={activeCategory} onSelect={onCategoryChange} />
      )}

      <div className="px-4 py-5 sm:px-6">
        {isLoading ? (
          <>
            <MenuSkeleton />
            <MenuSkeleton count={4} />
          </>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
            <span className="text-4xl">🔍</span>
            <p className="font-semibold text-gray-700">No dishes found</p>
            <p className="text-sm text-gray-400">Try a different search or category</p>
          </div>
        ) : (
          visibleCategories.map((category) => {
            const items = filteredItems.filter((item) => item.category === category.id)
            if (items.length === 0) return null

            return (
              <section key={category.id} id={category.id} className="mb-8 scroll-mt-32">
                <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">{category.name}</h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {items.map((item) => (
                    <FoodItemCard
                      key={item.id}
                      item={item}
                      quantity={cart[item.id] || 0}
                      onIncrement={() => onIncrement(item.id)}
                      onDecrement={() => onDecrement(item.id)}
                    />
                  ))}
                </div>
              </section>
            )
          })
        )}
      </div>
    </main>
  )
}

export default MenuContainer
