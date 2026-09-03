import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function DemoShell({
  brand,
  children,
  className = 'min-h-screen bg-[#07080c] text-zinc-100',
  headerClass = 'border-white/10 bg-[#07080c]/85 text-zinc-100',
  linkClass = 'text-zinc-400 hover:text-white',
}) {
  const [embedded] = useState(() => window.self !== window.top)

  return (
    <div className={`flex min-h-screen flex-col ${className}`}>
      {!embedded && (
        <header className={`sticky top-0 z-40 border-b backdrop-blur-xl ${headerClass}`}>
          <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 lg:px-8">
            <Link to="/demos" className={`inline-flex items-center gap-2 text-[13px] transition-colors ${linkClass}`}>
              <ArrowLeft size={15} />
              Demos
            </Link>
            <p className="text-[13px] font-medium tracking-wide">{brand}</p>
          </div>
        </header>
      )}
      <div className="flex min-h-0 w-full flex-1 flex-col">{children}</div>
    </div>
  )
}
