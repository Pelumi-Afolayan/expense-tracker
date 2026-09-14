import { useState } from 'react'
import { supabase } from '../lib/supabase'

function GoogleAuthButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')

    const { error: googleError } =
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://expensidify.vercel.app',
        },
      })

    if (googleError) {
      setError(googleError.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="h-5 w-5"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.1H42V20H24v8h11.3A12 12 0 1 1 32.7 15l5.7-5.7A20 20 0 1 0 44 24c0-1.3-.1-2.6-.4-3.9Z"
            />

            <path
              fill="#FF3D00"
              d="m6.3 14.7 6.6 4.8A12 12 0 0 1 32.7 15l5.7-5.7A20 20 0 0 0 6.3 14.7Z"
            />

            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2A12 12 0 0 1 12.9 28l-6.5 5A20 20 0 0 0 24 44Z"
            />

            <path
              fill="#1976D2"
              d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4 5.6l6.2 5.2C41.1 35.5 44 30.6 44 24c0-1.3-.1-2.6-.4-3.9Z"
            />
          </svg>

        {loading ? 'Connecting...' : 'Continue with Google'}
      </button>

      {error && (
        <p className="mt-3 text-center text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default GoogleAuthButton