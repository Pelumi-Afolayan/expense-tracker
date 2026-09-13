import { Pencil, ReceiptText, Trash2 } from 'lucide-react'

function TransactionList({ transactions, onEdit, onDelete }) {
  const handleDelete = (transaction) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${transaction.title}"?`,
    )

    if (confirmed) {
      onDelete(transaction.id)
    }
  }

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Transactions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View and manage your income and expenses.
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-6 py-12 text-center">
          <div className="mb-4 rounded-full bg-emerald-50 p-4 text-emerald-600">
            <ReceiptText size={28} />
          </div>

          <h3 className="font-semibold text-slate-900">
            No transactions found
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Add your first transaction or clear your filters to see
            your transactions here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <article
              key={transaction.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-semibold text-slate-900">
                  {transaction.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {transaction.category} • {transaction.date}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <p
                  className={
                    transaction.type === 'income'
                      ? 'mr-2 font-bold text-emerald-600'
                      : 'mr-2 font-bold text-red-500'
                  }
                >
                  {transaction.type === 'income' ? '+' : '-'}₦
                  {Number(transaction.amount).toLocaleString()}
                </p>

                <button
                  type="button"
                  onClick={() => onEdit(transaction)}
                  aria-label={`Edit ${transaction.title}`}
                  className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                >
                  <Pencil size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(transaction)}
                  aria-label={`Delete ${transaction.title}`}
                  className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default TransactionList