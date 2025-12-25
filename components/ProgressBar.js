export default function ProgressBar({ value, max }) {
  const percent = (value / max) * 100

  return (
    <div className="w-full bg-gray-200 h-3 rounded-full">
      <div
        className="bg-green-500 h-3 rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
