import {
  BarChart3,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'
import InstallAppButton from './InstallAppButton'

function AuthLayout({
  title,
  description,
  children,
}) {
  return (
    <main className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-2">
      {/* Branding panel shown only on larger screens. */}
      <section className="hidden min-h-screen flex-col justify-between bg-slate-950 p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
            <WalletCards size={26} />
          </div>

          <div>
            <p className="text-lg font-bold">
              Expense Tracker
            </p>

            <p className="text-sm text-slate-400">
              Personal finance made simple
            </p>
          </div>
        </div>

        <div className="max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Take control of your money
          </p>

          <h2 className="mt-4 text-5xl font-bold leading-tight">
            Understand where your money goes.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Record your income, track your spending and make
            better financial decisions from one dashboard.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <BarChart3 className="text-emerald-400" />

              <p className="mt-4 font-semibold">
                Visual insights
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Understand your monthly financial activity.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <ShieldCheck className="text-emerald-400" />

              <p className="mt-4 font-semibold">
                Private and secure
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Your transactions belong only to your account.
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          Track better. Plan better. Spend better.
        </p>
      </section>

      {/* Authentication side of the page. */}
      <section className="flex min-h-screen flex-col px-4 pb-8 pt-6 sm:px-6 sm:pt-8 lg:items-center lg:justify-center lg:py-10">
        {/* Logo shown only on mobile and tablet screens. */}
        <div className="mx-auto flex w-full max-w-md items-center gap-3 lg:hidden">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
            <WalletCards size={24} />
          </div>

          <div>
            <p className="font-bold text-slate-900">
              Expense Tracker
            </p>

            <p className="text-xs text-slate-500">
              Personal finance made simple
            </p>
          </div>
        </div>

        {/* Centre the form inside the available space. */}
        <div className="flex w-full flex-1 items-center justify-center py-8 lg:flex-none lg:py-0">
          {/* This wrapper keeps the form and install button together. */}
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h1 className="text-3xl font-bold text-slate-900">
                {title}
              </h1>

              <p className="mt-2 text-slate-500">
                {description}
              </p>

              {children}
            </div>

            {/* Appears only when the browser supports installation. */}
            <InstallAppButton />
          </div>
        </div>
      </section>
    </main>
  )
}

export default AuthLayout