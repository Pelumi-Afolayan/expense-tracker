function TransactionFilters({
  filters,
  categories,
  onChange,
  onClear,
}) {
  return (
    <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Filter Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Narrow down the transactions displayed below.
          </p>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="self-start rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="filterType"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Transaction type
          </label>

          <select
            id="filterType"
            name="type"
            value={filters.type}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filterCategory"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Category
          </label>

          <select
            id="filterCategory"
            name="category"
            value={filters.category}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
          >
            <option value="all">All categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filterDate"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Transaction date
          </label>

          <input
            id="filterDate"
            name="date"
            type="date"
            value={filters.date}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
          />
        </div>
      </div>
    </section>
  )
}

export default TransactionFilters