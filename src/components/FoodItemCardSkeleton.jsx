import Skeleton from './Skeleton.jsx'

function FoodItemCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="relative">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="absolute -bottom-3 right-2">
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <Skeleton className="h-3.5 w-3.5 rounded-[3px]" />
        <Skeleton className="mt-1 h-4 w-3/4 sm:h-5" />
        <div className="mt-1.5 flex-1 space-y-1.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-4 w-10 sm:h-5" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
    </div>
  )
}

export default FoodItemCardSkeleton
