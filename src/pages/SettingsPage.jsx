import { useEffect, useState } from 'react'
import { Link,
  useNavigate } 
  from 'react-router-dom'
import AccountSettings from '../components/AccountSettings'
import DashboardLayout from '../components/DashboardLayout'
import DeleteAccountSection from '../components/DeleteAccountSection'
import { supabase } from '../lib/supabase'

function SettingsPage({ user }) {
  const navigate = useNavigate()

  // Store the user's profile information.
  const [fullName, setFullName] = useState('')
  const [preferredCurrency, setPreferredCurrency] =
    useState('NGN')

  // Control loading and feedback states.
  const [loading, setLoading] = useState(true)
  const [savingCurrency, setSavingCurrency] =
    useState(false)
  const [currencyMessage, setCurrencyMessage] =
    useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true)
      setError('')

      // Fetch the logged-in user's profile.
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, preferred_currency')
        .eq('id', user.id)
        .single()

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }

      setFullName(data.full_name || '')
      setPreferredCurrency(
        data.preferred_currency || 'NGN',
      )
      setLoading(false)
    }

    loadProfile()
  }, [user.id])

  const handleCurrencySave = async (currencyCode) => {
    setSavingCurrency(true)
    setCurrencyMessage('')
    setError('')

    // Save the selected currency to the user's profile.
    const { error: currencyError } = await supabase
      .from('profiles')
      .update({
        preferred_currency: currencyCode,
      })
      .eq('id', user.id)

    setSavingCurrency(false)

    if (currencyError) {
      setError(currencyError.message)
      return
    }

    setPreferredCurrency(currencyCode)
    setCurrencyMessage(
      'Your dashboard currency has been updated.',
    )
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const handleAccountDeleted = async () => {
    // Clear the deleted user's session from this device.
    await supabase.auth.signOut({
      scope: 'local',
    })

    navigate('/login', {
      replace: true,
    })
  }

  const firstName = fullName.split(' ')[0] || 'User'

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="font-medium text-slate-600">
          Loading your settings...
        </p>
      </main>
    )
  }

  return (
    <DashboardLayout
      firstName={firstName}
      onLogout={handleLogout}
    >
      {error && (
        <p className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <AccountSettings
        user={user}
        fullName={fullName}
        onNameUpdated={setFullName}
        preferredCurrency={preferredCurrency}
        onCurrencySave={handleCurrencySave}
        savingCurrency={savingCurrency}
        currencyMessage={currencyMessage}
      />

      {/* Legal information */}
      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Legal and Privacy
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Learn how Expensidify handles your information and
          review the rules for using the application.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/privacy"
            className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Privacy Policy
          </Link>

          <Link
            to="/terms"
            className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Terms of Use
          </Link>
        </div>
      </section>

      <DeleteAccountSection
        onAccountDeleted={handleAccountDeleted}
      />
    </DashboardLayout>
  )
}

export default SettingsPage