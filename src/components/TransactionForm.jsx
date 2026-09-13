import { transactionCategories } from '../data/categories'

function TransactionForm({
  formData,
  editingId,
  onChange,
  onSubmit,
  onCancelEdit,
  saving,
}) {
  const isEditing = editingId !== null

  // Display categories based on the selected transaction type.
  const availableCategories =
    transactionCategories[formData.type]

  return (
    <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          {isEditing ? 'Edit Transaction' : 'Add Transaction'}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEditing
            ? 'Update the transaction details below.'
            : 'Enter the details of your income or expense.'}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="grid gap-4 md:grid-cols-2"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Transaction title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={onChange}
            placeholder="e.g. Groceries"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
          />
        </div>



        <div>
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Amount
          </label>

          <input
            id="amount"
            name="amount"
            type="number"
            min="1"
            value={formData.amount}
            onChange={onChange}
            placeholder="e.g. 25000"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Transaction type
          </label>

          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Category
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
          >
            <option value="">Select a category</option>

            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Transaction date
          </label>

          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? 'Saving...'
              : isEditing
                ? 'Save Changes'
                : 'Add Transaction'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-lg bg-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default TransactionForm