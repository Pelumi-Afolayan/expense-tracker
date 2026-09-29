import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MessageSquareText,
  Search,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { supabase } from '../lib/supabase'

// Make the stored deletion reasons easier to read.
const reasonLabels = {
  not_using: 'No longer using the app',
  missing_features: 'Missing features',
  difficult_to_use: 'Difficult to use',
  privacy_concerns: 'Privacy concerns',
  switching_app: 'Switching to another app',
  other: 'Other reason',
}

function AdminPage({ user }) {
  const navigate = useNavigate()

  // Store information returned by the admin Edge Function.
  const [users, setUsers] = useState([])
  const [feedback, setFeedback] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)

  // Control search, loading and error states.
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')

  const getFunctionErrorMessage = async (
    functionError,
    fallbackMessage,
  ) => {
    try {
      const responseBody =
        await functionError.context.json()

      return responseBody?.error || fallbackMessage
    } catch {
      return fallbackMessage
    }
  }

  const loadAdminDashboard = async () => {
    setLoading(true)
    setError('')

    // Request user information from the secure Edge Function.
    const { data, error: functionError } =
      await supabase.functions.invoke('admin-users', {
        body: {
          action: 'get_dashboard',
        },
      })

    if (functionError) {
      const message = await getFunctionErrorMessage(
        functionError,
        'Unable to load the admin dashboard.',
      )

      setError(message)
      setLoading(false)
      return
    }

    if (!data?.success) {
      setError(
        data?.error ||
          'Unable to load the admin dashboard.',
      )
      setLoading(false)
      return
    }

    setUsers(data.users || [])
    setFeedback(data.feedback || [])
    setTotalUsers(data.totalUsers || 0)
    setLoading(false)
  }

  useEffect(() => {
    loadAdminDashboard()
  }, [])

  const handleDeleteUser = async (selectedUser) => {
    const confirmed = window.confirm(
      `Permanently delete ${selectedUser.email}? Their profile and transactions will also be removed. This cannot be undone.`,
    )

    if (!confirmed) {
      return
    }

    setDeletingId(selectedUser.id)
    setError('')

    const { data, error: functionError } =
      await supabase.functions.invoke('admin-users', {
        body: {
          action: 'delete_user',
          userId: selectedUser.id,
        },
      })

    if (functionError) {
      const message = await getFunctionErrorMessage(
        functionError,
        'Unable to delete the selected user.',
      )

      setError(message)
      setDeletingId(null)
      return
    }

    if (!data?.success) {
      setError(
        data?.error ||
          'Unable to delete the selected user.',
      )
      setDeletingId(null)
      return
    }

    // Remove the deleted user from the displayed list.
    setUsers((currentUsers) =>
      currentUsers.filter(
        (currentUser) =>
          currentUser.id !== selectedUser.id,
      ),
    )

    setTotalUsers((currentTotal) =>
      Math.max(currentTotal - 1, 0),
    )

    setDeletingId(null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  // Filter users using their name or email address.
  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase()

    if (!normalizedSearch) {
      return users
    }

    return users.filter((registeredUser) => {
      const name =
        registeredUser.fullName?.toLowerCase() || ''

      const email =
        registeredUser.email?.toLowerCase() || ''

      return (
        name.includes(normalizedSearch) ||
        email.includes(normalizedSearch)
      )
    })
  }, [users, searchTerm])

  const formatDate = (date) => {
    if (!date) {
      return 'Never'
    }

    return new Date(date).toLocaleString('en-NG', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  const firstName =
    user.user_metadata?.full_name?.split(' ')[0] ||
    user.email?.split('@')[0] ||
    'Admin'

  return (
    <DashboardLayout
      firstName={firstName}
      onLogout={handleLogout}
    >
      {error && (
        <p className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading ? (
        <section className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="font-medium text-slate-500">
            Loading admin dashboard...
          </p>
        </section>
      ) : (
        <>
          {/* Admin summary cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Registered Users
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-950">
                    {totalUsers}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Users size={24} />
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Deletion Feedback
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-950">
                    {feedback.length}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <MessageSquareText size={24} />
                </div>
              </div>
            </section>
          </div>

          {/* Registered users */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Registered Users
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage accounts registered on
                  Expensidify.
                </p>
              </div>

              <button
                type="button"
                onClick={loadAdminDashboard}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Refresh
              </button>
            </div>

            <div className="relative mt-6">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search by name or email"
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            {filteredUsers.length === 0 ? (
              <div className="mt-6 rounded-xl bg-slate-50 p-8 text-center">
                <p className="text-slate-500">
                  No users match your search.
                </p>
              </div>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-sm text-slate-500">
                      <th className="px-4 py-3 font-medium">
                        User
                      </th>

                      <th className="px-4 py-3 font-medium">
                        Sign-in method
                      </th>

                      <th className="px-4 py-3 font-medium">
                        Joined
                      </th>

                      <th className="px-4 py-3 font-medium">
                        Last sign-in
                      </th>

                      <th className="px-4 py-3 text-right font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map(
                      (registeredUser) => (
                        <tr
                          key={registeredUser.id}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600">
                                {registeredUser.fullName
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-slate-900">
                                    {
                                      registeredUser.fullName
                                    }
                                  </p>

                                  {registeredUser.isAdmin && (
                                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                                      Admin
                                    </span>
                                  )}
                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                  {registeredUser.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm capitalize text-slate-600">
                            {registeredUser.provider}
                          </td>

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {formatDate(
                              registeredUser.createdAt,
                            )}
                          </td>

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {formatDate(
                              registeredUser.lastSignInAt,
                            )}
                          </td>

                          <td className="px-4 py-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteUser(
                                  registeredUser,
                                )
                              }
                              disabled={
                                registeredUser.isAdmin ||
                                deletingId ===
                                  registeredUser.id
                              }
                              className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Trash2 size={17} />

                              {deletingId ===
                              registeredUser.id
                                ? 'Deleting...'
                                : 'Delete'}
                            </button>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Anonymous deletion feedback */}
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <MessageSquareText size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Account Deletion Feedback
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Anonymous reasons submitted when users delete
                  their accounts.
                </p>
              </div>
            </div>

            {feedback.length === 0 ? (
              <div className="mt-6 rounded-xl bg-slate-50 p-8 text-center">
                <p className="text-slate-500">
                  No deletion feedback has been submitted.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {feedback.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-semibold text-slate-900">
                        {reasonLabels[item.reason] ||
                          item.reason}
                      </p>

                      <p className="text-xs text-slate-400">
                        {formatDate(item.created_at)}
                      </p>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.details ||
                        'No additional details were provided.'}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </DashboardLayout>
  )
}

export default AdminPage