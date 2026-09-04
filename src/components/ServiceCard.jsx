import { Gauge, Layers, LayoutDashboard, Wrench } from 'lucide-react'
import Reveal from './Reveal.jsx'

const icons = {
  layout: LayoutDashboard,
  stack: Layers,
  wrench: Wrench,
  gauge: Gauge,
}

export default function ServiceCard({ title, description, icon, index }) {
  const Icon = icons[icon] || Layers

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <article className="group flex h-full flex-col rounded-[14px] border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong lg:p-7">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-dim text-accent">
            <Icon size={18} />
          </div>
          <span className="font-mono text-[11px] text-faint">0{index + 1}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-mute">{description}</p>
      </article>
    </Reveal>
  )
}
