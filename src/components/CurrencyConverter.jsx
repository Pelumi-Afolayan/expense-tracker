import { useEffect, useState } from 'react'
import { currencies } from '../data/currencies'
import { formatCurrency } from '../utils/currency'

function CurrencyConverter({
  balance,
  preferredCurrency,
}) {
  const [targetCurrency, setTargetCurrency] =
    useState(
      preferredCurrency === 'NGN' ? 'USD' : 'NGN',
    )

  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadExchangeRates = async () => {
      setLoading(true)
      setError('')

      // Naira users start by converting to USD.
      // Other users start by converting back to Naira.
      const defaultTarget =
        preferredCurrency === 'NGN' ? 'USD' : 'NGN'

      setTargetCurrency(defaultTarget)

      try {
        const response = await fetch(
          `https://open.er-api.com/v6/latest/${preferredCurrency}`,
        )

        if (!response.ok) {
          throw new Error(
            'Unable to load exchange rates.',
          )
        }

        const data = await response.json()

        if (data.result !== 'success') {
          throw new Error(
            'The exchange-rate service returned an error.',
          )
        }

        setRates(data.rates)
      } catch (requestError) {
        setError(requestError.message)
        setRates({})
      } finally {
        setLoading(false)
      }
    }

    loadExchangeRates()
  }, [preferredCurrency])

  const selectedRate =
    rates[targetCurrency] || 0

  const convertedBalance =
    Number(balance) * selectedRate

  const sourceCurrencyInformation =
    currencies.find(
      (currency) =>
        currency.code === preferredCurrency,
    )

  return (
    <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Currency Converter
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View your current balance in another currency.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">
            Balance in{' '}
            {sourceCurrencyInformation?.name ||
              preferredCurrency}
          </p>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {formatCurrency(
              balance,
              preferredCurrency,
            )}
          </p>
        </div>

        <div className="rounded-xl bg-emerald-50 p-5">
          <label
            htmlFor="targetCurrency"
            className="mb-2 block text-sm text-emerald-700"
          >
            Convert balance to
          </label>

          <select
            id="targetCurrency"
            value={targetCurrency}
            onChange={(event) =>
              setTargetCurrency(event.target.value)
            }
            className="w-full rounded-lg border border-emerald-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
          >
            {currencies
              .filter(
                (currency) =>
                  currency.code !==
                  preferredCurrency,
              )
              .map((currency) => (
                <option
                  key={currency.code}
                  value={currency.code}
                >
                  {currency.code} — {currency.name}
                </option>
              ))}
          </select>

          {loading && (
            <p className="mt-4 text-sm text-emerald-700">
              Loading exchange rates...
            </p>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

          {!loading && !error && (
            <p className="mt-4 text-2xl font-bold text-emerald-700">
              {formatCurrency(
                convertedBalance,
                targetCurrency,
              )}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Rates provided by{' '}
        <a
          href="https://www.exchangerate-api.com"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-slate-600"
        >
          ExchangeRate-API
        </a>
      </p>
    </section>
  )
}

export default CurrencyConverter