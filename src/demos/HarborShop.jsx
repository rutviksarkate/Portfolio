import { Check, Heart, Lock, Minus, Plus, ShoppingBag, Truck, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import bottle from '../assets/demos/harbor-bottle.png'
import buds from '../assets/demos/harbor-buds.png'
import chair from '../assets/demos/harbor-chair.png'
import lamp from '../assets/demos/harbor-lamp.png'
import pack from '../assets/demos/harbor-pack.png'
import throwImg from '../assets/demos/harbor-throw.png'
import tote from '../assets/demos/harbor-tote.png'
import watch from '../assets/demos/harbor-watch.png'
import DemoShell from './DemoShell.jsx'

const PRODUCTS = [
  { id: 'aurora-lamp', name: 'Aurora Lamp', price: 240, category: 'Lighting', blurb: 'Cast brass, hand-finished walnut, and a linen shade that throws a warm 2700K pool of light.', image: lamp, maker: 'Atelier North', note: 'Made in small batches', finishes: ['Cast brass', 'Blackened steel'], lead: 'Ships in 5–8 days', details: 'Height 48cm. Dimmer-ready. Shade in undyed Belgian linen.', rating: 4.8, reviews: 22 },
  { id: 'nimbus-chair', name: 'Nimbus Lounge', price: 1280, category: 'Seating', blurb: 'A compact lounge in oatmeal bouclé on a powder-coated steel sled. Quiet enough for a reading corner.', image: chair, maker: 'Hale Studio', note: '12-week lead time', finishes: ['Oatmeal bouclé', 'Charcoal wool'], lead: 'Made to order', details: 'Seat height 42cm. Performance fabric. Steel sled in bone.', rating: 4.9, reviews: 11 },
  { id: 'drift-tote', name: 'Drift Tote', price: 185, category: 'Carry', blurb: 'Waxed canvas, vegetable-tanned straps, and a hidden sleeve for a 14" laptop.', image: tote, maker: 'Field & Grain', note: 'Limited dye lot', finishes: ['Olive waxed canvas', 'Sand'], lead: 'In stock', details: '16L. Solid brass hardware. Unlined, so it ages with you.', rating: 4.7, reviews: 64 },
  { id: 'harbor-pack', name: 'Harbor Pack', price: 320, category: 'Carry', blurb: 'A clamshell pack with a floating laptop cradle and a quiet zipper. Built for daily city miles.', image: pack, maker: 'Field & Grain', note: 'In stock', finishes: ['Storm grey', 'Ink'], lead: 'In stock', details: '22L. 16" laptop cradle. Waterproof base panel.', rating: 4.8, reviews: 41 },
  { id: 'pulse-watch', name: 'Pulse Watch', price: 640, category: 'Objects', blurb: 'A 38mm titanium case, champagne dial, and a seven-day automatic movement. No smart features, on purpose.', image: watch, maker: 'Kite Horology', note: 'Edition of 200', finishes: ['Brushed titanium', 'Dune'], lead: 'Ships in 3 days', details: '38mm. 10ATM. Calf strap in sand. Numbered caseback.', rating: 5.0, reviews: 18 },
  { id: 'coil-buds', name: 'Coil Case', price: 220, category: 'Objects', blurb: 'A pebble case and low-profile buds tuned for speech first, then music. Twelve hours in the case.', image: buds, maker: 'Kite Horology', note: 'In stock', finishes: ['Pebble ceramic', 'Slate'], lead: 'In stock', details: 'ANC off by default. USB-C. Matte charging case.', rating: 4.6, reviews: 37 },
  { id: 'linen-throw', name: 'Linen Throw', price: 145, category: 'Textile', blurb: 'Stone-washed European linen, 140 × 200. Soft from the first evening.', image: throwImg, maker: 'Atelier North', note: 'Seasonal weave', finishes: ['Stone wash', 'Clay'], lead: 'In stock', details: '140 × 200cm. OEKO-TEX linen. Gets better after every wash.', rating: 4.9, reviews: 88 },
  { id: 'field-bottle', name: 'Field Bottle', price: 78, category: 'Objects', blurb: 'Double-wall steel, 500ml, and a lid that does not rattle in a bag.', image: bottle, maker: 'Hale Studio', note: 'In stock', finishes: ['Matte clay', 'Forest'], lead: 'In stock', details: '500ml. Keeps cold 24h. Threaded lid, no rattle.', rating: 4.7, reviews: 120 },
]

const REVIEWS = [
  { name: 'Priya M.', text: 'The lamp is the only light we leave on after dinner. Quiet, warm, no glare on the table.' },
  { name: 'James K.', text: 'Pack arrived in recycled board, no plastic. Hardware feels like it will outlast the commute.' },
  { name: 'Amelia R.', text: 'Nimbus took twelve weeks and was worth every one. The bouclé does not pill.' },
]

const CATS = ['All', 'Lighting', 'Seating', 'Carry', 'Objects', 'Textile']
const SHIP = [
  { id: 'standard', name: 'Standard', hint: '5–8 business days', fee: 18 },
  { id: 'express', name: 'Express', hint: '2–3 business days', fee: 42 },
]
const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price · low' },
  { id: 'price-desc', label: 'Price · high' },
  { id: 'rating', label: 'Best reviewed' },
]

function money(n) {
  return `$${n.toLocaleString()}`
}

export default function HarborShop() {
  const { itemId } = useParams()
  const product = PRODUCTS.find((p) => p.id === itemId)
  const [cat, setCat] = useState('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [cart, setCart] = useState([])
  const [saved, setSaved] = useState(['pulse-watch', 'linen-throw'])
  const [openCart, setOpenCart] = useState(false)
  const [view, setView] = useState('shop')
  const [order, setOrder] = useState(null)
  const navigate = useNavigate()

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = PRODUCTS.filter((p) => {
      const catOk = cat === 'All' || p.category === cat
      const qOk = !q || p.name.toLowerCase().includes(q) || p.maker.toLowerCase().includes(q)
      return catOk && qOk
    })
    return [...rows].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return 0
    })
  }, [cat, query, sort])

  const add = (p, n = 1, finish = p.finishes[0]) => {
    const key = `${p.id}::${finish}`
    setCart((c) => {
      const hit = c.find((x) => x.key === key)
      if (hit) return c.map((x) => (x.key === key ? { ...x, qty: x.qty + n } : x))
      return [...c, { ...p, key, finish, qty: n }]
    })
    setOpenCart(true)
  }

  const setItemQty = (key, next) => {
    setCart((c) => c.map((x) => (x.key === key ? { ...x, qty: next } : x)).filter((x) => x.qty > 0))
  }

  const toggleSave = (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const count = cart.reduce((n, x) => n + x.qty, 0)
  const subtotal = cart.reduce((n, x) => n + x.qty * x.price, 0)
  const savedItems = PRODUCTS.filter((p) => saved.includes(p.id))

  const goShop = (nextCat) => {
    setView('shop')
    if (nextCat) setCat(nextCat)
    if (itemId) navigate('/work/harbor-shop')
  }

  const goSaved = () => {
    setView('saved')
    if (itemId) navigate('/work/harbor-shop')
  }

  return (
    <DemoShell
      brand="HARBOR"
      className="min-h-screen cursor-default bg-[#f4efe6] text-[#1c1917] [&_a]:cursor-pointer [&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed [&_label]:cursor-pointer [&_select]:cursor-pointer"
      headerClass="border-[#1c1917]/10 bg-[#f4efe6]/90 text-[#1c1917]"
      linkClass="text-[#1c1917]/50 hover:text-[#1c1917]"
    >
      <p className="relative z-30 border-b border-[#1c1917]/10 bg-[#1c1917] py-2 text-center text-[11px] tracking-[0.18em] text-[#f4efe6]">
        Autumn drop · Complimentary shipping over $250 · Code HARBOR10
      </p>
      <div className="sticky top-14 z-40 border-b border-[#1c1917]/10 bg-[#f4efe6]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <button type="button" onClick={() => goShop('All')} className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
            Harbor
          </button>
          <nav className="flex min-w-0 flex-1 items-center justify-end gap-3 overflow-x-auto text-[13px] tracking-wide sm:gap-6 md:justify-center">
            {CATS.slice(1).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => goShop(c)}
                className={`shrink-0 hover:opacity-60 ${view === 'shop' && !itemId && cat === c ? 'text-[#1c1917]' : 'text-[#1c1917]/50'}`}
              >
                {c}
              </button>
            ))}
            <button
              type="button"
              onClick={goSaved}
              className={`shrink-0 hover:opacity-60 ${view === 'saved' ? 'text-[#1c1917]' : 'text-[#1c1917]/50'}`}
            >
              Saved {saved.length > 0 && `(${saved.length})`}
            </button>
          </nav>
          <button type="button" onClick={() => setOpenCart(true)} className="inline-flex shrink-0 items-center gap-2 text-[13px]">
            <ShoppingBag size={16} /> Bag {count > 0 && <span className="tabular-nums">({count})</span>}
          </button>
        </div>
      </div>

      {view === 'success' && order ? (
        <OrderConfirm order={order} onContinue={() => { setOrder(null); goShop('All') }} />
      ) : view === 'checkout' ? (
        <Checkout
          cart={cart}
          subtotal={subtotal}
          onBack={() => setView('shop')}
          onPlaced={(next) => {
            setOrder(next)
            setCart([])
            setView('success')
          }}
        />
      ) : product ? (
        <ProductDetail
          key={product.id}
          product={product}
          saved={saved.includes(product.id)}
          onSave={() => toggleSave(product.id)}
          onAdd={(n, finish) => add(product, n, finish)}
          onBack={() => navigate('/work/harbor-shop')}
        />
      ) : view === 'saved' ? (
        <SavedFloor items={savedItems} saved={saved} onSave={toggleSave} onShop={() => setView('shop')} />
      ) : (
        <Catalog
          cat={cat}
          setCat={goShop}
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
          visible={visible}
          saved={saved}
          onSave={toggleSave}
          onQuickAdd={(p) => add(p, 1)}
        />
      )}

      {openCart && (
        <div className="fixed inset-0 z-[80] flex justify-end bg-[#1c1917]/40" onClick={() => setOpenCart(false)}>
          <aside className="relative z-[81] flex h-full w-full max-w-md flex-col bg-[#f4efe6] p-8" onClick={(e) => e.stopPropagation()}>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-2xl">Bag</h2>
              <button type="button" onClick={() => setOpenCart(false)} aria-label="Close bag"><X size={18} /></button>
            </div>
            {cart.length === 0 ? (
              <p className="text-sm text-[#1c1917]/60">Your bag is empty. The autumn collection is on the floor.</p>
            ) : (
              <ul className="flex-1 space-y-6 overflow-auto">
                {cart.map((item) => (
                  <li key={item.key} className="flex gap-4">
                    <img src={item.image} alt="" className="h-24 w-16 object-cover" />
                    <div className="flex flex-1 flex-col text-sm">
                      <p className="font-medium">{item.name}</p>
                      <p className="mt-0.5 text-[12px] text-[#1c1917]/45">{item.finish}</p>
                      <div className="mt-3 inline-flex w-fit items-center border border-[#1c1917]/15">
                        <button type="button" className="p-2" onClick={() => setItemQty(item.key, item.qty - 1)} aria-label="Decrease"><Minus size={12} /></button>
                        <span className="w-7 text-center text-xs tabular-nums">{item.qty}</span>
                        <button type="button" className="p-2" onClick={() => setItemQty(item.key, item.qty + 1)} aria-label="Increase"><Plus size={12} /></button>
                      </div>
                      <button type="button" onClick={() => setItemQty(item.key, 0)} className="mt-2 self-start text-[11px] tracking-wide text-[#1c1917]/40 hover:text-[#1c1917]">
                        Remove
                      </button>
                    </div>
                    <p className="text-sm tabular-nums">{money(item.price * item.qty)}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 border-t border-[#1c1917]/10 pt-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="tabular-nums">{money(subtotal)}</span>
              </div>
              <p className="mt-2 text-[11px] text-[#1c1917]/40">
                {subtotal >= 250 ? 'Complimentary shipping applied at checkout.' : `Add ${money(250 - subtotal)} for complimentary shipping.`}
              </p>
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={() => { setOpenCart(false); setView('checkout') }}
                className="mt-5 w-full bg-[#1c1917] py-3.5 text-[13px] tracking-wide text-[#f4efe6] disabled:opacity-30"
              >
                Checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </DemoShell>
  )
}

function Catalog({ cat, setCat, query, setQuery, sort, setSort, visible, saved, onSave, onQuickAdd }) {
  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-16 pt-6 lg:px-8">
      <section className="grid items-end gap-4 lg:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a5b3c]">Autumn objects</p>
          <h1 className="mt-2 max-w-xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            Quiet pieces for a slower room.
          </h1>
        </div>
        <p className="max-w-md text-sm leading-7 text-[#1c1917]/70 lg:justify-self-end">
          A small house collection —{' '}
          {['Lighting', 'Seating', 'Carry'].map((c, i) => (
            <span key={c}>
              {i > 0 && (i === 2 ? ', and ' : ', ')}
              <button
                type="button"
                onClick={() => setCat(c)}
                className="underline decoration-[#1c1917]/30 underline-offset-4 hover:text-[#1c1917]"
              >
                {c.toLowerCase()}
              </button>
            </span>
          ))}
          {' '}
          — designed to last a decade, not a season. Save pieces, choose a finish, and check out as a guest.
        </p>
      </section>

      <div className="mt-8 flex flex-col gap-4 border-b border-[#1c1917]/10 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-[12px] tracking-wide ${
                cat === c ? 'bg-[#1c1917] text-[#f4efe6]' : 'border border-[#1c1917]/15 hover:border-[#1c1917]/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent text-[12px] outline-none">
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the floor"
            className="w-full border-b border-[#1c1917]/20 bg-transparent py-2 text-sm outline-none placeholder:text-[#1c1917]/35 sm:max-w-xs"
          />
        </div>
      </div>

      <div className="mt-8">
        {visible.length === 0 ? (
          <p className="py-16 text-center text-sm text-[#1c1917]/50">Nothing matches that search.</p>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p) => (
              <article key={p.id} className="group">
                <div className="relative isolate overflow-hidden bg-[#e8e0d4]">
                  <Link to={`/work/harbor-shop/${p.id}`} className="block">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img src={p.image} alt={p.name} className="pointer-events-none h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onSave(p.id)
                    }}
                    className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center bg-[#f4efe6]/90"
                    aria-label="Save"
                  >
                    <Heart size={14} fill={saved.includes(p.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <Link to={`/work/harbor-shop/${p.id}`} className="mt-3 flex items-baseline justify-between gap-3">
                  <h2 className="font-[family-name:var(--font-display)] text-xl">{p.name}</h2>
                  <p className="text-[13px] tabular-nums">{money(p.price)}</p>
                </Link>
                <p className="mt-1 text-[12px] tracking-wide text-[#1c1917]/50">{p.maker} · {p.rating} ★ · {p.lead}</p>
                <button
                  type="button"
                  onClick={() => onQuickAdd(p)}
                  className="mt-2 text-[12px] tracking-wide text-[#1c1917]/70 underline decoration-[#1c1917]/25 underline-offset-4 hover:text-[#1c1917]"
                >
                  Quick add
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      <footer className="mt-16 grid gap-10 border-t border-[#1c1917]/10 py-12 text-sm text-[#1c1917]/65 sm:grid-cols-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#9a5b3c]">Shipping</p>
          <p className="mt-3 leading-7">Complimentary over $250. Packed in recycled board, no plastic fill.</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#9a5b3c]">Returns</p>
          <p className="mt-3 leading-7">Thirty days, unused and in original wrap. Made-to-order seating is final sale.</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#9a5b3c]">Atelier</p>
          <p className="mt-3 leading-7">Questions on finish or lead time — write the house. Replies within one working day.</p>
        </div>
      </footer>
    </div>
  )
}

function SavedFloor({ items, saved, onSave, onShop }) {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-8">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a5b3c]">House list</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl">Saved</h1>
      {items.length === 0 ? (
        <p className="mt-8 text-sm text-[#1c1917]/55">
          Nothing saved.{' '}
          <button type="button" onClick={onShop} className="underline decoration-[#1c1917]/30 underline-offset-4">Return to the floor</button>
        </p>
      ) : (
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <article key={p.id}>
              <Link to={`/work/harbor-shop/${p.id}`}>
                <div className="aspect-[4/5] overflow-hidden bg-[#e8e0d4]">
                  <img src={p.image} alt="" className="h-full w-full object-cover" />
                </div>
                <p className="mt-4 font-[family-name:var(--font-display)] text-xl">{p.name}</p>
                <p className="text-[13px] tabular-nums">{money(p.price)}</p>
              </Link>
              <button type="button" onClick={() => onSave(p.id)} className="mt-2 text-[12px] text-[#1c1917]/45">
                {saved.includes(p.id) ? 'Remove' : 'Save'}
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function ProductDetail({ product, saved, onSave, onAdd, onBack }) {
  const [qty, setQty] = useState(1)
  const [finish, setFinish] = useState(product.finishes[0])
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-8 lg:py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="bg-[#e8e0d4]">
          <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center lg:max-w-md lg:py-8">
          <button type="button" onClick={onBack} className="text-[12px] tracking-wide text-[#1c1917]/50 hover:text-[#1c1917]">
            ← Collection
          </button>
          <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[#9a5b3c]">{product.maker}</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-tight">{product.name}</h2>
          <p className="mt-3 text-lg tabular-nums">{money(product.price)}</p>
          <p className="mt-2 text-[12px] tracking-wide text-[#1c1917]/45">{product.rating} ★ · {product.reviews} house reviews</p>
          <p className="mt-6 text-sm leading-7 text-[#1c1917]/70">{product.blurb}</p>
          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#9a5b3c]">Finish</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.finishes.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFinish(f)}
                  className={`px-3 py-1.5 text-[12px] ${finish === f ? 'bg-[#1c1917] text-[#f4efe6]' : 'border border-[#1c1917]/15'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[12px] tracking-wide text-[#1c1917]/40">{product.note} · {product.lead}</p>
          <p className="mt-4 text-[13px] leading-6 text-[#1c1917]/55">{product.details}</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="inline-flex items-center border border-[#1c1917]/15">
              <button type="button" className="p-3" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus size={14} /></button>
              <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
              <button type="button" className="p-3" onClick={() => setQty((q) => q + 1)} aria-label="Increase"><Plus size={14} /></button>
            </div>
            <button type="button" onClick={() => onAdd(qty, finish)} className="flex-1 bg-[#1c1917] py-3.5 text-[13px] tracking-wide text-[#f4efe6]">
              Add to bag
            </button>
            <button type="button" onClick={onSave} className="border border-[#1c1917]/15 p-3.5" aria-label="Save">
              <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-[12px] text-[#1c1917]/45">
            <Truck size={14} /> {product.price * qty >= 250 ? 'Qualifies for complimentary shipping' : `Add ${money(250 - product.price * qty)} more for free shipping`}
          </p>
        </div>
      </div>

      <div className="mt-20 grid gap-10 border-t border-[#1c1917]/10 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#9a5b3c]">House notes</p>
          <ul className="mt-6 space-y-6">
            {REVIEWS.map((r) => (
              <li key={r.name}>
                <p className="text-sm leading-7 text-[#1c1917]/75">“{r.text}”</p>
                <p className="mt-2 text-[12px] tracking-wide text-[#1c1917]/40">{r.name}</p>
              </li>
            ))}
          </ul>
        </div>
        {related.length > 0 && (
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#9a5b3c]">Worn with</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {related.map((p) => (
                <Link key={p.id} to={`/work/harbor-shop/${p.id}`} className="flex gap-4">
                  <img src={p.image} alt="" className="h-20 w-16 object-cover" />
                  <span>
                    <span className="block font-[family-name:var(--font-display)] text-lg">{p.name}</span>
                    <span className="text-[13px] tabular-nums text-[#1c1917]/55">{money(p.price)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Checkout({ cart, subtotal, onBack, onPlaced }) {
  const [ship, setShip] = useState('standard')
  const [placing, setPlacing] = useState(false)
  const [gift, setGift] = useState(false)
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState(false)
  const [form, setForm] = useState({ email: '', name: '', line: '', city: '', postal: '' })
  const method = SHIP.find((s) => s.id === ship)
  const shipFee = subtotal >= 250 && ship === 'standard' ? 0 : method.fee
  const wrap = gift ? 18 : 0
  const discount = applied ? Math.round(subtotal * 0.1) : 0
  const tax = Math.round((subtotal - discount + wrap) * 0.08)
  const total = subtotal - discount + shipFee + wrap + tax
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const place = (e) => {
    e.preventDefault()
    if (cart.length === 0) return
    setPlacing(true)
    window.setTimeout(() => {
      onPlaced({
        id: `HS-${4800 + Math.floor(Math.random() * 90)}`,
        items: cart,
        total,
        ship: method.name,
        email: form.email,
        name: form.name,
        gift,
        discount,
        eta: ship === 'express' ? '6–8 September' : '11–16 September',
      })
    }, 900)
  }

  return (
    <form onSubmit={place} className="mx-auto grid max-w-[1100px] gap-12 px-5 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div>
        <button type="button" onClick={onBack} className="text-[12px] tracking-wide text-[#1c1917]/50 hover:text-[#1c1917]">
          ← Back to bag
        </button>
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl">Checkout</h1>
        <p className="mt-2 text-sm text-[#1c1917]/55">Guest checkout. No account required.</p>

        <fieldset className="mt-10 space-y-5">
          <legend className="text-[11px] uppercase tracking-[0.22em] text-[#9a5b3c]">Contact</legend>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="Email for the receipt" className="w-full border-b border-[#1c1917]/20 bg-transparent py-3 text-sm outline-none" />
          <input required value={form.name} onChange={set('name')} placeholder="Full name" className="w-full border-b border-[#1c1917]/20 bg-transparent py-3 text-sm outline-none" />
        </fieldset>

        <fieldset className="mt-10 space-y-5">
          <legend className="text-[11px] uppercase tracking-[0.22em] text-[#9a5b3c]">Ship to</legend>
          <input required value={form.line} onChange={set('line')} placeholder="Street address" className="w-full border-b border-[#1c1917]/20 bg-transparent py-3 text-sm outline-none" />
          <div className="grid gap-5 sm:grid-cols-2">
            <input required value={form.city} onChange={set('city')} placeholder="City" className="border-b border-[#1c1917]/20 bg-transparent py-3 text-sm outline-none" />
            <input required value={form.postal} onChange={set('postal')} placeholder="Postal code" className="border-b border-[#1c1917]/20 bg-transparent py-3 text-sm outline-none" />
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="text-[11px] uppercase tracking-[0.22em] text-[#9a5b3c]">Shipping</legend>
          <div className="mt-4 grid gap-2">
            {SHIP.map((s) => {
              const fee = subtotal >= 250 && s.id === 'standard' ? 0 : s.fee
              return (
                <label key={s.id} className={`flex cursor-pointer items-center justify-between border px-4 py-4 text-sm ${ship === s.id ? 'border-[#1c1917] bg-white/50' : 'border-[#1c1917]/15'}`}>
                  <span>
                    <input type="radio" name="ship" className="sr-only" checked={ship === s.id} onChange={() => setShip(s.id)} />
                    <span className="font-medium">{s.name}</span>
                    <span className="ml-3 text-[#1c1917]/45">{s.hint}</span>
                  </span>
                  <span className="tabular-nums">{fee === 0 ? 'Free' : money(fee)}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <label className="mt-8 flex cursor-pointer items-center justify-between border border-[#1c1917]/15 px-4 py-4 text-sm">
          <span>
            <span className="block font-medium">Gift wrap</span>
            <span className="text-[12px] text-[#1c1917]/45">Unbranded tissue, handwritten card</span>
          </span>
          <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} />
        </label>
      </div>

      <aside className="h-fit bg-white/70 p-8 shadow-[0_30px_80px_-50px_rgba(28,25,23,0.45)]">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#9a5b3c]">Order</p>
        <ul className="mt-6 space-y-4">
          {cart.map((item) => (
            <li key={item.key} className="flex gap-3 text-sm">
              <img src={item.image} alt="" className="h-16 w-12 object-cover" />
              <div className="flex-1">
                <p>{item.name}</p>
                <p className="text-[12px] text-[#1c1917]/45">{item.finish} · Qty {item.qty}</p>
              </div>
              <p className="tabular-nums">{money(item.price * item.qty)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Gift or promo code"
            className="flex-1 border-b border-[#1c1917]/20 bg-transparent py-2 text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => setApplied(code.trim().toUpperCase() === 'HARBOR10')}
            className="text-[12px] tracking-wide"
          >
            Apply
          </button>
        </div>
        {code && !applied && code.trim() && (
          <p className="mt-2 text-[11px] text-[#1c1917]/40">Try HARBOR10 for 10% off.</p>
        )}
        <dl className="mt-8 space-y-2 border-t border-[#1c1917]/10 pt-5 text-sm">
          <div className="flex justify-between"><dt className="text-[#1c1917]/50">Subtotal</dt><dd className="tabular-nums">{money(subtotal)}</dd></div>
          {applied && <div className="flex justify-between text-emerald-800"><dt>HARBOR10</dt><dd className="tabular-nums">−{money(discount)}</dd></div>}
          <div className="flex justify-between"><dt className="text-[#1c1917]/50">Shipping</dt><dd className="tabular-nums">{shipFee === 0 ? 'Free' : money(shipFee)}</dd></div>
          {gift && <div className="flex justify-between"><dt className="text-[#1c1917]/50">Gift wrap</dt><dd className="tabular-nums">{money(wrap)}</dd></div>}
          <div className="flex justify-between"><dt className="text-[#1c1917]/50">Estimated tax</dt><dd className="tabular-nums">{money(tax)}</dd></div>
          <div className="flex justify-between pt-2 text-base"><dt>Total</dt><dd className="tabular-nums">{money(total)}</dd></div>
        </dl>
        <button type="submit" disabled={placing || cart.length === 0} className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-[#1c1917] py-3.5 text-[13px] tracking-wide text-[#f4efe6] disabled:opacity-40">
          <Lock size={13} /> {placing ? 'Placing order…' : `Pay ${money(total)}`}
        </button>
        <p className="mt-3 text-center text-[11px] text-[#1c1917]/40">Demo checkout — no charge is made.</p>
      </aside>
    </form>
  )
}

function OrderConfirm({ order, onContinue }) {
  return (
    <div className="mx-auto max-w-xl px-5 py-20 lg:px-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1c1917] text-[#f4efe6]">
        <Check size={20} />
      </div>
      <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[#9a5b3c]">Order {order.id}</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-tight">It’s on its way to being packed.</h1>
      <p className="mt-5 text-sm leading-7 text-[#1c1917]/65">
        A receipt goes to {order.email}. Estimated arrival {order.eta} via {order.ship} shipping
        {order.gift ? ', gift-wrapped.' : '.'}
      </p>
      <ol className="mt-10 grid grid-cols-3 gap-3 text-center text-[11px] uppercase tracking-wide">
        {['Paid', 'Packing', 'In transit'].map((step, i) => (
          <li key={step} className={i === 0 ? 'text-[#1c1917]' : 'text-[#1c1917]/35'}>
            <span className={`mx-auto mb-2 block h-1 ${i === 0 ? 'bg-[#1c1917]' : 'bg-[#1c1917]/15'}`} />
            {step}
          </li>
        ))}
      </ol>
      <ul className="mt-10 space-y-4 border-y border-[#1c1917]/10 py-8">
        {order.items.map((item) => (
          <li key={item.key} className="flex items-center justify-between text-sm">
            <span>{item.name} · {item.finish} × {item.qty}</span>
            <span className="tabular-nums">{money(item.price * item.qty)}</span>
          </li>
        ))}
        <li className="flex items-center justify-between pt-2 text-sm font-medium">
          <span>Paid</span>
          <span className="tabular-nums">{money(order.total)}</span>
        </li>
      </ul>
      <button type="button" onClick={onContinue} className="mt-10 text-sm tracking-wide underline decoration-[#1c1917]/30 underline-offset-4">
        Continue browsing
      </button>
    </div>
  )
}
