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

import {
  formatCompactCurrency,
  formatCurrency,
} from '../utils/currency'

function FinanceChart({
  transactions,
  preferredCurrency,
}) {
  // Get the current date so we can calculate
  // the most recent six months.
  const currentDate = new Date()

  // Create one object for each of the last six months.
  // Each object begins with zero income and zero expenses.
  const monthlyData = Array.from(
    { length: 6 },
    (_, index) => {
      const monthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - (5 - index),
        1,
      )

      const year = monthDate.getFullYear()

      // Convert a month such as 9 into "09".
      const monthNumber = String(
        monthDate.getMonth() + 1,
      ).padStart(2, '0')

      return {
        // The key is used to match transaction dates.
        // Example: "2026-09".
        key: `${year}-${monthNumber}`,

        // The short month name is displayed on the chart.
        // Example: "Sep".
        month: monthDate.toLocaleString('en-US', {
          month: 'short',
        }),

        Income: 0,
        Expenses: 0,
      }
    },
  )

  // Go through every transaction and add its amount
  // to the correct month.
  transactions.forEach((transaction) => {
    // A transaction date looks like "2026-09-15".
    // slice(0, 7) gives us "2026-09".
    const transactionMonth =
      transaction.date?.slice(0, 7)

    // Find the month object that matches the transaction.
    const matchingMonth = monthlyData.find(
      (month) => month.key === transactionMonth,
    )

    // Ignore transactions outside the last six months.
    if (!matchingMonth) {
      return
    }

    // Add income to the month's income total.
    if (transaction.type === 'income') {
      matchingMonth.Income += Number(
        transaction.amount,
      )
    }

    // Add expenses to the month's expense total.
    if (transaction.type === 'expense') {
      matchingMonth.Expenses += Number(
        transaction.amount,
      )
    }
  })

  // Check whether there is any data to display.
  const hasTransactions = monthlyData.some(
    (month) =>
      month.Income > 0 || month.Expenses > 0,
  )

  return (
    <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Monthly Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare your income and expenses over the last
          six months.
        </p>
      </div>

      {/* Show an empty state when there is no chart data. */}
      {!hasTransactions ? (
        <div className="flex h-72 items-center justify-center rounded-xl bg-slate-50">
          <p className="text-center text-slate-500">
            Add transactions to display your monthly chart.
          </p>
        </div>
      ) : (
        // Give the responsive chart a fixed-height container.
        <div className="h-80 w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={monthlyData}
              margin={{
                top: 10,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              {/* Horizontal background guide lines. */}
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              {/* Display the six month names. */}
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />

              {/* Display shortened currency values. */}
              <YAxis
                width={65}
                tickFormatter={(value) =>
                  formatCompactCurrency(
                    value,
                    preferredCurrency,
                  )
                }
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />

              {/* Display the complete value when hovering. */}
              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(
                    value,
                    preferredCurrency,
                  ),
                  name,
                ]}
                cursor={{
                  fill: '#f1f5f9',
                }}
              />

              {/* Explain the meaning of each bar colour. */}
              <Legend />

              {/* Green bars represent income. */}
              <Bar
                dataKey="Income"
                fill="#059669"
                radius={[8, 8, 0, 0]}
              />

              {/* Red bars represent expenses. */}
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