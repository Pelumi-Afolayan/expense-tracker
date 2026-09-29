import { useEffect, useState } from 'react'
import {
  ArrowLeftRight,
  BarChart3,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'
import {
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { supabase } from '../lib/supabase'

// Dashboard navigation shared by every user.
const standardNavigationItems = [
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
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
  },
]

// This item is only added for administrators.
const adminNavigationItem = {
  id: 'admin',
  label: 'Admin',
  icon: ShieldCheck,
  path: '/admin',
}

function DashboardLayout({
  firstName,
  onLogout,
  children,
}) {
  const navigate = useNavigate()
  const location = useLocation()

  // Store whether the current user is an administrator.
  const [isAdmin, setIsAdmin] = useState(false)

  // Store the currently active navigation item.
  const [activeSection, setActiveSection] = useState(
    location.pathname === '/settings'
      ? 'settings'
      : location.pathname === '/admin'
        ? 'admin'
        : 'overview',
  )

  // Add Admin to the navigation only for administrators.
  const navigationItems = isAdmin
    ? [...standardNavigationItems, adminNavigationItem]
    : standardNavigationItems

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data, error } = await supabase.rpc(
        'is_current_user_admin',
      )

      if (error) {
        console.error(
          'Unable to check administrator status:',
          error,
        )

        setIsAdmin(false)
        return
      }

      setIsAdmin(Boolean(data))
    }

    checkAdminStatus()
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)

    if (!section) {
      return
    }

    setActiveSection(sectionId)

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleNavigation = (item) => {
    // Settings and Admin open as separate pages.
    if (item.path) {
      navigate(item.path)
      return
    }

    // Return to the Dashboard before scrolling when
    // the user is currently on another page.
    if (location.pathname !== '/') {
      navigate(`/#${item.id}`)
      return
    }

    scrollToSection(item.id)
  }

  useEffect(() => {
    if (location.pathname === '/settings') {
      setActiveSection('settings')
      return
    }

    if (location.pathname === '/admin') {
      setActiveSection('admin')
      return
    }

    // Scroll after returning from another page.
    const sectionFromUrl = location.hash.replace('#', '')

    if (sectionFromUrl) {
      const timer = setTimeout(() => {
        scrollToSection(sectionFromUrl)
      }, 100)

      return () => {
        clearTimeout(timer)
      }
    }

    setActiveSection('overview')
  }, [location.pathname, location.hash])

  useEffect(() => {
    // Section observation is only needed on the Dashboard.
    if (location.pathname !== '/') {
      return undefined
    }

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

    standardNavigationItems
      .filter((item) => !item.path)
      .forEach((item) => {
        const section = document.getElementById(item.id)

        if (section) {
          observer.observe(section)
        }
      })

    return () => {
      observer.disconnect()
    }
  }, [location.pathname])

  const isItemActive = (item) => {
    if (item.path) {
      return location.pathname === item.path
    }

    return (
      location.pathname === '/' &&
      activeSection === item.id
    )
  }

  const isSettingsPage =
    location.pathname === '/settings'

  const isAdminPage = location.pathname === '/admin'

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col bg-slate-950 px-5 py-8 text-white lg:sticky lg:top-0 lg:flex">
        <div className="flex items-center gap-3 px-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
            <WalletCards size={24} />
          </div>

          <div>
            <p className="font-bold">
              Expense Tracker
            </p>

            <p className="text-xs text-slate-400">
              Personal finance
            </p>
          </div>
        </div>

        <nav className="mt-12 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = isItemActive(item)

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigation(item)}
                aria-current={
                  isActive ? 'page' : undefined
                }
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

            <p className="font-bold">
              Expense Tracker
            </p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            aria-label="Log out"
            className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <LogOut size={21} />
          </button>
        </div>

        {/* Page content */}
        <main className="px-4 pb-28 pt-8 sm:px-6 lg:px-10 lg:pb-10">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                {isAdminPage
                  ? 'Administration'
                  : isSettingsPage
                    ? 'Account'
                    : 'Financial overview'}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
                {isAdminPage
                  ? 'Admin Dashboard'
                  : isSettingsPage
                    ? 'Manage your account'
                    : `Welcome, ${firstName}`}
              </h1>

              <p className="mt-2 text-slate-500">
                {isAdminPage
                  ? 'Manage registered users and review account feedback.'
                  : isSettingsPage
                    ? 'Update your profile and dashboard preferences.'
                    : "Here's what's happening with your money."}
              </p>
            </header>

            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav
        className={
          isAdmin
            ? 'fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-slate-200 bg-white px-2 py-2 shadow-lg lg:hidden'
            : 'fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 border-t border-slate-200 bg-white px-2 py-2 shadow-lg lg:hidden'
        }
      >
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = isItemActive(item)

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigation(item)}
              aria-current={
                isActive ? 'page' : undefined
              }
              className={
                isActive
                  ? 'flex flex-col items-center gap-1 rounded-xl bg-emerald-50 px-1 py-2 text-[11px] font-semibold text-emerald-700'
                  : 'flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium text-slate-500'
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