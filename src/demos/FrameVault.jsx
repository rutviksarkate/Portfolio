import { Clock, Download, Heart, Pause, Play, Plus, Star, Subtitles, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import amber from '../assets/demos/film-amber.png'
import circuit from '../assets/demos/film-circuit.png'
import harbor from '../assets/demos/film-harbor.png'
import north from '../assets/demos/film-north.png'
import orbit from '../assets/demos/film-orbit.png'
import paper from '../assets/demos/film-paper.png'
import radio from '../assets/demos/film-radio.png'
import tide from '../assets/demos/film-tide.png'
import DemoShell from './DemoShell.jsx'

const FILMS = [
  { id: 'north-line', title: 'The North Line', year: 2024, genre: 'Drama', rating: 8.2, runtime: '1h 58m', plot: 'A cartographer returns home to redraw a border that never existed.', poster: north, director: 'Ines Calder', cast: 'Maya Sen, Eliot Ward, Noor Ali', progress: 62, captions: { English: 'The border was never on any map.', Español: 'La frontera nunca estuvo en ningún mapa.' } },
  { id: 'glass-harbor', title: 'Glass Harbor', year: 2023, genre: 'Thriller', rating: 7.6, runtime: '2h 04m', plot: 'A night ferry, a missing passenger, and a city that refuses to look.', poster: harbor, director: 'Marc Ellison', cast: 'Ruth Hale, Kenji Ito', progress: 18, captions: { English: 'A city that refuses to look.', Español: 'Una ciudad que se niega a mirar.' } },
  { id: 'quiet-circuit', title: 'Quiet Circuit', year: 2025, genre: 'Sci-Fi', rating: 8.7, runtime: '2h 12m', plot: 'An engineer traces a signal that only plays when the power is off.', poster: circuit, director: 'Hana Mori', cast: 'Jun Park, Adele Voss', progress: 0, captions: { English: 'The signal only plays when the power is off.', Español: 'La señal solo suena cuando se apaga la luz.' } },
  { id: 'amber-room', title: 'Amber Room', year: 2022, genre: 'Mystery', rating: 7.9, runtime: '1h 47m', plot: 'An archivist finds a room that is larger on the inside every morning.', poster: amber, director: 'Leo Voss', cast: 'Clara Nune, Tom Rye', progress: 0, captions: { English: 'The room is larger every morning.', Español: 'La habitación es más grande cada mañana.' } },
  { id: 'second-tide', title: 'Second Tide', year: 2024, genre: 'Drama', rating: 8.0, runtime: '1h 52m', plot: 'Two siblings run a boatyard while the sea keeps taking the shoreline.', poster: tide, director: 'Ines Calder', cast: 'Sam Ori, Lila Chen', progress: 40, captions: { English: 'The sea keeps taking the shoreline.', Español: 'El mar se sigue llevando la orilla.' } },
  { id: 'low-orbit', title: 'Low Orbit', year: 2025, genre: 'Sci-Fi', rating: 8.4, runtime: '2h 21m', plot: 'A maintenance crew on a dying station has to choose who gets to leave.', poster: orbit, director: 'Hana Mori', cast: 'Idris Cole, Yuna Kim', progress: 0, captions: { English: 'Someone has to stay behind.', Español: 'Alguien tiene que quedarse.' } },
  { id: 'paper-city', title: 'Paper City', year: 2021, genre: 'Mystery', rating: 7.4, runtime: '1h 41m', plot: 'A forger is hired to copy a map of a neighborhood that is not on any map.', poster: paper, director: 'Sofia Renn', cast: 'Paul Neri, Anika Shah', progress: 0, captions: { English: 'This neighborhood is not on any map.', Español: 'Este barrio no está en ningún mapa.' } },
  { id: 'cold-radio', title: 'Cold Radio', year: 2023, genre: 'Thriller', rating: 7.8, runtime: '1h 55m', plot: 'A late-night host starts receiving requests from listeners who are already dead.', poster: radio, director: 'Marc Ellison', cast: 'Helen Marsh, Owen Pike', progress: 88, captions: { English: 'The callers are already dead.', Español: 'Quienes llaman ya están muertos.' } },
]

const GENRES = ['All', 'Drama', 'Thriller', 'Sci-Fi', 'Mystery']

const PROFILES = [
  { id: 'rutvik', name: 'Rutvik', hint: '4K · Matched' },
  { id: 'guest', name: 'Guest', hint: 'Kids off' },
]

export default function FrameVault() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [saved, setSaved] = useState(['quiet-circuit', 'low-orbit', 'north-line'])
  const [downloads, setDownloads] = useState(['cold-radio'])
  const [ratings, setRatings] = useState({ 'quiet-circuit': 5 })
  const [active, setActive] = useState(FILMS[2])
  const [screen, setScreen] = useState('browse')
  const [trailer, setTrailer] = useState(false)
  const [watching, setWatching] = useState(null)
  const [paused, setPaused] = useState(false)
  const [quality, setQuality] = useState('4K')
  const [subs, setSubs] = useState('Off')
  const [profile, setProfile] = useState(PROFILES[0])

  const list = useMemo(
    () =>
      FILMS.filter((f) => {
        const g = genre === 'All' || f.genre === genre
        const q = f.title.toLowerCase().includes(query.toLowerCase()) || f.director.toLowerCase().includes(query.toLowerCase())
        return g && q
      }),
    [genre, query],
  )

  const continueWatching = FILMS.filter((f) => f.progress > 0)
  const myList = FILMS.filter((f) => saved.includes(f.id))
  const offline = FILMS.filter((f) => downloads.includes(f.id))
  const topRated = [...FILMS].sort((a, b) => b.rating - a.rating).slice(0, 4)
  const similar = FILMS.filter((f) => f.genre === active.genre && f.id !== active.id).slice(0, 4)

  const toggle = (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const toggleDl = (id) => setDownloads((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const openTitle = (film) => {
    setActive(film)
    setScreen('title')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <DemoShell
      brand="FRAMEVAULT"
      className="min-h-screen cursor-default bg-[#0a0908] text-[#f3ece3] font-[family-name:var(--font-product)] [&_a]:cursor-pointer [&_button]:cursor-pointer"
      headerClass="border-white/10 bg-[#0a0908]/80 text-[#f3ece3]"
    >
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 text-[13px] lg:px-8">
          <nav className="flex gap-6">
            {[
              ['browse', 'Browse'],
              ['list', 'My list'],
              ['downloads', 'Downloads'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setScreen(id)}
                className={screen === id || (screen === 'title' && id === 'browse') ? 'text-[#f3ece3]' : 'text-[#f3ece3]/40 hover:text-[#f3ece3]'}
              >
                {label}
                {id === 'list' && <span className="ml-2 tabular-nums text-[#f3ece3]/40">{saved.length}</span>}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {PROFILES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProfile(p)}
                className={`rounded-full px-3 py-1 text-[12px] ${profile.id === p.id ? 'bg-[#f3ece3] text-[#0a0908]' : 'text-[#f3ece3]/40'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {screen === 'downloads' ? (
        <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-8">
          <h1 className="font-[family-name:var(--font-editorial)] text-5xl">Downloads</h1>
          <p className="mt-3 max-w-lg text-sm text-[#f3ece3]/55">{profile.name} · available offline on this household.</p>
          {offline.length === 0 ? (
            <p className="mt-16 text-sm text-[#f3ece3]/45">Nothing queued. Download from a title page.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {offline.map((film) => (
                <TitleCard key={film.id} film={film} onOpen={openTitle} saved={saved.includes(film.id)} onToggle={toggle} />
              ))}
            </div>
          )}
        </div>
      ) : screen === 'list' ? (
        <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-8">
          <h1 className="font-[family-name:var(--font-editorial)] text-5xl">Saved for later</h1>
          <p className="mt-3 max-w-lg text-sm text-[#f3ece3]/55">Titles you marked stay on this house list until you remove them.</p>
          {myList.length === 0 ? (
            <p className="mt-16 text-sm text-[#f3ece3]/45">Your list is empty. Add something from Browse.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {myList.map((film) => (
                <TitleCard key={film.id} film={film} onOpen={openTitle} saved onToggle={toggle} />
              ))}
            </div>
          )}
        </div>
      ) : screen === 'title' ? (
        <TitlePage
          film={active}
          savedIds={saved}
          similar={similar}
          onBack={() => setScreen('browse')}
          onToggle={toggle}
          onTrailer={() => setTrailer(true)}
          onPlay={() => { setWatching(active); setPaused(false) }}
          onDownload={() => toggleDl(active.id)}
          downloaded={downloads.includes(active.id)}
          rating={ratings[active.id] || 0}
          onRate={(n) => setRatings((r) => ({ ...r, [active.id]: n }))}
          onOpen={openTitle}
        />
      ) : (
        <>
          <section className="relative min-h-[72vh] overflow-hidden">
            <img src={active.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/55 to-[#0a0908]/20" />
            <div className="relative mx-auto flex min-h-[72vh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-32 lg:px-8">
              <p className="text-[11px] uppercase tracking-[0.32em] text-amber-200/80">Featured tonight</p>
              <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-editorial)] text-6xl leading-[0.95] lg:text-8xl">
                {active.title}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#f3ece3]/75">{active.plot}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-[#f3ece3]/60">
                <span>{active.year}</span>
                <span>{active.genre}</span>
                <span className="inline-flex items-center gap-1"><Clock size={13} /> {active.runtime}</span>
                <span>{active.rating} · Critic score</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => { setWatching(active); setPaused(false) }} className="inline-flex items-center gap-2 bg-[#f3ece3] px-5 py-3 text-sm text-[#0a0908]">
                  <Play size={14} fill="currentColor" /> Play
                </button>
                <button type="button" onClick={() => setTrailer(true)} className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm">
                  Trailer
                </button>
                <button type="button" onClick={() => openTitle(active)} className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm">
                  Details
                </button>
                <button type="button" onClick={() => toggle(active.id)} className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm">
                  <Heart size={14} fill={saved.includes(active.id) ? 'currentColor' : 'none'} />
                  {saved.includes(active.id) ? 'In your list' : 'Add to list'}
                </button>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-8">
            {continueWatching.length > 0 && (
              <Row title="Continue watching">
                {continueWatching.map((film) => (
                  <button key={film.id} type="button" onClick={() => openTitle(film)} className="group min-w-[220px] flex-1 text-left sm:min-w-[240px]">
                    <div className="relative aspect-video overflow-hidden bg-zinc-900">
                      <img src={film.poster} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
                        <div className="h-full bg-amber-200" style={{ width: `${film.progress}%` }} />
                      </div>
                    </div>
                    <p className="mt-3 font-[family-name:var(--font-editorial)] text-xl">{film.title}</p>
                    <p className="text-[11px] text-[#f3ece3]/40">{film.progress}% watched</p>
                  </button>
                ))}
              </Row>
            )}

            <div className="mt-14">
              <Row title="Top rated this house">
                {topRated.map((film) => (
                  <button key={film.id} type="button" onClick={() => openTitle(film)} className="group min-w-[180px] text-left">
                    <div className="aspect-[3/4] overflow-hidden bg-zinc-900">
                      <img src={film.poster} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <p className="mt-3 font-[family-name:var(--font-editorial)] text-xl">{film.title}</p>
                    <p className="text-[11px] text-amber-200/70">{film.rating} critic</p>
                  </button>
                ))}
              </Row>
            </div>

            <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-[family-name:var(--font-editorial)] text-3xl">The collection</h2>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search titles or directors"
                className="w-full rounded-none border-b border-white/15 bg-transparent py-2 text-sm outline-none placeholder:text-zinc-600 sm:max-w-xs"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGenre(g)}
                  className={`px-3 py-1 text-[12px] tracking-wide ${
                    genre === g ? 'bg-[#f3ece3] text-[#0a0908]' : 'text-[#f3ece3]/50 hover:text-[#f3ece3]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((film) => (
                <TitleCard key={film.id} film={film} onOpen={openTitle} saved={saved.includes(film.id)} onToggle={toggle} />
              ))}
            </div>
          </div>
        </>
      )}

      {trailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5" onClick={() => setTrailer(false)}>
          <div className="relative w-full max-w-3xl overflow-hidden bg-black" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setTrailer(false)} className="absolute right-4 top-4 z-10 text-white/70 hover:text-white" aria-label="Close trailer">
              <X size={18} />
            </button>
            <div className="relative aspect-video">
              <img src={active.poster} alt="" className="h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                <Play size={42} fill="white" className="text-white" />
                <p className="mt-4 font-[family-name:var(--font-editorial)] text-3xl">{active.title}</p>
                <p className="mt-2 text-xs tracking-[0.2em] uppercase text-white/60">Official trailer · 2:14</p>
              </div>
              <div className="absolute inset-x-8 bottom-6">
                <div className="h-0.5 bg-white/20">
                  <div className="h-full w-1/5 bg-amber-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {watching && (
        <div className="fixed inset-0 z-50 bg-black text-white">
          <img src={watching.poster} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black via-black/20 to-black/40 p-6 lg:p-12">
            <div className="pointer-events-auto relative z-20 flex items-center justify-between gap-4">
              <button type="button" onClick={() => setWatching(null)} className="text-sm text-white/70 hover:text-white">
                ← Back
              </button>
              <div className="flex items-center gap-2 text-[12px] text-white/70">
                <PlayerMenu
                  icon={<Subtitles size={12} />}
                  value={subs}
                  options={['Off', 'English', 'Español']}
                  onChange={setSubs}
                />
                <PlayerMenu
                  value={quality}
                  options={['4K', '1080p', '720p']}
                  onChange={setQuality}
                />
              </div>
            </div>
            <div className="pointer-events-auto relative z-10">
              <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/80">{paused ? 'Paused' : 'Now playing'} · {quality}</p>
              <h2 className="mt-3 font-[family-name:var(--font-editorial)] text-5xl lg:text-7xl">{watching.title}</h2>
              {subs !== 'Off' && watching.captions?.[subs] && (
                <p className="mt-4 max-w-xl text-sm text-white/80">
                  <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-amber-200/70">{subs}</span>
                  “{watching.captions[subs]}”
                </p>
              )}
              <div className="mt-8 flex items-center gap-4">
                <button type="button" onClick={() => setPaused((p) => !p)} className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black" aria-label={paused ? 'Play' : 'Pause'}>
                  {paused ? <Play size={16} fill="currentColor" /> : <Pause size={16} />}
                </button>
                <div className="h-1 max-w-xl flex-1 bg-white/20">
                  <div className="h-full bg-amber-200" style={{ width: `${Math.max(watching.progress, 6)}%` }} />
                </div>
                <span className="font-[family-name:var(--font-mono)] text-xs text-white/50">{watching.runtime}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </DemoShell>
  )
}

function PlayerMenu({ value, options, onChange, icon }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[12px] text-white/80 hover:bg-white/10"
      >
        {icon}
        {value}
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul className="absolute right-0 top-full z-50 mt-2 min-w-[8.5rem] overflow-hidden rounded-xl border border-white/15 bg-[#0a0908] py-1 shadow-2xl">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt)
                    setOpen(false)
                  }}
                  className={`block w-full px-3 py-2 text-left text-[12px] ${
                    opt === value ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function Row({ title, children }) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-editorial)] text-3xl">{title}</h2>
      <div className="mt-6 flex gap-5 overflow-x-auto pb-2">{children}</div>
    </section>
  )
}

function TitleCard({ film, onOpen, saved, onToggle }) {
  return (
    <article className="group text-left">
      <button type="button" onClick={() => onOpen(film)} className="block w-full">
        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
          <img src={film.poster} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <p className="absolute bottom-3 left-3 font-[family-name:var(--font-editorial)] text-2xl leading-none">{film.title}</p>
        </div>
      </button>
      <div className="mt-3 flex items-start justify-between gap-3">
        <p className="text-[12px] tracking-wide text-[#f3ece3]/45">{film.director} · {film.year}</p>
        <button type="button" onClick={() => onToggle(film.id)} className="text-[#f3ece3]/50 hover:text-[#f3ece3]" aria-label={saved ? 'Remove from list' : 'Save'}>
          {saved ? <Heart size={14} fill="currentColor" /> : <Plus size={14} />}
        </button>
      </div>
    </article>
  )
}

function TitlePage({ film, savedIds, similar, onBack, onToggle, onTrailer, onPlay, onOpen, onDownload, downloaded, rating, onRate }) {
  const inList = savedIds.includes(film.id)
  return (
    <div>
      <div className="relative min-h-[60vh] overflow-hidden">
        <img src={film.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/70 to-black/20" />
        <div className="relative mx-auto max-w-[1400px] px-5 pb-12 pt-10 lg:px-8">
          <button type="button" onClick={onBack} className="text-[12px] tracking-wide text-[#f3ece3]/50 hover:text-[#f3ece3]">
            ← Browse
          </button>
          <div className="mt-16 grid items-end gap-10 lg:grid-cols-[280px_1fr]">
            <img src={film.poster} alt="" className="hidden aspect-[3/4] w-full object-cover lg:block" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/80">{film.genre} · {film.year}</p>
              <h1 className="mt-3 font-[family-name:var(--font-editorial)] text-6xl leading-[0.95] lg:text-7xl">{film.title}</h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#f3ece3]/75">{film.plot}</p>
              <dl className="mt-6 grid max-w-lg gap-2 text-[13px] text-[#f3ece3]/60 sm:grid-cols-2">
                <div><dt className="text-[#f3ece3]/35">Director</dt><dd>{film.director}</dd></div>
                <div><dt className="text-[#f3ece3]/35">Runtime</dt><dd>{film.runtime}</dd></div>
                <div className="sm:col-span-2"><dt className="text-[#f3ece3]/35">Cast</dt><dd>{film.cast}</dd></div>
              </dl>
              <div className="mt-5 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => onRate(n)} aria-label={`Rate ${n}`}>
                    <Star size={16} className={n <= rating ? 'text-amber-200' : 'text-white/25'} fill={n <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={onPlay} className="inline-flex items-center gap-2 bg-[#f3ece3] px-5 py-3 text-sm text-[#0a0908]">
                  <Play size={14} fill="currentColor" /> {film.progress ? 'Resume' : 'Play'}
                </button>
                <button type="button" onClick={onTrailer} className="border border-white/20 px-5 py-3 text-sm">Trailer</button>
                <button type="button" onClick={() => onToggle(film.id)} className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm">
                  <Heart size={14} fill={inList ? 'currentColor' : 'none'} /> {inList ? 'In your list' : 'Add to list'}
                </button>
                <button type="button" onClick={onDownload} className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm">
                  <Download size={14} /> {downloaded ? 'Remove download' : 'Download'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {similar.length > 0 && (
        <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-8">
          <h2 className="font-[family-name:var(--font-editorial)] text-3xl">More like this</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((f) => (
              <TitleCard key={f.id} film={f} onOpen={onOpen} saved={savedIds.includes(f.id)} onToggle={onToggle} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
