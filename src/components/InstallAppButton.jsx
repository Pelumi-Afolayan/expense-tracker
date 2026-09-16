import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

function InstallAppButton() {
  // Store the installation event provided by the browser.
  const [installPrompt, setInstallPrompt] = useState(null)

  // Control the instructions shown to iPhone and iPad users.
  const [showIosInstructions, setShowIosInstructions] =
    useState(false)

  // Check whether the device uses iOS.
  const isIos = /iphone|ipad|ipod/i.test(
    window.navigator.userAgent,
  )

  // Check whether Expensidify is already running as an installed app.
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Stop Chrome from immediately showing its own prompt.
      event.preventDefault()

      // Save the event so our button can open the prompt later.
      setInstallPrompt(event)
    }

    const handleAppInstalled = () => {
      // Hide the button after installation succeeds.
      setInstallPrompt(null)
      setShowIosInstructions(false)
    }

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt,
    )

    window.addEventListener(
      'appinstalled',
      handleAppInstalled,
    )

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )

      window.removeEventListener(
        'appinstalled',
        handleAppInstalled,
      )
    }
  }, [])

  const handleInstall = async () => {
    // iOS does not provide an automatic installation prompt.
    if (isIos) {
      setShowIosInstructions(true)
      return
    }

    if (!installPrompt) {
      return
    }

    // Ask the browser to install Expensidify.
    await installPrompt.prompt()

    const result = await installPrompt.userChoice

    // The saved prompt can only be used once.
    if (result.outcome === 'accepted') {
      setInstallPrompt(null)
    }
  }

  // Do not show the button when the app is already installed.
  if (isStandalone) {
    return null
  }

  // Hide it on unsupported browsers.
  if (!installPrompt && !isIos) {
    return null
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={handleInstall}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 px-5 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
      >
        <Download size={19} />

        Install Expensidify
      </button>

      {showIosInstructions && (
        <div className="mt-3 rounded-xl bg-slate-100 p-4 text-sm leading-6 text-slate-600">
          <p className="font-semibold text-slate-800">
            Install on iPhone or iPad
          </p>

          <p className="mt-1">
            Tap the Share button in Safari, then select
            <strong> Add to Home Screen</strong>.
          </p>
        </div>
      )}
    </div>
  )
}

export default InstallAppButton