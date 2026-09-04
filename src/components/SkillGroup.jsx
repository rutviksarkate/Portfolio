export default function SkillGroup({ category, items }) {
  return (
    <div>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] text-ink/90"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
