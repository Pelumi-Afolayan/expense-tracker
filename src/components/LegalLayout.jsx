import { ArrowLeft, WalletCards } from 'lucide-react'
import { Link } from 'react-router-dom'

function LegalLayout({
  title,
  description,
  lastUpdated,
  children,
}) {
  return (
    <main className="min-h-screen bg-slate-100">
      {/* Top navigation */}
      <header className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
              <WalletCards size={22} />
            </div>

            <div>
              <p className="font-bold">
                Expensidify
              </p>

              <p className="text-xs text-slate-400">
                Personal finance made simple
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to app
          </Link>
        </div>
      </header>

      {/* Legal document */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <article className="rounded-2xl bg-white p-6 shadow-sm sm:p-10">
          <header className="border-b border-slate-200 pb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Expensidify
            </p>

            <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              {title}
            </h1>

            <p className="mt-4 leading-7 text-slate-600">
              {description}
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Last updated: {lastUpdated}
            </p>
          </header>

          <div className="mt-8 space-y-8 text-slate-600">
            {children}
          </div>
        </article>
      </div>
    </main>
  )
}

export default LegalLayout