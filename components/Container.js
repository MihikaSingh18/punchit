export default function Container({ children }) {
  return (
    <div className="min-h-screen bg-[#FFF7F1] flex justify-center">
      <div className="w-full max-w-[420px] px-4 py-6">
        {children}
      </div>
    </div>
  )
}
