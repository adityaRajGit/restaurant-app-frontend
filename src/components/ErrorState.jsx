import { RefreshCw } from 'lucide-react'

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
      <span className="text-4xl">😕</span>
      <p className="font-semibold text-gray-700">Couldn&apos;t load the menu</p>
      <p className="max-w-xs text-sm text-gray-400">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 flex cursor-pointer items-center gap-2 rounded-xl bg-brand-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-600"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorState
