import BottomNav from "@/components/BottomNav"

export default function CustomerShell({ title, children }) {
  return (
    <div className="min-h-screen bg-[#FFF7F1] flex flex-col">

      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm">
        <h1 className="text-lg font-semibold text-[#2E2E2E]">
          {title}
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-5 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
