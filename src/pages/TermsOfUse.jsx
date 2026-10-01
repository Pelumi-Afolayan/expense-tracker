import LegalLayout from '../components/LegalLayout'

function TermsOfUse() {
  return (
    <LegalLayout
      title="Terms of Use"
      description="These terms describe the rules and responsibilities that apply when you use Expensidify."
      lastUpdated="30 September 2026"
    >
      <section>
        <h2 className="text-xl font-bold text-slate-900">
          1. Acceptance of these terms
        </h2>

        <p className="mt-3 leading-7">
          By creating an account or using Expensidify, you
          agree to these Terms of Use and the Privacy
          Policy. If you do not agree, you should not use
          the application.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          2. About the service
        </h2>

        <p className="mt-3 leading-7">
          Expensidify is a personal finance tracking
          application and portfolio project. It helps users
          manually record income and expenses, review
          financial summaries, view charts and convert
          displayed balances between supported currencies.
        </p>

        <p className="mt-3 leading-7">
          Features may be added, changed, suspended or
          removed as the application continues to develop.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          3. Account responsibilities
        </h2>

        <p className="mt-3 leading-7">
          You are responsible for:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
          <li>
            Providing accurate account information.
          </li>

          <li>
            Protecting your password, email account and
            device.
          </li>

          <li>
            Keeping your login information confidential.
          </li>

          <li>
            Reviewing the transactions and information you
            enter.
          </li>

          <li>
            Informing us if you believe your account has
            been accessed without authorization.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          4. Acceptable use
        </h2>

        <p className="mt-3 leading-7">
          You must not:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
          <li>
            Use Expensidify for unlawful or fraudulent
            activity.
          </li>

          <li>
            Attempt to access another user&apos;s account or
            transactions.
          </li>

          <li>
            Attempt to bypass authentication, authorization
            or database-security controls.
          </li>

          <li>
            Interfere with the application, its servers or
            its service providers.
          </li>

          <li>
            Upload or submit malicious content.
          </li>

          <li>
            Use automated methods to overload or abuse the
            service.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          5. Financial disclaimer
        </h2>

        <p className="mt-3 leading-7">
          Expensidify is provided for personal tracking and
          informational purposes only. It does not provide
          financial, investment, tax, accounting or legal
          advice.
        </p>

        <p className="mt-3 leading-7">
          Information displayed by the application depends
          on the information you enter. You remain
          responsible for checking amounts, dates,
          categories, balances and financial decisions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          6. Currency conversion
        </h2>

        <p className="mt-3 leading-7">
          Currency conversions are estimates based on rates
          supplied by a third-party exchange-rate service.
          Rates may be delayed, incomplete or different
          from rates offered by banks and payment
          providers.
        </p>

        <p className="mt-3 leading-7">
          Converted values should not be relied upon for
          trading, payment settlement or important
          financial decisions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          7. Availability of the application
        </h2>

        <p className="mt-3 leading-7">
          We aim to keep Expensidify available and
          functional, but uninterrupted or error-free
          service is not guaranteed. Access may be
          interrupted by maintenance, internet problems,
          third-party service failures or technical
          changes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          8. Account suspension and deletion
        </h2>

        <p className="mt-3 leading-7">
          You may delete your account through Account
          Settings. Account deletion is permanent and
          removes the associated profile and transaction
          records.
        </p>

        <p className="mt-3 leading-7">
          Access may be restricted or terminated where an
          account is used unlawfully, attempts to compromise
          the application or seriously violates these
          terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          9. Intellectual property
        </h2>

        <p className="mt-3 leading-7">
          The Expensidify name, interface, source design and
          original application content belong to the
          project owner unless otherwise stated. Third-party
          libraries, icons and services remain subject to
          their respective licences and terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          10. Limitation of responsibility
        </h2>

        <p className="mt-3 leading-7">
          To the extent permitted by applicable law,
          Expensidify is provided on an “as available”
          basis. The project owner is not responsible for
          losses resulting from incorrect information
          entered by a user, reliance on estimated currency
          conversions, service interruption or unauthorized
          access outside reasonable control.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          11. Changes to these terms
        </h2>

        <p className="mt-3 leading-7">
          These terms may be updated as Expensidify changes.
          Continued use of the application after an update
          means you accept the revised terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">
          12. Contact
        </h2>

        <p className="mt-3 leading-7">
          Questions about these terms can be sent to:
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

export default TermsOfUse