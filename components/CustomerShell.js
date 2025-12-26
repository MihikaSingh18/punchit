export default function CustomerShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] px-5">
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-semibold text-[#2E2E2E]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[#8B8B8B] mt-1">
            {subtitle}
          </p>
        )}
      </header>

      <main className="mt-4 max-w-md mx-auto">
        {children}
      </main>
    </div>
  )
}
