import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function FinanceChart({ transactions }) {
  const currentDate = new Date()

  // Create chart entries for the last six months.
  const monthlyData = Array.from({ length: 6 }, (_, index) => {
    const monthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - (5 - index),
      1,
    )

    const year = monthDate.getFullYear()
    const monthNumber = String(
      monthDate.getMonth() + 1,
    ).padStart(2, '0')

    return {
      key: `${year}-${monthNumber}`,
      month: monthDate.toLocaleString('en-US', {
        month: 'short',
      }),
      Income: 0,
      Expenses: 0,
    }
  })

  // Add each transaction to the correct month.
  transactions.forEach((transaction) => {
    const transactionMonth = transaction.date.slice(0, 7)

    const matchingMonth = monthlyData.find(
      (month) => month.key === transactionMonth,
    )

    if (!matchingMonth) {
      return
    }

    if (transaction.type === 'income') {
      matchingMonth.Income += transaction.amount
    }

    if (transaction.type === 'expense') {
      matchingMonth.Expenses += transaction.amount
    }
  })

  const hasTransactions = monthlyData.some(
    (month) => month.Income > 0 || month.Expenses > 0,
  )

  const formatCurrency = (amount) => {
    return `₦${Number(amount).toLocaleString()}`
  }

  return (
    <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Monthly Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare your income and expenses over the last six months.
        </p>
      </div>

      {!hasTransactions ? (
        <div className="flex h-72 items-center justify-center rounded-xl bg-slate-50">
          <p className="text-center text-slate-500">
            Add transactions to display your monthly chart.
          </p>
        </div>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                width={85}
                tickFormatter={formatCurrency}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(value),
                  name,
                ]}
              />

              <Legend />

              <Bar
                dataKey="Income"
                fill="#059669"
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="Expenses"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}

export default FinanceChart