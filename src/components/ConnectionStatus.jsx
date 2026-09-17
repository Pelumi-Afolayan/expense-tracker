import { useEffect, useState } from 'react'
import { Wifi, WifiOff } from 'lucide-react'

function ConnectionStatus() {
  // Check the user's current internet status.
  const [isOnline, setIsOnline] = useState(
    window.navigator.onLine,
  )

  // The banner is hidden initially when internet is available.
  const [showBanner, setShowBanner] = useState(
    !window.navigator.onLine,
  )

  useEffect(() => {
    let hideTimer

    const handleOffline = () => {
      // Keep the warning visible while the user is offline.
      setIsOnline(false)
      setShowBanner(true)

      clearTimeout(hideTimer)
    }

    const handleOnline = () => {
      // Inform the user that their connection has returned.
      setIsOnline(true)
      setShowBanner(true)

      // Hide the success message after three seconds.
      hideTimer = setTimeout(() => {
        setShowBanner(false)
      }, 3000)
    }

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!showBanner) {
    return null
  }

  return (
    <div
      className={`fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
        isOnline
          ? 'bg-emerald-600 text-white'
          : 'bg-slate-900 text-white'
      }`}
    >
      {isOnline ? (
        <Wifi size={20} />
      ) : (
        <WifiOff size={20} />
      )}

      <div>
        <p className="font-semibold">
          {isOnline
            ? 'You are back online'
            : 'You are offline'}
        </p>

        {!isOnline && (
          <p className="mt-0.5 text-xs text-slate-300">
            You cannot load or save transactions until your
            connection returns.
          </p>
        )}
      </div>
    </div>
  )
}

export default ConnectionStatus