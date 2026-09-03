export default function SkillBadge({ label }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-elevated px-3 py-1.5 text-xs font-medium text-ink/90 transition-colors duration-200 hover:border-accent/30 hover:text-accent-strong sm:text-sm">
      {label}
    </span>
  )
}
