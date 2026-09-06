import Skeleton from './Skeleton.jsx'

const pillWidths = [
  'w-10 sm:w-12',
  'w-16 sm:w-20',
  'w-10 sm:w-12',
  'w-28 sm:w-32',
  'w-32 sm:w-36',
  'w-28 sm:w-32',
  'w-24 sm:w-28',
]

function CategoryTabsSkeleton() {
  return (
    <div className="flex flex-wrap gap-1.5 border-t border-gray-100 bg-white px-4 py-3 sm:flex-nowrap sm:gap-2 sm:px-6">
      {pillWidths.map((width, index) => (
        <Skeleton key={index} className={`h-6 shrink-0 rounded-full sm:h-8 ${width}`} />
      ))}
    </div>
  )
}

export default CategoryTabsSkeleton
