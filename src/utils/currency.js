import { currencies } from '../data/currencies'

export const formatCurrency = (
  amount,
  currencyCode = 'NGN',
) => {
  const selectedCurrency = currencies.find(
    (currency) => currency.code === currencyCode,
  )

  const locale = selectedCurrency?.locale || 'en-US'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits:
      currencyCode === 'JPY' ? 0 : 2,
  }).format(Number(amount) || 0)
}