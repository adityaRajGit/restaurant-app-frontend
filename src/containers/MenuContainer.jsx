import { useMemo } from 'react'
import CategoryTabs from '../components/CategoryTabs.jsx'
import CategoryTabsSkeleton from '../components/CategoryTabsSkeleton.jsx'
import ErrorState from '../components/ErrorState.jsx'
import FoodItemCard from '../components/FoodItemCard.jsx'
import MenuSkeleton from '../components/MenuSkeleton.jsx'

function MenuContainer({
  categories,
  items,
  isLoading,
  error,
  onRetry,
  searchTerm,
  activeCategory,
  onCategoryChange,
  cart,
  onIncrement,
  onDecrement,
}) {
  // Search and category filtering run against the menu already in memory —
  // the API returns the full menu in one call, so there is nothing to refetch.
  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return items.filter((item) => {
      const matchesQuery = query.length === 0 || item.name.toLowerCase().includes(query)
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      return matchesQuery && matchesCategory
    })
  }, [items, searchTerm, activeCategory])

  const visibleCategories =
    searchTerm.trim().length > 0
      ? categories.filter((category) => filteredItems.some((item) => item.category === category.id))
      : categories

  const tabs = useMemo(() => [{ id: 'all', name: 'All' }, ...categories], [categories])

  return (
    <main className="mx-auto max-w-7xl pb-28">
      {isLoading || error ? (
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
        ) : error ? (
          <ErrorState message={error} onRetry={onRetry} />
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
            <span className="text-4xl">🔍</span>
            <p className="font-semibold text-gray-700">No dishes found</p>
            <p className="text-sm text-gray-400">
              {items.length === 0
                ? 'The kitchen has not added anything to the menu yet'
                : 'Try a different search or category'}
            </p>
          </div>
        ) : (
          visibleCategories.map((category) => {
            const categoryItems = filteredItems.filter((item) => item.category === category.id)
            if (categoryItems.length === 0) return null

            return (
              <section key={category.id} id={category.id} className="mb-8 scroll-mt-32">
                <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">{category.name}</h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {categoryItems.map((item) => (
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
