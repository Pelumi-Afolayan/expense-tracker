import { Download } from 'lucide-react'

function ExportTransactions({
  transactions,
  preferredCurrency,
}) {
  // Prepare text safely for a CSV file.
  const escapeCsvValue = (value) => {
    const text = String(value ?? '')

    // Double quotation marks inside the value.
    const escapedText = text.replaceAll('"', '""')

    return `"${escapedText}"`
  }

  const handleExport = () => {
    if (transactions.length === 0) {
      return
    }

    // These become the column headings in Excel.
    const headings = [
      'Date',
      'Title',
      'Type',
      'Category',
      'Amount',
      'Currency',
    ]

    // Convert each transaction into one CSV row.
    const rows = transactions.map((transaction) => [
      transaction.date,
      transaction.title,
      transaction.type,
      transaction.category,
      transaction.amount,
      preferredCurrency,
    ])

    // Combine the headings and transaction rows.
    const csvContent = [headings, ...rows]
      .map((row) =>
        row.map(escapeCsvValue).join(','),
      )
      .join('\n')

    // The BOM helps Microsoft Excel read the file correctly.
    const fileContent = `\uFEFF${csvContent}`

    // Create a temporary downloadable file in the browser.
    const file = new Blob([fileContent], {
      type: 'text/csv;charset=utf-8;',
    })

    const fileUrl = URL.createObjectURL(file)
    const downloadLink = document.createElement('a')

    // Add today's date to the filename.
    const today = new Date()
      .toISOString()
      .split('T')[0]

    downloadLink.href = fileUrl
    downloadLink.download =
      `expensidify-transactions-${today}.csv`

    // Trigger the download.
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    // Release the temporary browser URL.
    URL.revokeObjectURL(fileUrl)
  }

  return (
    <div className="mb-6 flex justify-end">
      <button
        type="button"
        onClick={handleExport}
        disabled={transactions.length === 0}
        className="flex items-center justify-center gap-2 rounded-xl border border-emerald-600 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400 disabled:hover:bg-transparent"
      >
        <Download size={18} />

        Export CSV
      </button>
    </div>
  )
}

export default ExportTransactions