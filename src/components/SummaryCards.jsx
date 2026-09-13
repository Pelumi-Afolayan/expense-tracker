import {
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
} from 'lucide-react'

function SummaryCards({
  balance,
  totalIncome,
  totalExpenses,
}) {
  const formatCurrency = (amount) => {
    return `₦${Number(amount).toLocaleString()}`
  }

  const cards = [
    {
      title: 'Current Balance',
      amount: balance,
      icon: Wallet,
      iconStyle: 'bg-slate-900 text-white',
      amountStyle:
        balance >= 0 ? 'text-slate-950' : 'text-red-600',
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: ArrowUpRight,
      iconStyle: 'bg-emerald-100 text-emerald-700',
      amountStyle: 'text-emerald-600',
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: ArrowDownRight,
      iconStyle: 'bg-red-100 text-red-600',
      amountStyle: 'text-red-500',
    },
  ]

  return (
    <section className="mb-8 grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <article
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p
                  className={`mt-3 text-2xl font-bold sm:text-3xl ${card.amountStyle}`}
                >
                  {formatCurrency(card.amount)}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconStyle}`}
              >
                <Icon size={22} />
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default SummaryCards