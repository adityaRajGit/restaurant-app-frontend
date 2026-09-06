import Skeleton from './Skeleton.jsx'

function CartItemRowSkeleton() {
  return (
    <div className="flex gap-3 border-b border-gray-100 py-4 last:border-b-0">
      <Skeleton className="h-20 w-20 shrink-0 rounded-xl" />

      <div className="flex flex-1 flex-col">
        <Skeleton className="h-3.5 w-3.5 rounded-[3px]" />
        <Skeleton className="mt-1 h-4 w-2/3" />
        <div className="mt-1.5 space-y-1.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="mt-1 h-3 w-10" />

        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default CartItemRowSkeleton
