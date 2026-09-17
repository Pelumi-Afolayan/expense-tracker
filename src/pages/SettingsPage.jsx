import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountSettings from '../components/AccountSettings'
import DashboardLayout from '../components/DashboardLayout'
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
    </DashboardLayout>
  )
}

export default SettingsPage