import { Gauge, Layers, LayoutDashboard, Server } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/useMotion.js'

const icons = {
  layout: LayoutDashboard,
  stack: Layers,
  server: Server,
  gauge: Gauge,
}

export default function ServiceCard({ title, description, icon }) {
  const Icon = icons[icon] || Layers

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/25 lg:p-8"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent-dim text-accent">
        <Icon size={22} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-mute">{description}</p>
    </motion.div>
  )
}
