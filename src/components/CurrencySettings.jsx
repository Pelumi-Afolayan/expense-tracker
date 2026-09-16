import { useEffect, useState } from 'react'
import { Coins } from 'lucide-react'
import { currencies } from '../data/currencies'

function CurrencySettings({
  preferredCurrency,
  onSave,
  saving,
}) {
  const [selectedCurrency, setSelectedCurrency] =
    useState(preferredCurrency)

  // Keep the dropdown synchronized with the value from Supabase.
  useEffect(() => {
    setSelectedCurrency(preferredCurrency)
  }, [preferredCurrency])

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(selectedCurrency)
  }

  return (
    <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
          <Coins size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Dashboard Currency
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose the currency used for your income,
            expenses and balance.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <select
          value={selectedCurrency}
          onChange={(event) =>
            setSelectedCurrency(event.target.value)
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        >
          {currencies.map((currency) => (
            <option
              key={currency.code}
              value={currency.code}
            >
              {currency.code} — {currency.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={
            saving ||
            selectedCurrency === preferredCurrency
          }
          className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Currency'}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-500">
        Your transaction amounts will be displayed using
        your selected currency.
      </p>
    </section>
  )
}

export default CurrencySettings