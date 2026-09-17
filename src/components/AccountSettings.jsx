import { useEffect, useState } from 'react'
import { KeyRound, UserRound } from 'lucide-react'
import { supabase } from '../lib/supabase'
import CurrencySettings from './CurrencySettings'

function AccountSettings({
  user,
  fullName,
  onNameUpdated,
  preferredCurrency,
  onCurrencySave,
  savingCurrency,
  currencyMessage,
}) {
  // Keep a separate copy of the name while the user edits it.
  const [name, setName] = useState(fullName)

  // Control feedback and loading states.
  const [savingName, setSavingName] = useState(false)
  const [sendingReset, setSendingReset] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Update the input when the profile finishes loading.
  useEffect(() => {
    setName(fullName)
  }, [fullName])

  const handleNameSubmit = async (event) => {
    event.preventDefault()

    const cleanedName = name.trim()

    setMessage('')
    setError('')

    if (!cleanedName) {
      setError('Please enter your full name.')
      return
    }

    setSavingName(true)

    // Update the user's name in the profiles table.
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        full_name: cleanedName,
      })
      .eq('id', user.id)

    setSavingName(false)

    if (updateError) {
      setError(updateError.message)
      return
    }

    // Update the Dashboard state so the welcome message changes.
    onNameUpdated(cleanedName)
    setMessage('Your name has been updated.')
  }

  const handlePasswordReset = async () => {
    setMessage('')
    setError('')
    setSendingReset(true)

    // Send a secure password-reset link to the user's email.
    const { error: resetError } =
      await supabase.auth.resetPasswordForEmail(
        user.email,
        {
          redirectTo: `${window.location.origin}/update-password`,
        },
      )

    setSendingReset(false)

    if (resetError) {
      setError(resetError.message)
      return
    }

    setMessage(
      'A password-reset link has been sent to your email.',
    )
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Account Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your profile and dashboard preferences.
        </p>
      </div>

      {error && (
        <p className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {message && (
        <p className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {message}
        </p>
      )}

      <div className="space-y-6">
        {/* Profile-name settings */}
        <div className="rounded-2xl border border-slate-200 p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserRound size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Personal information
              </h3>

              <p className="text-sm text-slate-500">
                Update the name shown on your dashboard.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleNameSubmit}
            className="grid gap-4 md:grid-cols-2"
          >
            <div>
              <label
                htmlFor="settings-name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full name
              </label>

              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                autoComplete="name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="settings-email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="settings-email"
                type="email"
                value={user.email || ''}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={savingName}
              className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2 md:w-fit"
            >
              {savingName
                ? 'Saving name...'
                : 'Save Name'}
            </button>
          </form>
        </div>

        {/* Currency preference */}
        <CurrencySettings
          preferredCurrency={preferredCurrency}
          onSave={onCurrencySave}
          saving={savingCurrency}
        />

        {currencyMessage && (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {currencyMessage}
          </p>
        )}

        {/* Password settings */}
        <div className="rounded-2xl border border-slate-200 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <KeyRound size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Password
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Receive a secure link to choose a new
                  password.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={sendingReset}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sendingReset
                ? 'Sending link...'
                : 'Reset Password'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountSettings