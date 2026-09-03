import { Calendar, Check, Clock, MapPin, User, X } from 'lucide-react'
import { useState } from 'react'
import hero from '../assets/demos/aptly-hero.png'
import DemoShell from './DemoShell.jsx'

const SERVICES = [
  { id: 'consult', name: 'Strategy consult', mins: 45, price: 'Complimentary', blurb: 'Scope, timeline, and whether we should even build it.' },
  { id: 'review', name: 'Design review', mins: 60, price: '$180', blurb: 'A working session on flows, type, and the parts that feel cheap.' },
  { id: 'follow', name: 'Follow-up', mins: 30, price: '$90', blurb: 'A short check-in after a review. Bring the latest build.' },
]

const STAFF = [
  { id: 'maya', name: 'Maya Chen', role: 'Studio lead', note: 'Product and brand systems' },
  { id: 'luca', name: 'Luca Moreau', role: 'Designer', note: 'Type, interiors, and print' },
]

const WEEK_A = [
  { id: 'mon', label: 'Mon', date: '8' },
  { id: 'tue', label: 'Tue', date: '9' },
  { id: 'wed', label: 'Wed', date: '10' },
  { id: 'thu', label: 'Thu', date: '11' },
  { id: 'fri', label: 'Fri', date: '12' },
]
const WEEK_B = [
  { id: 'mon2', label: 'Mon', date: '15' },
  { id: 'tue2', label: 'Tue', date: '16' },
  { id: 'wed2', label: 'Wed', date: '17' },
  { id: 'thu2', label: 'Thu', date: '18' },
  { id: 'fri2', label: 'Fri', date: '19' },
]
const SLOTS = ['09:00', '09:45', '11:00', '13:30', '15:00', '16:30']

const SEED = [
  { id: 'seed-1', name: 'You', email: '', service: 'Design review', when: 'Tue 9 September · 11:00', staff: 'Maya Chen', status: 'upcoming' },
]

export default function Aptly() {
  const [week, setWeek] = useState('a')
  const DAYS = week === 'a' ? WEEK_A : WEEK_B
  const [day, setDay] = useState('wed')
  const [slot, setSlot] = useState('13:30')
  const [service, setService] = useState(SERVICES[0])
  const [staff, setStaff] = useState(STAFF[0])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [place, setPlace] = useState('video')
  const [sms, setSms] = useState(true)
  const [gift, setGift] = useState(false)
  const [waitlist, setWaitlist] = useState([])
  const [visits, setVisits] = useState(SEED)
  const [done, setDone] = useState(null)
  const [moving, setMoving] = useState(null)
  const taken = new Set(['tue|09:45', 'wed|09:00', 'thu|15:00', 'mon2|11:00'])

  const dayMeta = DAYS.find((d) => d.id === day)
  const key = `${day}|${slot}`
  const isTaken = taken.has(key)
  const upcoming = visits.filter((v) => v.status === 'upcoming')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || isTaken) return
    const booking = {
      id: `apt-${Date.now()}`,
      name: name.trim(),
      email,
      service: service.name,
      when: `${dayMeta.label} ${dayMeta.date} September · ${slot}`,
      staff: staff.name,
      place: place === 'video' ? 'Video · IST' : 'Atelier, Bandra',
      note,
      sms,
      gift,
      paid: service.id === 'consult' ? 'Complimentary' : service.price,
      status: 'upcoming',
    }
    setVisits((v) => [booking, ...v])
    setDone(booking)
  }

  const cancel = (id) => setVisits((rows) => rows.map((r) => (r.id === id ? { ...r, status: 'cancelled' } : r)))
  const joinWait = () => {
    const label = `${dayMeta.label} ${dayMeta.date} · ${slot}`
    if (!waitlist.includes(label)) setWaitlist((w) => [...w, label])
  }

  return (
    <DemoShell
      brand="Aptly"
      className="min-h-screen bg-[#f7f4ef] text-[#211c16] font-[family-name:var(--font-product)]"
      headerClass="border-[#211c16]/10 bg-[#f7f4ef]/90 text-[#211c16]"
      linkClass="text-[#211c16]/45 hover:text-[#211c16]"
    >
      <div className="relative h-[42vh] min-h-[280px] overflow-hidden">
        <img src={hero} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ef] via-transparent to-black/10" />
        <div className="absolute bottom-8 left-0 right-0 mx-auto max-w-6xl px-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#6b4f3a]">Atelier hours</p>
          <h1 className="mt-2 font-[family-name:var(--font-editorial)] text-5xl leading-none lg:text-6xl">
            Book a quiet hour.
          </h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[1fr_360px] lg:px-8">
        {done ? (
          <div className="rounded-3xl border border-[#211c16]/10 bg-white p-10 lg:col-span-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <Check size={20} />
            </div>
            <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-[#6b4f3a]">Confirmed</p>
            <h2 className="mt-2 font-[family-name:var(--font-editorial)] text-4xl">You’re booked.</h2>
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between gap-6"><dt className="text-[#211c16]/45">When</dt><dd>{done.when}</dd></div>
              <div className="flex justify-between gap-6"><dt className="text-[#211c16]/45">Session</dt><dd>{done.service}</dd></div>
              <div className="flex justify-between gap-6"><dt className="text-[#211c16]/45">With</dt><dd>{done.staff}</dd></div>
              <div className="flex justify-between gap-6"><dt className="text-[#211c16]/45">Where</dt><dd>{done.place}</dd></div>
              <div className="flex justify-between gap-6"><dt className="text-[#211c16]/45">Paid</dt><dd>{done.paid}</dd></div>
              {done.gift && <div className="flex justify-between gap-6"><dt className="text-[#211c16]/45">Gift</dt><dd>Receipt to the recipient</dd></div>}
              {done.sms && <div className="flex justify-between gap-6"><dt className="text-[#211c16]/45">Reminders</dt><dd>Email + SMS, 24h before</dd></div>}
            </dl>
            <p className="mt-6 text-sm leading-7 text-[#211c16]/65">
              A note will go to {done.email || done.name}. Bring references if you have them — otherwise we start from the brief.
            </p>
            <button
              type="button"
              onClick={() => { setDone(null); setName(''); setEmail(''); setNote('') }}
              className="mt-8 text-sm underline decoration-[#211c16]/30 underline-offset-4"
            >
              Book another time
            </button>
          </div>
        ) : (
          <>
            <div>
              <ol className="mb-8 flex gap-2 text-[11px] uppercase tracking-[0.18em] text-[#211c16]/35">
                <li className="text-[#6b4f3a]">1. Service</li>
                <li>2. Time</li>
                <li>3. Confirm</li>
              </ol>
              <div className="grid gap-3">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setService(s)}
                    className={`rounded-2xl border px-5 py-4 text-left ${
                      service.id === s.id ? 'border-[#211c16] bg-white' : 'border-[#211c16]/10 bg-white/50'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-[family-name:var(--font-editorial)] text-2xl">{s.name}</p>
                      <p className="text-[13px]">{s.price}</p>
                    </div>
                    <p className="mt-2 text-[13px] leading-6 text-[#211c16]/55">{s.blurb}</p>
                    <p className="mt-2 text-[12px] text-[#211c16]/40">{s.mins} minutes</p>
                  </button>
                ))}
              </div>

              <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-[#6b4f3a]">With</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {STAFF.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStaff(s)}
                    className={`rounded-2xl px-4 py-4 text-left ${staff.id === s.id ? 'bg-[#211c16] text-[#f7f4ef]' : 'bg-white'}`}
                  >
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className={`mt-1 text-[12px] ${staff.id === s.id ? 'text-white/60' : 'text-[#211c16]/45'}`}>{s.role} · {s.note}</p>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex gap-2">
                {[
                  ['a', 'This week'],
                  ['b', 'Next week'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => { setWeek(id); setDay(id === 'a' ? 'wed' : 'wed2') }}
                    className={`rounded-full px-3 py-1.5 text-[12px] ${week === id ? 'bg-[#211c16] text-[#f7f4ef]' : 'border border-[#211c16]/15'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                {DAYS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDay(d.id)}
                    className={`flex h-20 w-16 flex-col items-center justify-center rounded-2xl ${
                      day === d.id ? 'bg-[#211c16] text-[#f7f4ef]' : 'bg-white'
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-widest opacity-60">{d.label}</span>
                    <span className="mt-1 font-[family-name:var(--font-editorial)] text-2xl leading-none">{d.date}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SLOTS.map((s) => {
                  const busy = taken.has(`${day}|${s}`)
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        setSlot(s)
                        if (moving) {
                          setVisits((rows) =>
                            rows.map((r) =>
                              r.id === moving
                                ? { ...r, when: `${dayMeta.label} ${dayMeta.date} September · ${s}` }
                                : r,
                            ),
                          )
                          setMoving(null)
                        }
                      }}
                      className={`rounded-xl py-3 text-sm tabular-nums ${
                        busy
                          ? 'cursor-not-allowed bg-white/40 text-[#211c16]/25 line-through'
                          : slot === s
                            ? 'bg-[#211c16] text-[#f7f4ef]'
                            : 'bg-white hover:bg-[#efe8dc]'
                      }`}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
              {isTaken && (
                <button type="button" onClick={joinWait} className="mt-4 text-[12px] underline decoration-[#211c16]/30 underline-offset-4">
                  Join waitlist for this slot
                </button>
              )}
              {moving && <p className="mt-4 text-[12px] text-[#6b4f3a]">Pick a new day and time to reschedule.</p>}
              {waitlist.length > 0 && (
                <p className="mt-3 text-[12px] text-[#211c16]/45">Waitlist: {waitlist.join(' · ')}</p>
              )}
            </div>

            <form onSubmit={submit} className="h-fit rounded-3xl bg-white p-8 shadow-[0_30px_80px_-40px_rgba(33,28,22,0.35)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#6b4f3a]">Confirm</p>
              <h2 className="mt-2 font-[family-name:var(--font-editorial)] text-3xl">
                {dayMeta.label} {dayMeta.date} · {slot}
              </h2>
              <p className="mt-2 text-sm text-[#211c16]/50">{service.name} with {staff.name}</p>
              {isTaken && <p className="mt-4 text-sm text-rose-700">That slot just filled. Choose another.</p>}

              <div className="mt-6 grid grid-cols-2 gap-2">
                {[
                  ['video', 'Video'],
                  ['atelier', 'Atelier'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPlace(id)}
                    className={`rounded-full py-2 text-[12px] ${place === id ? 'bg-[#211c16] text-[#f7f4ef]' : 'border border-[#211c16]/15'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="mt-3 inline-flex items-center gap-3 text-[12px] text-[#211c16]/45">
                <span className="inline-flex items-center gap-1"><Clock size={12} /> {service.mins} min</span>
                <span className="inline-flex items-center gap-1"><MapPin size={12} /> {place === 'video' ? 'Video · IST' : 'Bandra West'}</span>
              </p>

              <label className="mt-8 block text-[12px] tracking-wide">
                Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2 w-full border-b border-[#211c16]/20 bg-transparent py-2 text-sm outline-none"
                />
              </label>
              <label className="mt-6 block text-[12px] tracking-wide">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full border-b border-[#211c16]/20 bg-transparent py-2 text-sm outline-none"
                />
              </label>
              <label className="mt-6 block text-[12px] tracking-wide">
                Note for the studio
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="What should we look at?"
                  className="mt-2 w-full resize-none border-b border-[#211c16]/20 bg-transparent py-2 text-sm outline-none placeholder:text-[#211c16]/30"
                />
              </label>
              <label className="mt-6 flex items-center justify-between text-[12px]">
                SMS + email reminder
                <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} />
              </label>
              <label className="mt-3 flex items-center justify-between text-[12px]">
                Gift this hour
                <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} />
              </label>
              {service.id !== 'consult' && (
                <p className="mt-4 text-[12px] text-[#211c16]/45">Charged on confirm · {service.price} · demo card ending 4242</p>
              )}
              <button
                type="submit"
                disabled={isTaken}
                className="mt-8 w-full rounded-full bg-[#211c16] py-3.5 text-sm text-[#f7f4ef] disabled:opacity-30"
              >
                {service.id === 'consult' ? 'Confirm booking' : `Pay ${service.price} & confirm`}
              </button>
            </form>
          </>
        )}

        <aside className="lg:col-span-2">
          <div className="rounded-3xl border border-[#211c16]/10 bg-white p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="inline-flex items-center gap-2 font-[family-name:var(--font-editorial)] text-2xl">
                <Calendar size={18} /> Your visits
              </h3>
              <p className="text-[12px] text-[#211c16]/40">{upcoming.length} upcoming</p>
            </div>
            {visits.length === 0 ? (
              <p className="mt-6 text-sm text-[#211c16]/50">Nothing on the board yet.</p>
            ) : (
              <ul className="mt-6 divide-y divide-[#211c16]/10">
                {visits.map((v) => (
                  <li key={v.id} className="flex flex-wrap items-center justify-between gap-3 py-4 text-sm">
                    <div>
                      <p className={v.status === 'cancelled' ? 'text-[#211c16]/35 line-through' : ''}>{v.when}</p>
                      <p className="mt-1 inline-flex items-center gap-3 text-[12px] text-[#211c16]/45">
                        <span>{v.service}</span>
                        <span className="inline-flex items-center gap-1"><User size={11} /> {v.staff}</span>
                      </p>
                    </div>
                    {v.status === 'upcoming' ? (
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setMoving(v.id)} className="text-[12px] text-[#211c16]/45 hover:text-[#211c16]">
                          Reschedule
                        </button>
                        <button type="button" onClick={() => cancel(v.id)} className="inline-flex items-center gap-1 text-[12px] text-[#211c16]/45 hover:text-[#211c16]">
                          <X size={12} /> Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="text-[12px] uppercase tracking-wide text-[#211c16]/30">Cancelled</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </DemoShell>
  )
}
