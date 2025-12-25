export default function Button({ children, onClick, variant = "primary" }) {
  const base =
    "w-full py-3 rounded-xl text-sm font-medium transition active:scale-[0.98]"

  const styles = {
    primary: `${base} bg-[#6F4E37] text-white`,
    secondary: `${base} bg-[#EFE6DE] text-[#6F4E37]`
  }

  return (
    <button onClick={onClick} className={styles[variant]}>
      {children}
    </button>
  )
}
