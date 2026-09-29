import { useState } from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

// Reasons must match the values accepted by the Edge Function.
const deletionReasons = [
  {
    value: 'not_using',
    label: 'I no longer use the app',
  },
  {
    value: 'missing_features',
    label: 'The app is missing features I need',
  },
  {
    value: 'difficult_to_use',
    label: 'The app is difficult to use',
  },
  {
    value: 'privacy_concerns',
    label: 'I have privacy concerns',
  },
  {
    value: 'switching_app',
    label: 'I am switching to another app',
  },
  {
    value: 'other',
    label: 'Other reason',
  },
]

function DeleteAccountSection({ onAccountDeleted }) {
  // Store the deletion form values.
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [confirmation, setConfirmation] = useState('')

  // Control loading and error feedback.
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const handleDeleteAccount = async (event) => {
    event.preventDefault()
    setError('')

    if (!reason) {
      setError('Please select why you are deleting your account.')
      return
    }

    if (confirmation !== 'DELETE') {
      setError('Please type DELETE exactly as shown.')
      return
    }

    // Give the user one final opportunity to cancel.
    const confirmed = window.confirm(
      'This will permanently delete your account, profile and all transactions. This action cannot be undone. Continue?',
    )

    if (!confirmed) {
      return
    }

    setDeleting(true)

    // Call the secure Supabase Edge Function.
    const { data, error: functionError } =
      await supabase.functions.invoke('delete-account', {
        body: {
          reason,
          details,
          confirmation,
        },
      })

    if (functionError) {
      let errorMessage =
        'We could not delete your account. Please try again.'

      // Try to read the more specific message returned by the function.
      try {
        const responseBody =
          await functionError.context.json()

        if (responseBody?.error) {
          errorMessage = responseBody.error
        }
      } catch {
        // Keep the general message if no response body is available.
      }

      setError(errorMessage)
      setDeleting(false)
      return
    }

    if (!data?.success) {
      setError(
        data?.error ||
          'We could not delete your account. Please try again.',
      )
      setDeleting(false)
      return
    }

    // Let the Settings page clear the local session and redirect.
    await onAccountDeleted()
  }

  return (
    <section className="mt-8 rounded-2xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <AlertTriangle size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Delete Account
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Permanently delete your account and all your
            financial information.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="font-semibold text-red-700">
          This action cannot be undone
        </p>

        <p className="mt-1 text-sm leading-6 text-red-600">
          Your profile, transactions and account login will be
          permanently removed.
        </p>
      </div>

      {error && (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <form
        onSubmit={handleDeleteAccount}
        className="mt-6 space-y-5"
      >
        <div>
          <label
            htmlFor="deletionReason"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Why are you deleting your account?
          </label>

          <select
            id="deletionReason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            disabled={deleting}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">Select a reason</option>

            {deletionReasons.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="deletionDetails"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Tell us more
            <span className="ml-1 font-normal text-slate-400">
              (optional)
            </span>
          </label>

          <textarea
            id="deletionDetails"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            maxLength={1000}
            rows={4}
            disabled={deleting}
            placeholder="Is there anything we could have done better?"
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <p className="mt-1 text-right text-xs text-slate-400">
            {details.length}/1000
          </p>
        </div>

        <div>
          <label
            htmlFor="deleteConfirmation"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Type{' '}
            <span className="font-bold text-red-600">
              DELETE
            </span>{' '}
            to confirm
          </label>

          <input
            id="deleteConfirmation"
            type="text"
            value={confirmation}
            onChange={(event) =>
              setConfirmation(event.target.value)
            }
            disabled={deleting}
            placeholder="DELETE"
            autoComplete="off"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={
            deleting ||
            !reason ||
            confirmation !== 'DELETE'
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <Trash2 size={19} />

          {deleting
            ? 'Deleting account...'
            : 'Permanently Delete Account'}
        </button>
      </form>
    </section>
  )
}

export default DeleteAccountSection