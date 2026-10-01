import LegalLayout from '../components/LegalLayout'

function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="This policy explains what information Expensidify collects, why it is collected and the choices available to you."
      lastUpdated="30 September 2026"
    >
      <section>
        <h2 className="text-xl font-bold text-slate-900">
          1. About Expensidify
        </h2>

        <p className="mt-3 leading-7">
          Expensidify is a personal finance tracking
          application and portfolio project created by
          Jesupelumi Afolayan. It allows users to record
          income and expenses, view financial summaries and
          manage their account preferences.
        </p>

        <p className="mt-3 leading-7">
          Expensidify is not a bank, financial institution,
          investment platform or financial adviser.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          2. Information we collect
        </h2>

        <p className="mt-3 leading-7">
          Depending on how you use the application, we may
          collect the following information:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
          <li>
            Your name and email address.
          </li>

          <li>
            Authentication information required to create
            and secure your account.
          </li>

          <li>
            Basic profile information received when you
            choose to sign in with Google.
          </li>

          <li>
            Transaction information you enter, including
            titles, amounts, categories, transaction types
            and dates.
          </li>

          <li>
            Your preferred dashboard currency and other
            application preferences.
          </li>

          <li>
            Anonymous feedback submitted when an account is
            deleted.
          </li>

          <li>
            Basic technical information required for the
            application and its hosting services to function
            securely.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          3. Information we do not collect
        </h2>

        <p className="mt-3 leading-7">
          Expensidify currently does not connect directly to
          your bank account. We do not collect your bank
          password, card PIN, card security code or online
          banking credentials.
        </p>

        <p className="mt-3 leading-7">
          Password authentication is handled by Supabase.
          Expensidify does not display or store your
          password in a readable form.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          4. How we use your information
        </h2>

        <p className="mt-3 leading-7">
          Your information is used to:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
          <li>Create and maintain your account.</li>

          <li>
            Authenticate you and protect access to your
            financial records.
          </li>

          <li>
            Save and display the transactions you enter.
          </li>

          <li>
            Calculate your income, expenses and balance.
          </li>

          <li>
            Display charts and financial summaries.
          </li>

          <li>
            Save your currency and dashboard preferences.
          </li>

          <li>
            Improve the usability and reliability of the
            application.
          </li>

          <li>
            Respond to support, privacy or account-related
            requests.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          5. Third-party services
        </h2>

        <p className="mt-3 leading-7">
          Expensidify uses trusted third-party services to
          operate:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
          <li>
            <strong className="text-slate-800">
              Supabase
            </strong>{' '}
            provides authentication, database storage and
            secure server functions.
          </li>

          <li>
            <strong className="text-slate-800">
              Vercel
            </strong>{' '}
            hosts and delivers the web application.
          </li>

          <li>
            <strong className="text-slate-800">
              Google
            </strong>{' '}
            provides optional Google account
            authentication.
          </li>

          <li>
            An exchange-rate service may provide current
            currency-conversion rates.
          </li>
        </ul>

        <p className="mt-3 leading-7">
          These providers may process limited information
          necessary to deliver their services under their
          own privacy terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          6. How we protect your information
        </h2>

        <p className="mt-3 leading-7">
          Expensidify uses authentication, database access
          rules, protected server functions and encrypted
          network connections to help protect your
          information. Users are restricted to their own
          financial records.
        </p>

        <p className="mt-3 leading-7">
          No internet-based system can guarantee absolute
          security. You should use a strong password and
          protect access to your email and devices.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          7. Data retention and account deletion
        </h2>

        <p className="mt-3 leading-7">
          Your profile and transaction information is
          retained while your account remains active.
        </p>

        <p className="mt-3 leading-7">
          You can permanently delete your account from the
          Settings page. When deletion is completed, your
          authentication account, profile and transactions
          are removed. Anonymous deletion feedback may be
          retained because it is not connected to your
          identity.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          8. Your privacy rights
        </h2>

        <p className="mt-3 leading-7">
          Subject to applicable data-protection laws, you
          may request access to, correction of or deletion
          of your personal information. You may also object
          to or restrict certain processing where
          applicable.
        </p>

        <p className="mt-3 leading-7">
          You can update your name and currency preference
          from Account Settings and delete your account
          directly from the application.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          9. Children&apos;s privacy
        </h2>

        <p className="mt-3 leading-7">
          Expensidify is not intentionally designed to
          collect personal information from children. If
          you believe a child has provided personal
          information without appropriate permission,
          please contact us so the information can be
          reviewed and removed.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          10. Changes to this policy
        </h2>

        <p className="mt-3 leading-7">
          This Privacy Policy may be updated when the
          application, its features or applicable
          requirements change. The latest revision date
          will be displayed at the top of this page.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          11. Contact
        </h2>

        <p className="mt-3 leading-7">
          For privacy questions, account concerns or data
          requests, contact:
        </p>

        <a
          href="mailto:jayphee247@gmail.com"
          className="mt-3 inline-block font-semibold text-emerald-600 hover:text-emerald-700"
        >
          jayphee247@gmail.com
        </a>
      </section>
    </LegalLayout>
  )
}

export default PrivacyPolicy