function CategoryTabs({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex flex-wrap gap-1.5 border-t border-gray-100 bg-white px-4 py-3 sm:flex-nowrap sm:gap-2 sm:overflow-x-auto sm:px-6 sm:scrollbar-none">
      {categories.map((category) => {
        const isActive = category.id === activeCategory
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={`shrink-0 cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition sm:px-4 sm:py-1.5 sm:text-sm ${
              isActive
                ? 'border-brand-500 bg-brand-500 text-white shadow'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
            }`}
          >
            {category.name}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryTabs
