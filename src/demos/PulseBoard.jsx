import { ArrowUpRight, Bell, Check, ChevronRight, Search, SlidersHorizontal, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import DemoShell from './DemoShell.jsx'

const NAV = [
  { id: 'Overview', hint: 'Live snapshot' },
  { id: 'Customers', hint: '48 accounts' },
  { id: 'Invoices', hint: 'This quarter' },
  { id: 'Team', hint: '4 seats' },
  { id: 'Settings', hint: 'Workspace' },
]

const CUSTOMERS = [
  { id: 'northwind', name: 'Northwind Labs', plan: 'Growth', mrr: 2400, status: 'Healthy', owner: 'Priya M.', seats: 24, used: 22, region: 'US-West', joined: 'Mar 2024', nextInvoice: '12 Sep', note: 'Evaluating SSO before Scale.' },
  { id: 'kiln', name: 'Kiln Studio', plan: 'Starter', mrr: 490, status: 'Trial', owner: 'James K.', seats: 6, used: 6, region: 'UK', joined: 'Aug 2026', nextInvoice: 'Trial ends 18 Sep', note: 'Need a design-review walkthrough.' },
  { id: 'harbor', name: 'Harbor Freight Co.', plan: 'Scale', mrr: 6100, status: 'Healthy', owner: 'Amelia R.', seats: 80, used: 71, region: 'US-East', joined: 'Nov 2023', nextInvoice: '1 Oct', note: 'Expanded seats after Q2 ops hire.' },
  { id: 'paper', name: 'Paper Route', plan: 'Growth', mrr: 1800, status: 'At risk', owner: 'Noah L.', seats: 18, used: 18, region: 'EU', joined: 'Jan 2025', nextInvoice: '9 Sep', note: 'Usage alert at 92%. Champion left last month.' },
  { id: 'lowtide', name: 'Lowtide Media', plan: 'Starter', mrr: 290, status: 'Healthy', owner: 'Sofia V.', seats: 4, used: 3, region: 'AU', joined: 'Jun 2026', nextInvoice: '22 Sep', note: 'Quiet account. Paying on time.' },
  { id: 'veil', name: 'Veil Analytics', plan: 'Scale', mrr: 4200, status: 'Healthy', owner: 'Kenji T.', seats: 51, used: 44, region: 'JP', joined: 'Feb 2024', nextInvoice: '4 Oct', note: 'Asked for JP data residency addendum.' },
]

const INVOICES = [
  { id: 'INV-2041', account: 'Harbor Freight Co.', amount: 6100, status: 'Paid', date: '1 Sep', method: 'ACH' },
  { id: 'INV-2038', account: 'Northwind Labs', amount: 2400, status: 'Paid', date: '28 Aug', method: 'Card · 4242' },
  { id: 'INV-2032', account: 'Paper Route', amount: 1800, status: 'Open', date: '1 Sep', method: 'SEPA' },
  { id: 'INV-2029', account: 'Veil Analytics', amount: 4200, status: 'Paid', date: '4 Aug', method: 'Wire' },
  { id: 'INV-2021', account: 'Kiln Studio', amount: 490, status: 'Draft', date: '—', method: '—' },
  { id: 'INV-2018', account: 'Lowtide Media', amount: 290, status: 'Paid', date: '22 Aug', method: 'Card · 8891' },
]

const TEAM = [
  { name: 'Amelia R.', role: 'Owner', access: 'Billing + admin', online: true },
  { name: 'Priya M.', role: 'CS lead', access: 'Accounts', online: true },
  { name: 'Noah L.', role: 'Finance', access: 'Invoices', online: false },
  { name: 'Kenji T.', role: 'Success', access: 'Accounts', online: true },
]

const ALERTS = [
  { id: 1, title: 'Paper Route at 100% seats', detail: 'Usage cap hit. Expansion or churn risk.', tone: 'amber', t: '3h' },
  { id: 2, title: 'INV-2032 still open', detail: '$1,800 · Paper Route · SEPA', tone: 'amber', t: '1d' },
  { id: 3, title: 'Kiln Studio trial ends 18 Sep', detail: 'Book the Growth walkthrough.', tone: 'sky', t: '2d' },
]

const PLANS = ['Starter', 'Growth', 'Scale']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const BARS = [38, 44, 41, 52, 58, 55, 67, 63, 74, 71, 82, 88]
const SPARK = 'M0 28 C 18 26, 28 18, 44 20 S 72 32, 90 18 S 130 8, 160 12'
const ACTIVITY = [
  { t: '2m', text: 'Harbor Freight Co. upgraded to Scale' },
  { t: '1h', text: 'Invoice INV-2041 paid — $6,100' },
  { t: '3h', text: 'Paper Route usage alert at 92% of seats' },
  { t: 'Yesterday', text: 'Northwind Labs added 4 seats' },
  { t: 'Mon', text: 'Kiln Studio started a 14-day Growth trial' },
]

const RANGE = {
  '30d': { label: '30 days', rev: 18280, accounts: 48, net: 1670, open: 1800, delta: '+8.4%' },
  '90d': { label: '90 days', rev: 51240, accounts: 51, net: 4210, open: 1800, delta: '+11.2%' },
  '12m': { label: '12 months', rev: 198400, accounts: 48, net: 18420, open: 1800, delta: '+19.0%' },
}

const statusTone = {
  Healthy: 'bg-emerald-500/15 text-emerald-300',
  Trial: 'bg-sky-500/15 text-sky-300',
  'At risk': 'bg-amber-500/15 text-amber-300',
  Paused: 'bg-zinc-500/15 text-zinc-400',
}

const invoiceTone = {
  Paid: 'text-emerald-300',
  Open: 'text-amber-300',
  Draft: 'text-zinc-500',
}

export default function PulseBoard() {
  const [tab, setTab] = useState('Overview')
  const [selected, setSelected] = useState(CUSTOMERS[2])
  const [accounts, setAccounts] = useState(CUSTOMERS)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [invFilter, setInvFilter] = useState('All')
  const [invoice, setInvoice] = useState(INVOICES[0])
  const [range, setRange] = useState('30d')
  const [toast, setToast] = useState('')
  const [bell, setBell] = useState(false)
  const [read, setRead] = useState([])
  const [notes, setNotes] = useState({})
  const [draft, setDraft] = useState('')
  const [cmd, setCmd] = useState('')
  const [settings, setSettings] = useState({
    workspace: 'Acme Production',
    digest: true,
    slack: true,
    pager: false,
    timezone: 'America/Los_Angeles',
  })

  const ping = (msg) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  const metrics = RANGE[range]
  const unread = ALERTS.filter((a) => !read.includes(a.id)).length

  const customers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return accounts.filter((c) => {
      const f = filter === 'All' || c.status === filter
      const s = !q || c.name.toLowerCase().includes(q) || c.owner.toLowerCase().includes(q)
      return f && s
    })
  }, [query, filter, accounts])

  const invoices = INVOICES.filter((row) => invFilter === 'All' || row.status === invFilter)

  const patchAccount = (id, next) => {
    setAccounts((rows) => rows.map((r) => (r.id === id ? { ...r, ...next } : r)))
    setSelected((s) => (s.id === id ? { ...s, ...next } : s))
  }

  const jump = (id) => {
    setTab(id)
    setCmd('')
  }

  return (
    <DemoShell brand="PulseBoard" className="min-h-screen bg-[#09090b] text-zinc-100 font-[family-name:var(--font-product)]">
      <div className="flex min-h-full w-full min-w-0 flex-1">
        <aside className="hidden w-60 shrink-0 border-r border-white/5 p-6 lg:flex lg:flex-col">
          <p className="text-sm font-semibold tracking-tight">PulseBoard</p>
          <p className="mt-1 text-[11px] text-zinc-500">{settings.workspace}</p>
          <label className="relative mt-8">
            <Search size={12} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input
              value={cmd}
              onChange={(e) => setCmd(e.target.value)}
              placeholder="Jump to…"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-8 pr-2 text-xs outline-none placeholder:text-zinc-600"
            />
          </label>
          {cmd && (
            <div className="mt-2 overflow-hidden rounded-lg border border-white/10 bg-zinc-950 text-xs">
              {NAV.filter((n) => n.id.toLowerCase().includes(cmd.toLowerCase())).map((n) => (
                <button key={n.id} type="button" onClick={() => jump(n.id)} className="block w-full px-3 py-2 text-left hover:bg-white/5">
                  {n.id}
                </button>
              ))}
            </div>
          )}
          <nav className="mt-6 space-y-1">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${
                  tab === item.id ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                }`}
              >
                {item.id}
                <span className="text-[10px] text-zinc-600">{item.hint}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-[11px] text-zinc-500">Net retention</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">114%</p>
            <svg viewBox="0 0 160 36" className="mt-3 h-9 w-full text-emerald-400">
              <path d={SPARK} fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <p className="mt-2 text-[11px] text-zinc-500">Trailing 12 months</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1 p-5 lg:p-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">September 2026 · {metrics.label}</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">{tab}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-2 lg:hidden">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`rounded-full px-3 py-1.5 text-xs ${tab === item.id ? 'bg-white text-zinc-950' : 'bg-white/5 text-zinc-400'}`}
                  >
                    {item.id}
                  </button>
                ))}
              </div>
              {tab === 'Overview' && (
                <div className="flex rounded-lg border border-white/10 p-0.5">
                  {Object.keys(RANGE).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setRange(id)}
                      className={`rounded-md px-2.5 py-1 text-[11px] ${range === id ? 'bg-white text-zinc-950' : 'text-zinc-400'}`}
                    >
                      {RANGE[id].label}
                    </button>
                  ))}
                </div>
              )}
              <button type="button" onClick={() => setBell((v) => !v)} className="relative rounded-lg border border-white/10 p-2 text-zinc-300 hover:bg-white/5" aria-label="Alerts">
                <Bell size={14} />
                {unread > 0 && <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-amber-400" />}
              </button>
              <button
                type="button"
                onClick={() => ping('CSV queued — check downloads in a moment.')}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5"
              >
                Export
              </button>
            </div>
          </div>

          {tab === 'Overview' && (
            <>
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  ['Revenue', `$${metrics.rev.toLocaleString()}`, metrics.delta],
                  ['Active accounts', `${metrics.accounts}`, '+3'],
                  ['Net new MRR', `$${metrics.net.toLocaleString()}`, 'After churn'],
                  ['Open invoices', `$${metrics.open.toLocaleString()}`, '1 past due risk'],
                ].map(([label, value, delta]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-[11px] text-zinc-500">{label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
                    <p className={`mt-2 inline-flex items-center gap-1 text-xs ${label === 'Open invoices' ? 'text-amber-300' : 'text-emerald-400'}`}>
                      {label !== 'Open invoices' && <ArrowUpRight size={12} />} {delta}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm font-medium">Revenue</p>
                    <p className="text-[11px] text-zinc-500">{metrics.label}</p>
                  </div>
                  <div className="flex h-44 items-end gap-1.5">
                    {BARS.map((h, i) => (
                      <div key={MONTHS[i]} className="group flex flex-1 flex-col items-center gap-2">
                        <div className="w-full rounded-t-sm bg-gradient-to-t from-violet-600 to-fuchsia-400 opacity-90" style={{ height: `${h}%` }} />
                        <span className="text-[9px] text-zinc-600">{MONTHS[i]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                    {[
                      ['New', '$1,240'],
                      ['Expansion', '$610'],
                      ['Churn', '−$180'],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-lg bg-white/5 px-3 py-2">
                        <p className="text-zinc-500">{k}</p>
                        <p className="mt-1 font-medium tabular-nums">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm font-medium">Activity</p>
                  <ul className="mt-5 space-y-4">
                    {ACTIVITY.map((a) => (
                      <li key={a.text} className="flex gap-3 text-sm">
                        <span className="w-16 shrink-0 text-[11px] text-zinc-500">{a.t}</span>
                        <span className="text-zinc-300">{a.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {tab === 'Customers' && (
            <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <label className="relative flex-1">
                    <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search accounts or owners"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-zinc-600"
                    />
                  </label>
                  {['All', 'Healthy', 'Trial', 'At risk', 'Paused'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={`rounded-full px-3 py-1.5 text-xs ${filter === f ? 'bg-white text-zinc-950' : 'bg-white/5 text-zinc-400'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-zinc-500">
                      <tr>
                        <th className="px-4 py-3 font-medium">Account</th>
                        <th className="px-4 py-3 font-medium">Plan</th>
                        <th className="px-4 py-3 font-medium">MRR</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c) => (
                        <tr
                          key={c.id}
                          onClick={() => setSelected(c)}
                          className={`cursor-pointer border-t border-white/5 ${selected.id === c.id ? 'bg-white/10' : 'hover:bg-white/[0.03]'}`}
                        >
                          <td className="px-4 py-3.5 font-medium">{c.name}</td>
                          <td className="px-4 py-3.5 text-zinc-400">{c.plan}</td>
                          <td className="px-4 py-3.5 tabular-nums">${c.mrr.toLocaleString()}</td>
                          <td className="px-4 py-3.5">
                            <span className={`rounded-full px-2 py-0.5 text-[11px] ${statusTone[c.status]}`}>{c.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Account</p>
                <h2 className="mt-2 text-xl font-semibold">{selected.name}</h2>
                <span className={`mt-3 inline-flex rounded-full px-2 py-0.5 text-[11px] ${statusTone[selected.status]}`}>{selected.status}</span>
                <dl className="mt-6 space-y-3 text-sm">
                  {[
                    ['Owner', selected.owner],
                    ['Seats', `${selected.used} / ${selected.seats}`],
                    ['Region', selected.region],
                    ['Joined', selected.joined],
                    ['Next invoice', selected.nextInvoice],
                    ['MRR', `$${selected.mrr.toLocaleString()}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-zinc-500">{k}</dt>
                      <dd className="text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
                <label className="mt-5 block text-[11px] text-zinc-500">
                  Plan
                  <select
                    value={selected.plan}
                    onChange={(e) => {
                      patchAccount(selected.id, { plan: e.target.value })
                      ping(`${selected.name} moved to ${e.target.value}.`)
                    }}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white outline-none"
                  >
                    {PLANS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-violet-400" style={{ width: `${(selected.used / selected.seats) * 100}%` }} />
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{selected.note}</p>
                <form
                  className="mt-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!draft.trim()) return
                    setNotes((n) => ({ ...n, [selected.id]: [...(n[selected.id] || []), draft.trim()] }))
                    setDraft('')
                  }}
                >
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Add an internal note"
                    className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm outline-none placeholder:text-zinc-600"
                  />
                </form>
                {(notes[selected.id] || []).map((n) => (
                  <p key={n} className="mt-2 rounded-lg bg-white/5 px-3 py-2 text-[12px] text-zinc-300">{n}</p>
                ))}
                <div className="mt-6 flex flex-col gap-2">
                  <button type="button" onClick={() => ping(`Invoice drafted for ${selected.name}.`)} className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-zinc-950">
                    Draft invoice
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const next = selected.status === 'Paused' ? 'Healthy' : 'Paused'
                      patchAccount(selected.id, { status: next })
                      ping(`${selected.name} ${next === 'Paused' ? 'paused' : 'resumed'}.`)
                    }}
                    className="inline-flex items-center justify-center gap-1 text-sm text-violet-300"
                  >
                    {selected.status === 'Paused' ? 'Resume account' : 'Pause account'} <ChevronRight size={14} />
                  </button>
                </div>
              </aside>
            </div>
          )}

          {tab === 'Invoices' && (
            <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
              <div>
                <div className="mb-3 flex gap-2">
                  {['All', 'Paid', 'Open', 'Draft'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setInvFilter(f)}
                      className={`rounded-full px-3 py-1.5 text-xs ${invFilter === f ? 'bg-white text-zinc-950' : 'bg-white/5 text-zinc-400'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-zinc-500">
                      <tr>
                        <th className="px-4 py-3 font-medium">Invoice</th>
                        <th className="px-4 py-3 font-medium">Account</th>
                        <th className="px-4 py-3 font-medium">Amount</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((row) => (
                        <tr
                          key={row.id}
                          onClick={() => setInvoice(row)}
                          className={`cursor-pointer border-t border-white/5 ${invoice.id === row.id ? 'bg-white/10' : 'hover:bg-white/[0.03]'}`}
                        >
                          <td className="px-4 py-3.5 font-[family-name:var(--font-mono)] text-xs">{row.id}</td>
                          <td className="px-4 py-3.5">{row.account}</td>
                          <td className="px-4 py-3.5 tabular-nums">${row.amount.toLocaleString()}</td>
                          <td className={`px-4 py-3.5 text-xs ${invoiceTone[row.status]}`}>{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-[family-name:var(--font-mono)] text-xs text-zinc-500">{invoice.id}</p>
                <h2 className="mt-2 text-xl font-semibold">{invoice.account}</h2>
                <p className="mt-4 text-3xl font-semibold tabular-nums">${invoice.amount.toLocaleString()}</p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-zinc-500">Status</dt><dd className={invoiceTone[invoice.status]}>{invoice.status}</dd></div>
                  <div className="flex justify-between"><dt className="text-zinc-500">Issued</dt><dd>{invoice.date}</dd></div>
                  <div className="flex justify-between"><dt className="text-zinc-500">Method</dt><dd>{invoice.method}</dd></div>
                </dl>
                <button
                  type="button"
                  onClick={() => ping(invoice.status === 'Open' ? 'Payment reminder sent.' : 'PDF copied to clipboard.')}
                  className="mt-8 w-full rounded-lg bg-white py-2 text-sm font-medium text-zinc-950"
                >
                  {invoice.status === 'Open' ? 'Send reminder' : 'Download PDF'}
                </button>
                {invoice.status === 'Draft' && (
                  <button type="button" onClick={() => ping('Invoice finalized and sent.')} className="mt-2 w-full text-sm text-violet-300">
                    Finalize & send
                  </button>
                )}
              </aside>
            </div>
          )}

          {tab === 'Team' && (
            <div className="grid gap-3 sm:grid-cols-2">
              {TEAM.map((m) => (
                <div key={m.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${m.online ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                    <div>
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-[12px] text-zinc-500">{m.role} · {m.access}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => ping(`Invite options opened for ${m.role}.`)} className="text-xs text-zinc-500">
                    Edit
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => ping('Invite link copied.')} className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 p-5 text-sm text-zinc-400">
                <Users size={16} /> Invite teammate
              </button>
            </div>
          )}

          {tab === 'Settings' && (
            <div className="grid max-w-2xl gap-4">
              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 flex items-center gap-2 text-sm font-medium">
                  <SlidersHorizontal size={14} /> Workspace
                </div>
                <label className="block text-[12px] text-zinc-500">
                  Display name
                  <input
                    value={settings.workspace}
                    onChange={(e) => setSettings((s) => ({ ...s, workspace: e.target.value }))}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white outline-none"
                  />
                </label>
                <label className="mt-4 block text-[12px] text-zinc-500">
                  Billing timezone
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings((s) => ({ ...s, timezone: e.target.value }))}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white outline-none"
                  >
                    <option>America/Los_Angeles</option>
                    <option>America/New_York</option>
                    <option>Europe/London</option>
                    <option>Asia/Kolkata</option>
                  </select>
                </label>
              </section>
              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 flex items-center gap-2 text-sm font-medium">
                  <Bell size={14} /> Alerts
                </div>
                {[
                  ['digest', 'Weekly revenue digest', 'Monday 9:00 in workspace time'],
                  ['slack', 'Slack usage alerts', 'Seat cap and failed payments'],
                  ['pager', 'Pager for failed charges', 'Immediate, billing owners only'],
                ].map(([key, title, hint]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSettings((s) => ({ ...s, [key]: !s[key] }))}
                    className="mb-3 flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-left"
                  >
                    <span>
                      <span className="block text-sm">{title}</span>
                      <span className="text-[12px] text-zinc-500">{hint}</span>
                    </span>
                    <span className={`flex h-6 w-10 items-center rounded-full p-0.5 ${settings[key] ? 'bg-violet-500' : 'bg-white/10'}`}>
                      <span className={`h-5 w-5 rounded-full bg-white transition ${settings[key] ? 'translate-x-4' : ''}`} />
                    </span>
                  </button>
                ))}
                <button type="button" onClick={() => ping('Workspace settings saved.')} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-950">
                  <Check size={14} /> Save changes
                </button>
              </section>
            </div>
          )}
        </div>
      </div>

      {bell && (
        <div className="fixed right-5 top-20 z-50 w-80 rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium">Alerts</p>
            <button type="button" onClick={() => setRead(ALERTS.map((a) => a.id))} className="text-[11px] text-zinc-500">Mark all read</button>
          </div>
          <ul className="space-y-3">
            {ALERTS.map((a) => (
              <li key={a.id} className={`rounded-xl border border-white/10 p-3 ${read.includes(a.id) ? 'opacity-50' : ''}`}>
                <p className="text-sm">{a.title}</p>
                <p className="mt-1 text-[12px] text-zinc-500">{a.detail}</p>
                <div className="mt-2 flex justify-between text-[11px] text-zinc-600">
                  <span>{a.t}</span>
                  <button type="button" onClick={() => setRead((r) => (r.includes(a.id) ? r : [...r, a.id]))}>Dismiss</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 shadow-2xl">
          {toast}
        </div>
      )}
    </DemoShell>
  )
}
