import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { supabase } from '../lib/supabase'
import GoogleAuthButton from '../components/GoogleAuthButton'

function Register() {
  // Store the registration form values.
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Control password visibility.
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  // Control loading, success and error feedback.
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async (event) => {
    event.preventDefault()

    setMessage('')
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Please complete all the fields.')
      return
    }

    if (password.length < 6) {
      setError(
        'Your password must contain at least 6 characters.',
      )
      return
    }

    if (password !== confirmPassword) {
      setError('Your passwords do not match.')
      return
    }

    setLoading(true)

    // Create the user through Supabase Authentication.
    const { error: signUpError } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    setMessage(
      'Account created successfully. Check your email to confirm your account.',
    )

    // Clear the form after successful registration.
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <AuthLayout
      title="Create an account"
      description="Start tracking your income and expenses."
    >
      {error && (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {message && (
        <p className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {message}
        </p>
      )}


        <div className="mt-8">
        <GoogleAuthButton />
      </div>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-sm text-slate-400">
          or continue with email
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <form
        onSubmit={handleRegister}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="At least 6 characters"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((current) => !current)
              }
              aria-label={
                showPassword
                  ? 'Hide password'
                  : 'Show password'
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Confirm password
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              type={
                showConfirmPassword ? 'text' : 'password'
              }
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Enter your password again"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (current) => !current,
                )
              }
              aria-label={
                showConfirmPassword
                  ? 'Hide confirmed password'
                  : 'Show confirmed password'
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? 'Creating account...'
            : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-emerald-600 hover:text-emerald-700"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Register