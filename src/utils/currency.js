import { currencies } from '../data/currencies'

const getCurrencyLocale = (currencyCode) => {
  const selectedCurrency = currencies.find(
    (currency) => currency.code === currencyCode,
  )

  return selectedCurrency?.locale || 'en-US'
}

export const formatCurrency = (
  amount,
  currencyCode = 'NGN',
) => {
  return new Intl.NumberFormat(
    getCurrencyLocale(currencyCode),
    {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits:
        currencyCode === 'JPY' ? 0 : 2,
    },
  ).format(Number(amount) || 0)
}

export const formatCompactCurrency = (
  amount,
  currencyCode = 'NGN',
) => {
  return new Intl.NumberFormat(
    getCurrencyLocale(currencyCode),
    {
      style: 'currency',
      currency: currencyCode,
      notation: 'compact',
      maximumFractionDigits: 1,
    },
  ).format(Number(amount) || 0)
}