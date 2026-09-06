import ReactSkeleton from 'react-loading-skeleton'

function Skeleton({ className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <ReactSkeleton height="100%" containerClassName="block h-full" className="block! h-full!" />
    </div>
  )
}

export default Skeleton
