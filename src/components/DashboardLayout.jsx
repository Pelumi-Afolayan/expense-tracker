import { useEffect, useState } from 'react'
import {
  ArrowLeftRight,
  BarChart3,
  LayoutDashboard,
  LogOut,
  WalletCards,
} from 'lucide-react'

const navigationItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: ArrowLeftRight,
  },
]

function DashboardLayout({
  firstName,
  onLogout,
  children,
}) {
  const [activeSection, setActiveSection] =
    useState('overview')

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)

    if (section) {
      setActiveSection(sectionId)

      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  useEffect(() => {
    // Watch the sections and update the active navigation item.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -65% 0px',
      },
    )

    navigationItems.forEach((item) => {
      const section = document.getElementById(item.id)

      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col bg-slate-950 px-5 py-8 text-white lg:sticky lg:top-0 lg:flex">
        <div className="flex items-center gap-3 px-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
            <WalletCards size={24} />
          </div>

          <div>
            <p className="font-bold">Expense Tracker</p>
            <p className="text-xs text-slate-400">
              Personal finance
            </p>
          </div>
        </div>

        <nav className="mt-12 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={
                  isActive
                    ? 'flex w-full items-center gap-3 rounded-xl bg-emerald-500 px-4 py-3 text-left font-medium text-slate-950'
                    : 'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800 hover:text-white'
                }
              >
                <Icon size={20} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={onLogout}
          className="mt-auto flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Mobile header */}
        <div className="sticky top-0 z-50 flex items-center justify-between bg-slate-950 px-4 py-4 text-white lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
              <WalletCards size={22} />
            </div>

            <p className="font-bold">Expense Tracker</p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            aria-label="Log out"
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <LogOut size={21} />
          </button>
        </div>

        {/* Dashboard content */}
        <main className="px-4 pb-28 pt-8 sm:px-6 lg:px-10 lg:pb-10">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Financial overview
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
                Welcome, {firstName}
              </h1>

              <p className="mt-2 text-slate-500">
                Here&apos;s what&apos;s happening with your money.
              </p>
            </header>

            {children}
          </div>
        </main>
      </div>
            {/* Mobile bottom navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 border-t border-slate-200 bg-white px-2 py-2 shadow-lg lg:hidden">
        {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
            <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={
                isActive
                    ? 'flex flex-col items-center gap-1 rounded-xl bg-emerald-50 px-2 py-2 text-xs font-semibold text-emerald-700'
                    : 'flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-medium text-slate-500'
                }
            >
                <Icon size={20} />
                {item.label}
            </button>
            )
        })}
        </nav>
    </div>
  )
}

export default DashboardLayout