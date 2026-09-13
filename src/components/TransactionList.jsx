function TransactionList({
  transactions,
  onEdit,
  onDelete,
}) {
  const formatDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString(
      'en-NG',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      },
    )
  }

  const handleDeleteClick = (transaction) => {
    const confirmed = window.confirm(
      `Delete "${transaction.title}"? This action cannot be undone.`,
    )

    if (confirmed) {
      onDelete(transaction.id)
    }
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your recorded income and expenses.
          </p>
        </div>

        <p className="self-start rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {transactions.length}{' '}
          {transactions.length === 1
            ? 'transaction'
            : 'transactions'}
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="rounded-xl bg-slate-50 p-8 text-center">
          <p className="font-medium text-slate-700">
            No transactions found
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Add a transaction or change your filters.
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
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-900">
                    {transaction.title}
                  </h3>

                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {transaction.category}
                  </span>

                  <span
                    className={
                      transaction.type === 'income'
                        ? 'rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700'
                        : 'rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-600'
                    }
                  >
                    {transaction.type === 'income'
                      ? 'Income'
                      : 'Expense'}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {formatDate(transaction.date)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <p
                  className={
                    transaction.type === 'income'
                      ? 'font-bold text-emerald-600'
                      : 'font-bold text-red-500'
                  }
                >
                  {transaction.type === 'income' ? '+' : '-'}₦
                  {transaction.amount.toLocaleString()}
                </p>

                <button
                  type="button"
                  onClick={() => onEdit(transaction)}
                  className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteClick(transaction)}
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                >
                  Delete
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