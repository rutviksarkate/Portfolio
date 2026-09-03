import { Check, Circle, Clock, MessageSquare, Play, RotateCcw, Send, Trophy, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import DemoShell from './DemoShell.jsx'

const PROBLEMS = [
  {
    id: 'pair-sum',
    title: 'Pair Sum',
    difficulty: 'Easy',
    time: '15m',
    acceptance: '72%',
    prompt: 'Given an integer array and a target, return whether any two distinct values sum to the target.',
    constraints: '1 ≤ n ≤ 10⁵. Values fit in a 32-bit signed integer.',
    example: 'nums = [2, 7, 11, 15], target = 9 → true',
    code: `function solve(nums, target) {
  const seen = new Set()
  for (const n of nums) {
    if (seen.has(target - n)) return true
    seen.add(n)
  }
  return false
}`,
    tests: [
      { name: 'Basic pair', args: [[2, 7, 11, 15], 9], expected: true },
      { name: 'No pair', args: [[1, 2, 3], 7], expected: false },
      { name: 'Negatives', args: [[-3, 1, 4], 1], expected: true },
    ],
    hidden: [
      { name: 'Hidden zeros', args: [[0, 0], 0], expected: true },
      { name: 'Hidden single', args: [[9], 9], expected: false },
    ],
  },
  {
    id: 'longest-streak',
    title: 'Longest Streak',
    difficulty: 'Medium',
    time: '25m',
    acceptance: '54%',
    prompt: 'Return the longest run of identical characters in a string. Treat the empty string as 0.',
    constraints: '0 ≤ |s| ≤ 10⁵. ASCII letters only.',
    example: '"aaabbaccc" → 3',
    code: `function solve(s) {
  let best = 0, run = 0, prev = ''
  for (const ch of s) {
    run = ch === prev ? run + 1 : 1
    prev = ch
    best = Math.max(best, run)
  }
  return best
}`,
    tests: [
      { name: 'Repeating block', args: ['aaabbaccc'], expected: 3 },
      { name: 'All unique', args: ['abc'], expected: 1 },
      { name: 'Mixed case', args: ['aAa'], expected: 1 },
    ],
    hidden: [
      { name: 'Hidden empty', args: [''], expected: 0 },
      { name: 'Hidden long run', args: ['bbbbb'], expected: 5 },
    ],
  },
  {
    id: 'route-window',
    title: 'Route Window',
    difficulty: 'Medium',
    time: '30m',
    acceptance: '41%',
    prompt: 'Given sorted delivery timestamps, return the smallest window that covers k stops.',
    constraints: '1 ≤ k ≤ n ≤ 10⁵. times is strictly increasing.',
    example: 'times = [1, 3, 6, 10], k = 3 → 7',
    code: `function solve(times, k) {
  let best = Infinity
  for (let i = 0; i + k - 1 < times.length; i++) {
    best = Math.min(best, times[i + k - 1] - times[i])
  }
  return best
}`,
    tests: [
      { name: 'Sorted times', args: [[1, 3, 6, 10], 3], expected: 7 },
      { name: 'k larger than n', args: [[1, 2], 3], expected: Infinity },
      { name: 'Sparse gaps', args: [[1, 100, 101, 102], 3], expected: 2 },
    ],
    hidden: [
      { name: 'Hidden k=1', args: [[4, 8, 15], 1], expected: 0 },
    ],
  },
  {
    id: 'stable-bridge',
    title: 'Stable Bridge',
    difficulty: 'Hard',
    time: '45m',
    acceptance: '28%',
    prompt: 'Compute the minimum cost to connect islands with at most one redundant edge. Isolated nodes are allowed only if n = 1.',
    constraints: '1 ≤ n ≤ 10⁴. 0 ≤ |edges| ≤ 2·10⁴.',
    example: 'See fixtures in the hidden tests.',
    code: `function solve(n, edges) {
  // union-find sketch
  return 0
}`,
    tests: [
      { name: 'Tree input', args: [3, [[0, 1, 4], [1, 2, 5]]], expected: 9 },
      { name: 'Already cyclic', args: [3, [[0, 1, 1], [1, 2, 1], [0, 2, 3]]], expected: 2 },
      { name: 'Disconnected', args: [3, [[0, 1, 2]]], expected: -1 },
    ],
    hidden: [
      { name: 'Hidden single node', args: [1, []], expected: 0 },
    ],
  },
]

const DISCUSS = {
  'pair-sum': [
    { user: 'A. Shah', text: 'Hash set is O(n). Two pointers after sort is cleaner if you may mutate.' },
    { user: 'M. Chen', text: 'Watch for the same index twice. Distinct means i !== j.' },
  ],
  'longest-streak': [
    { user: 'L. Iyer', text: 'Mixed case failed for me until I compared with toLowerCase.' },
  ],
  'route-window': [
    { user: 'R. Novak', text: 'Sliding window on sorted times. If k > n return 0 or inf — check the statement.' },
  ],
  'stable-bridge': [
    { user: 'S. Okonkwo', text: 'Kruskal plus one extra cheapest unused edge. Isolated nodes only if n = 1.' },
  ],
}

const EDITORIAL = {
  'pair-sum': 'Scan once. For each value, look up target − n in a set of values already seen, then insert n.',
  'longest-streak': 'Track the current run. Reset when the character changes. Empty string is 0.',
  'route-window': 'Because times are sorted, the window of k consecutive stops is times[i+k-1] − times[i]. Take the min.',
  'stable-bridge': 'Minimum spanning tree, then consider the cheapest unused edge as the single redundant link.',
}

const BOARD = [
  { name: 'A. Shah', score: 2140, solved: 4, delta: '+42', penalty: '01:04' },
  { name: 'M. Chen', score: 2088, solved: 4, delta: '+18', penalty: '01:11' },
  { name: 'You', score: 1964, solved: 3, delta: '+64', penalty: '00:58' },
  { name: 'L. Iyer', score: 1910, solved: 3, delta: '-12', penalty: '01:22' },
  { name: 'R. Novak', score: 1872, solved: 3, delta: '+9', penalty: '01:19' },
  { name: 'S. Okonkwo', score: 1804, solved: 2, delta: '+21', penalty: '00:41' },
]

const tone = {
  Easy: 'text-emerald-400 bg-emerald-400/10',
  Medium: 'text-amber-300 bg-amber-300/10',
  Hard: 'text-rose-400 bg-rose-400/10',
}

function same(a, b) {
  if (Object.is(a, b)) return true
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch {
    return false
  }
}

function show(value) {
  if (value === undefined) return 'undefined'
  if (typeof value === 'number' && !Number.isFinite(value)) return String(value)
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function loadSolve(source) {
  const wrapped = `"use strict";\n${source}\n;if (typeof solve !== "function") throw new Error("Define function solve");\nreturn solve;`
  return new Function(wrapped)()
}

function judge(source, cases) {
  let solve
  try {
    solve = loadSolve(source)
  } catch (err) {
    const message = err instanceof SyntaxError ? `SyntaxError: ${err.message}` : err.message
    return {
      compileError: message,
      results: cases.map((t) => ({ name: t.name, pass: false, ms: 0, error: message })),
    }
  }

  const results = cases.map((t) => {
    const start = performance.now()
    try {
      const got = solve(...t.args)
      const ms = Math.max(1, Math.round(performance.now() - start))
      return {
        name: t.name,
        pass: same(got, t.expected),
        ms,
        got,
        expected: t.expected,
      }
    } catch (err) {
      return { name: t.name, pass: false, ms: 1, error: err.message }
    }
  })
  return { compileError: null, results }
}

function parseStdin(problemId, text) {
  const lines = text.replace(/\\n/g, '\n').split('\n').map((l) => l.trim()).filter(Boolean)
  if (lines.length === 0) throw new Error('stdin is empty')
  if (problemId === 'pair-sum') {
    return [JSON.parse(lines[0]), Number(lines[1])]
  }
  if (problemId === 'longest-streak') {
    return [lines.join('\n').replace(/^"|"$/g, '')]
  }
  if (problemId === 'route-window') {
    return [JSON.parse(lines[0]), Number(lines[1])]
  }
  if (problemId === 'stable-bridge') {
    return [Number(lines[0]), JSON.parse(lines[1] || '[]')]
  }
  return [JSON.parse(lines[0])]
}

function formatClock(total) {
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

export default function ForgeArena() {
  const [active, setActive] = useState(PROBLEMS[0])
  const [code, setCode] = useState(PROBLEMS[0].code)
  const [ran, setRan] = useState(false)
  const [results, setResults] = useState([])
  const [compileError, setCompileError] = useState('')
  const [tab, setTab] = useState('workspace')
  const [running, setRunning] = useState(false)
  const [busy, setBusy] = useState('')
  const [lang, setLang] = useState('JavaScript')
  const [seconds, setSeconds] = useState(72 * 60 + 8)
  const [solved, setSolved] = useState(['pair-sum'])
  const [pane, setPane] = useState('prompt')
  const [diff, setDiff] = useState('All')
  const [stdin, setStdin] = useState('[2, 7, 11, 15]\n9')
  const [stdout, setStdout] = useState('')
  const [boardTab, setBoardTab] = useState('global')
  const [subs, setSubs] = useState([
    { id: 1, problem: 'Pair Sum', verdict: 'Accepted', time: '00:12:04', lang: 'JavaScript' },
  ])

  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(id)
  }, [])

  const open = (p) => {
    setActive(p)
    setCode(p.code)
    setRan(false)
    setResults([])
    setCompileError('')
    setBusy('')
    setPane('prompt')
    setStdout('')
  }

  const run = () => {
    setRunning(true)
    setBusy('')
    window.setTimeout(() => {
      const judged = judge(code, active.tests)
      setCompileError(judged.compileError || '')
      setResults(judged.results)
      setRan(true)
      setRunning(false)
      try {
        const args = parseStdin(active.id, stdin)
        const solve = loadSolve(code)
        const got = solve(...args)
        setStdout(show(got))
      } catch (err) {
        setStdout(err instanceof SyntaxError ? `SyntaxError: ${err.message}` : err.message)
      }
    }, 400)
  }

  const submit = () => {
    setBusy('submit')
    window.setTimeout(() => {
      const judged = judge(code, [...active.tests, ...(active.hidden || [])])
      setCompileError(judged.compileError || '')
      setResults(judged.results)
      setRan(true)
      const ok = !judged.compileError && judged.results.every((t) => t.pass)
      const verdict = judged.compileError ? 'Compile Error' : ok ? 'Accepted' : 'Wrong Answer'
      if (ok) setSolved((s) => (s.includes(active.id) ? s : [...s, active.id]))
      setSubs((rows) => [
        { id: rows.length + 1, problem: active.title, verdict, time: formatClock(90 * 60 - seconds), lang },
        ...rows,
      ])
      setBusy('')
      setTab('submissions')
    }, 800)
  }

  return (
    <DemoShell brand="FORGE" className="min-h-screen bg-[#0b0d12] text-zinc-200 font-[family-name:var(--font-product)]">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 rounded-lg bg-white/5 p-1">
              {['workspace', 'submissions', 'standings'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`rounded-md px-3 py-1.5 text-xs capitalize ${tab === t ? 'bg-white/10 text-white' : 'text-zinc-500'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="hidden text-[12px] text-zinc-500 md:block">Weekly #38 · Rated</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[12px] text-amber-200">
              <Clock size={12} /> {formatClock(seconds)}
            </span>
            {tab === 'workspace' && (
              <>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="rounded-md border border-white/10 bg-[#12151c] px-2 py-1.5 text-xs outline-none"
                >
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>C++</option>
                </select>
                <button
                  type="button"
                  onClick={() => { setCode(active.code); setRan(false); setResults([]); setCompileError(''); setStdout('') }}
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs text-zinc-400"
                >
                  <RotateCcw size={12} /> Reset
                </button>
                <button
                  type="button"
                  onClick={run}
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-xs text-zinc-200"
                >
                  <Play size={12} fill="currentColor" /> {running ? 'Running…' : 'Run'}
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={busy === 'submit'}
                  className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-medium text-emerald-950 disabled:opacity-50"
                >
                  <Send size={12} /> {busy === 'submit' ? 'Judging…' : 'Submit'}
                </button>
              </>
            )}
          </div>
        </div>

        {tab === 'standings' ? (
          <div className="mx-auto w-full max-w-3xl overflow-auto p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-amber-200">
                <Trophy size={18} />
                <h1 className="text-lg font-semibold">Weekly standings</h1>
              </div>
              <div className="flex rounded-lg bg-white/5 p-1">
                {['global', 'friends'].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setBoardTab(id)}
                    className={`rounded-md px-3 py-1 text-xs capitalize ${boardTab === id ? 'bg-white/10 text-white' : 'text-zinc-500'}`}
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
            <ol className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
              {(boardTab === 'friends' ? BOARD.filter((r) => ['You', 'A. Shah', 'M. Chen'].includes(r.name)) : BOARD).map((row, i) => (
                <li key={row.name} className={`grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-5 py-4 text-sm ${row.name === 'You' ? 'bg-white/5' : ''}`}>
                  <span className="w-6 text-zinc-500">{i + 1}</span>
                  <span>{row.name}</span>
                  <span className="text-xs text-zinc-500">{row.solved} solved</span>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-zinc-500">{row.penalty}</span>
                  <span>
                    <span className="tabular-nums">{row.score}</span>
                    <span className={`ml-3 text-xs ${row.delta.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{row.delta}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ) : tab === 'submissions' ? (
          <div className="mx-auto w-full max-w-3xl overflow-auto p-8">
            <h1 className="text-lg font-semibold">Your submissions</h1>
            <p className="mt-1 text-sm text-zinc-500">Hidden tests run on submit. Sample cases stay local.</p>
            <ul className="mt-6 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
              {subs.map((row) => (
                <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm">
                  <div>
                    <p className="font-medium">{row.problem}</p>
                    <p className="mt-1 font-[family-name:var(--font-mono)] text-[11px] text-zinc-500">{row.lang} · {row.time}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs ${row.verdict === 'Accepted' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'}`}>
                    {row.verdict}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 lg:grid-cols-[260px_1fr_300px]">
            <div className="min-h-0 overflow-auto border-r border-white/10 p-3">
              <div className="mb-2 flex flex-wrap gap-1">
                {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDiff(d)}
                    className={`rounded-md px-2 py-1 text-[10px] ${diff === d ? 'bg-white/10 text-white' : 'text-zinc-500'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              {PROBLEMS.filter((p) => diff === 'All' || p.difficulty === diff).map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => open(p)}
                  className={`mb-1 w-full rounded-xl px-3 py-3 text-left ${
                    active.id === p.id ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">
                      <span className="mr-2 text-zinc-500">{i + 1}.</span>
                      {p.title}
                    </p>
                    {solved.includes(p.id) ? <Check size={14} className="text-emerald-400" /> : <span className={`rounded-full px-2 py-0.5 text-[10px] ${tone[p.difficulty]}`}>{p.difficulty}</span>}
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-500">{p.time} · {p.acceptance} solved</p>
                </button>
              ))}
            </div>

            <div className="flex min-h-0 flex-col">
              <div className="border-b border-white/10 px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">{active.title}</h2>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${tone[active.difficulty]}`}>{active.difficulty}</span>
                </div>
                <div className="mt-3 flex gap-1">
                  {['prompt', 'discussion', 'editorial'].map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPane(id)}
                      className={`rounded-md px-2.5 py-1 text-[11px] capitalize ${pane === id ? 'bg-white/10 text-white' : 'text-zinc-500'}`}
                    >
                      {id === 'discussion' ? <span className="inline-flex items-center gap-1"><MessageSquare size={10} /> Discussion</span> : id}
                    </button>
                  ))}
                </div>
                {pane === 'prompt' && (
                  <>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{active.prompt}</p>
                    <p className="mt-3 text-[12px] text-zinc-500">{active.constraints}</p>
                    <p className="mt-3 font-[family-name:var(--font-mono)] text-[11px] text-zinc-500">{active.example}</p>
                  </>
                )}
                {pane === 'discussion' && (
                  <ul className="mt-4 space-y-3">
                    {(DISCUSS[active.id] || []).map((d) => (
                      <li key={d.text} className="text-sm">
                        <p className="text-[11px] text-zinc-500">{d.user}</p>
                        <p className="mt-1 text-zinc-300">{d.text}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {pane === 'editorial' && (
                  <p className="mt-4 text-sm leading-6 text-zinc-300">
                    {solved.includes(active.id) ? EDITORIAL[active.id] : 'Editorial unlocks after an accepted submit.'}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 border-b border-white/10 bg-[#12151c] px-4 py-2 text-[11px] text-zinc-500">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 font-[family-name:var(--font-mono)]">solve.{lang === 'Python' ? 'py' : lang === 'C++' ? 'cpp' : 'js'}</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="min-h-0 flex-1 resize-none bg-[#0e1117] p-4 font-[family-name:var(--font-mono)] text-[12px] leading-6 text-zinc-300 outline-none"
              />
            </div>

            <div className="min-h-0 overflow-auto border-l border-white/10 bg-[#0e1117] p-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Test runner</p>
              {!ran && !running && (
                <p className="mt-6 text-sm text-zinc-500">Run sample cases locally, then submit to the judge. Hidden tests stay on the server.</p>
              )}
              {running && <p className="mt-6 text-sm text-amber-200">Executing 3 sample cases…</p>}
              {busy === 'submit' && <p className="mt-6 text-sm text-amber-200">Running hidden tests…</p>}
              {ran && (
                <>
                  {compileError && (
                    <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 font-[family-name:var(--font-mono)] text-[11px] text-rose-300">
                      {compileError}
                    </pre>
                  )}
                  <ul className="mt-5 space-y-2">
                    {results.map((t) => (
                      <li key={t.name} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2">
                            {t.pass ? <Check size={14} className="text-emerald-400" /> : <X size={14} className="text-rose-400" />}
                            {t.name}
                          </span>
                          <span className="font-[family-name:var(--font-mono)] text-[11px] text-zinc-500">{t.ms}ms</span>
                        </div>
                        {!t.pass && (
                          <p className="mt-2 font-[family-name:var(--font-mono)] text-[11px] text-rose-300/90">
                            {t.error ? t.error : `expected ${show(t.expected)}, got ${show(t.got)}`}
                          </p>
                        )}
                      </li>
                    ))}
                    <li className="pt-2 text-xs text-zinc-500">
                      {results.filter((t) => t.pass).length}/{results.length} tests passed
                    </li>
                  </ul>
                </>
              )}
              <label className="mt-6 block text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Custom stdin
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-[#0b0d12] p-2 font-[family-name:var(--font-mono)] text-[11px] text-zinc-300 outline-none"
                />
              </label>
              {stdout && (
                <pre className={`mt-3 rounded-lg border border-white/10 bg-black/40 p-3 font-[family-name:var(--font-mono)] text-[11px] ${compileError || /Error/.test(stdout) ? 'text-rose-300' : 'text-emerald-300'}`}>{stdout}</pre>
              )}
              <div className="mt-8 rounded-xl border border-white/10 p-3 text-[11px] leading-5 text-zinc-500">
                <Circle size={10} className="mb-2 inline text-emerald-400" /> Contest clock is live. Submitting records a verdict on the Submissions tab.
              </div>
            </div>
          </div>
        )}
      </div>
    </DemoShell>
  )
}
