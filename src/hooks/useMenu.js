import { useCallback, useEffect, useState } from 'react'
import { fetchGroupedMenu } from '../api/menuApi.js'

const EMPTY_MENU = { categories: [], items: [] }

/**
 * Loads the menu once for the whole app. The menu grid and the cart both read
 * from this single copy so a cart line can always resolve its item, and
 * `reload` backs the retry button on the error state.
 */
export default function useMenu() {
  const [menu, setMenu] = useState(EMPTY_MENU)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    fetchGroupedMenu({ signal: controller.signal })
      .then((result) => {
        if (!active) return
        setMenu(result)
        setIsLoading(false)
      })
      .catch((err) => {
        if (!active || err.name === 'AbortError') return
        setMenu(EMPTY_MENU)
        setError(err.message || 'Something went wrong while loading the menu.')
        setIsLoading(false)
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [reloadToken])

  // Reset here rather than inside the effect: the retry click is what puts the
  // hook back into its loading state, so the effect only reports the result.
  const reload = useCallback(() => {
    setIsLoading(true)
    setError(null)
    setReloadToken((token) => token + 1)
  }, [])

  return { categories: menu.categories, items: menu.items, isLoading, error, reload }
}
