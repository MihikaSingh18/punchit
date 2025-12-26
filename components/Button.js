export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}) {
  const base =
    "w-full py-3 rounded-xl font-semibold transition active:scale-[0.98]"

  const styles = {
    primary: "bg-[#6F4E37] text-white",
    secondary: "bg-[#E6D5C3] text-[#6F4E37]",
    outline:
      "border border-[#6F4E37] text-[#6F4E37] bg-transparent",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]} ${
        disabled ? "opacity-60" : ""
      }`}
    >
      {children}
    </button>
  )
}
