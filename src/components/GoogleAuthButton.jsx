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
          redirectTo: window.location.origin,
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
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-lg font-bold text-blue-600">
          G
        </span>

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