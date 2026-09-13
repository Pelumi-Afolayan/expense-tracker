import { useEffect, useState } from 'react'

const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'EUR', name: 'Euro' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'GHS', name: 'Ghanaian Cedi' },
]

function CurrencyConverter({ balance }) {
  const [rates, setRates] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true)
        setError('')

        // Request current conversion rates with NGN as the base currency.
        const response = await fetch(
          'https://open.er-api.com/v6/latest/NGN',
        )

        if (!response.ok) {
          throw new Error('Unable to retrieve exchange rates.')
        }

        const data = await response.json()

        if (data.result !== 'success') {
          throw new Error('The exchange-rate request failed.')
        }

        setRates(data.rates)
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setLoading(false)
      }
    }

    fetchExchangeRates()
  }, [])

  // Convert the current balance using the selected rate.
  const convertedBalance = rates
    ? balance * rates[selectedCurrency]
    : 0

  const formatConvertedAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Currency Converter
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View your current balance in another currency.
        </p>
      </div>

      {loading && (
        <p className="rounded-xl bg-slate-50 p-5 text-slate-500">
          Loading exchange rates...
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-5 text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && rates && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Balance in Nigerian Naira
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              ₦{balance.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl bg-emerald-50 p-5">
            <label
              htmlFor="currency"
              className="block text-sm text-emerald-700"
            >
              Convert balance to
            </label>

            <select
              id="currency"
              value={selectedCurrency}
              onChange={(event) =>
                setSelectedCurrency(event.target.value)
              }
              className="mt-2 w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 outline-none focus:border-emerald-500"
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

            <p className="mt-4 text-2xl font-bold text-emerald-700">
              {formatConvertedAmount(convertedBalance)}
            </p>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-400">
        Rates provided by{' '}
        <a
          href="https://www.exchangerate-api.com"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          ExchangeRate-API
        </a>
      </p>
    </section>
  )
}

export default CurrencyConverter