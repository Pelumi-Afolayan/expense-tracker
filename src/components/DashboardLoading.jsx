function DashboardLoading() {
  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-8">
          <div className="h-4 w-28 rounded bg-slate-300" />
          <div className="mt-3 h-8 w-56 rounded bg-slate-300" />
          <div className="mt-3 h-4 w-72 max-w-full rounded bg-slate-200" />
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="mt-4 h-8 w-36 rounded bg-slate-300" />
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="h-6 w-40 rounded bg-slate-300" />
          <div className="mt-3 h-4 w-64 max-w-full rounded bg-slate-200" />

          <div className="mt-8 h-64 rounded-xl bg-slate-200" />
        </section>
      </div>
    </main>
  )
}

export default DashboardLoading