import { useState } from 'react'
import { LogOut, User } from 'lucide-react'

function UserBadge({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Account"
        className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-brand-50 p-2.5 text-brand-500 transition hover:border-brand-300 hover:bg-white"
      >
        <User size={20} />
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close account menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 cursor-default"
          />
          <div className="absolute right-0 top-full z-40 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
              <span className="text-xs font-semibold text-green-600">Online</span>
            </div>
            <p className="mt-2 truncate text-sm font-bold text-gray-900">{user.name}</p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
            <button
              type="button"
              onClick={onLogout}
              className="mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-1.5 text-xs font-bold text-gray-600 transition hover:border-gray-400"
            >
              <LogOut size={13} />
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default UserBadge
