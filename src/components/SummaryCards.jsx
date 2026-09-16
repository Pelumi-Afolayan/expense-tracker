import {
  ArrowDownRight,
  ArrowUpRight,
  WalletCards,
} from 'lucide-react'
import { formatCurrency } from '../utils/currency'

function SummaryCards({
  balance,
  totalIncome,
  totalExpenses,
  preferredCurrency,
}) {
  return (
    <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Current Balance
            </p>

            <p className="mt-3 text-2xl font-bold text-slate-900">
              {formatCurrency(
                balance,
                preferredCurrency,
              )}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-3 text-white">
            <WalletCards size={20} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Total Income
            </p>

            <p className="mt-3 text-2xl font-bold text-emerald-600">
              {formatCurrency(
                totalIncome,
                preferredCurrency,
              )}
            </p>
          </div>

          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Total Expenses
            </p>

            <p className="mt-3 text-2xl font-bold text-red-500">
              {formatCurrency(
                totalExpenses,
                preferredCurrency,
              )}
            </p>
          </div>

          <div className="rounded-xl bg-red-100 p-3 text-red-600">
            <ArrowDownRight size={20} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SummaryCards