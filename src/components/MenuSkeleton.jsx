import Skeleton from './Skeleton.jsx'
import FoodItemCardSkeleton from './FoodItemCardSkeleton.jsx'

function MenuSkeleton({ count = 8 }) {
  return (
    <section className="mb-8">
      <Skeleton className="mb-3 h-6 w-32 rounded sm:h-7 sm:w-40" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <FoodItemCardSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}

export default MenuSkeleton
