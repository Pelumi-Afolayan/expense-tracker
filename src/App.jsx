import { useEffect, useState } from 'react'
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import ConnectionStatus from './components/ConnectionStatus'
import { supabase } from './lib/supabase'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/Login'
import Register from './pages/Register'
import UpdatePassword from './pages/UpdatePassword'
import SettingsPage from './pages/SettingsPage'

function App() {
  // Store the currently authenticated Supabase user.
  const [user, setUser] = useState(null)

  // Wait for Supabase to check the saved session.
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCurrentSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setUser(session?.user ?? null)
      setLoading(false)
    }

    getCurrentSession()

    // Listen for login, logout and password-recovery events.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      },
    )

    // Stop listening when App is removed.
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="font-medium text-slate-600">
          Loading...
        </p>
      </main>
    )
  }

  return (
    <>
      {/* Display internet connection changes on every page. */}
      <ConnectionStatus />

      <Routes>
        {/* Only authenticated users can open the dashboard. */}
        <Route
          path="/"
          element={
            user ? (
              <Dashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Logged-in users do not need authentication pages. */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <ForgotPassword />
            )
          }
        />

        {/* Recovery links open this page with a temporary session. */}
        <Route
          path="/update-password"
          element={<UpdatePassword />}
        />

        {/* Send unknown addresses to the appropriate page. */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="/settings"
          element={
            user ? (
              <SettingsPage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>
    </>
  )
}

export default App