import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import CurrencyConverter from '../components/CurrencyConverter'
import FinanceChart from '../components/FinanceChart'
import SummaryCards from '../components/SummaryCards'
import TransactionFilters from '../components/TransactionFilters'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import DashboardLayout from '../components/DashboardLayout'
import DashboardLoading from '../components/DashboardLoading'
import CurrencySettings from '../components/CurrencySettings'



// Return today's date in the format required by an HTML date input.
const getToday = () => new Date().toISOString().split('T')[0]

// Return a fresh, empty transaction form.
const createEmptyForm = () => ({
  title: '',
  amount: '',
  type: 'expense',
  category: '',
  date: getToday(),
})

function Dashboard({ user }) {
  const navigate = useNavigate()

  // Transaction and form states.
  const [transactions, setTransactions] = useState([])
  const [formData, setFormData] = useState(createEmptyForm)
  const [editingId, setEditingId] = useState(null)

  // User and feedback states.
  const [fullName, setFullName] = useState('')
  const [preferredCurrency, setPreferredCurrency] =
  useState('NGN')

  const [savingCurrency, setSavingCurrency] =
    useState(false)

  const [currencyMessage, setCurrencyMessage] =
    useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Store the currently selected filters.
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    date: '',
  })

  useEffect(() => {
    // Load the user's profile and transactions from Supabase.
    const loadDashboard = async () => {
      setLoading(true)
      setError('')

      // Fetch the logged-in user's name.
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, preferred_currency')
        .eq('id', user.id)
        .single()

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }

      setFullName(profile.full_name)
      setPreferredCurrency(
      profile.preferred_currency || 'NGN',
    )

      // Fetch the logged-in user's transactions.
      const { data, error: transactionError } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })

      if (transactionError) {
        setError(transactionError.message)
        setLoading(false)
        return
      }

      // Prepare the Supabase data for our React components.
      const formattedTransactions = data.map((transaction) => ({
        ...transaction,
        amount: Number(transaction.amount),
        date: transaction.transaction_date,
      }))

      setTransactions(formattedTransactions)
      setLoading(false)
    }

    loadDashboard()
  }, [user.id])

  const handleChange = (event) => {
  const { name, value } = event.target

  // Reset the category when switching between income and expense.
  if (name === 'type') {
    setFormData({
      ...formData,
      type: value,
      category: '',
    })

    return
  }

  setFormData({
    ...formData,
    [name]: value,
  })
}

  const handleFilterChange = (event) => {
    const { name, value } = event.target

    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      category: 'all',
      date: '',
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      setError('Please complete all the fields.')
      return
    }

    setSaving(true)

    if (editingId !== null) {
      // UPDATE: Save changes to an existing transaction.
      const { data, error: updateError } = await supabase
        .from('transactions')
        .update({
          title: formData.title,
          amount: Number(formData.amount),
          type: formData.type,
          category: formData.category,
          transaction_date: formData.date,
        })
        .eq('id', editingId)
        .eq('user_id', user.id)
        .select()
        .single()

      if (updateError) {
        setError(updateError.message)
        setSaving(false)
        return
      }

      const updatedTransaction = {
        ...data,
        amount: Number(data.amount),
        date: data.transaction_date,
      }

      // Replace the edited transaction in React state.
      setTransactions((currentTransactions) =>
        currentTransactions.map((transaction) =>
          transaction.id === editingId
            ? updatedTransaction
            : transaction,
        ),
      )

      setEditingId(null)
    } else {
      // CREATE: Add a new transaction to Supabase.
      const { data, error: insertError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          title: formData.title,
          amount: Number(formData.amount),
          type: formData.type,
          category: formData.category,
          transaction_date: formData.date,
        })
        .select()
        .single()

      if (insertError) {
        setError(insertError.message)
        setSaving(false)
        return
      }

      const newTransaction = {
        ...data,
        amount: Number(data.amount),
        date: data.transaction_date,
      }

      // Add the new transaction to the beginning of the list.
      setTransactions((currentTransactions) => [
        newTransaction,
        ...currentTransactions,
      ])
    }

    setFormData(createEmptyForm())
    setSaving(false)
  }

  const handleEdit = (transaction) => {
    setEditingId(transaction.id)

    // Fill the form with the selected transaction.
    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date,
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData(createEmptyForm())
  }

  const handleDelete = async (transactionId) => {
    setError('')

    // DELETE: Remove the transaction from Supabase.
    const { error: deleteError } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId)
      .eq('user_id', user.id)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    // Remove the deleted transaction from React state.
    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== transactionId,
      ),
    )

    if (editingId === transactionId) {
      handleCancelEdit()
    }
  }

  
  const handleCurrencySave = async (currencyCode) => {
  setSavingCurrency(true)
  setCurrencyMessage('')
  setError('')

  const { error: currencyError } = await supabase
    .from('profiles')
    .update({
      preferred_currency: currencyCode,
    })
    .eq('id', user.id)

  if (currencyError) {
    setError(currencyError.message)
    setSavingCurrency(false)
    return
  }

  setPreferredCurrency(currencyCode)
  setCurrencyMessage('Your dashboard currency has been updated.')
  setSavingCurrency(false)
}
  
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  // Calculate income, expenses and balance.
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const balance = totalIncome - totalExpenses
  const firstName = fullName.split(' ')[0] || 'User'

  // Create a category list without duplicate values.
  const categories = [
    ...new Set(
      transactions.map((transaction) => transaction.category),
    ),
  ].sort()

  // Keep only transactions that match all selected filters.
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType =
      filters.type === 'all' ||
      transaction.type === filters.type

    const matchesCategory =
      filters.category === 'all' ||
      transaction.category === filters.category

    const matchesDate =
      filters.date === '' ||
      transaction.date === filters.date

    return matchesType && matchesCategory && matchesDate
  })

  if (loading) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <p className="font-medium text-slate-600">
        Loading your dashboard...
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

    <div id="overview" className="scroll-mt-24">
      <SummaryCards
        balance={balance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        preferredCurrency={preferredCurrency}
      />

      {currencyMessage && (
        <p className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {currencyMessage}
        </p>
      )}

      <CurrencySettings
        preferredCurrency={preferredCurrency}
        onSave={handleCurrencySave}
        saving={savingCurrency}
      />
    </div>

    <div id="analytics" className='scroll-mt-24'>
      <FinanceChart 
      transactions={transactions}
      preferredCurrency={preferredCurrency} />



      <CurrencyConverter 
      balance={balance}
      preferredCurrency={preferredCurrency} />
    </div>

    <div id="transactions">
      <TransactionForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancelEdit={handleCancelEdit}
        saving={saving}
        preferredCurrency={preferredCurrency}
      />

      <TransactionFilters
        filters={filters}
        categories={categories}
        onChange={handleFilterChange}
        onClear={handleClearFilters}
      />

      <TransactionList
        transactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        preferredCurrency={preferredCurrency}
      />
    </div>
  </DashboardLayout>
)
}

export default Dashboard