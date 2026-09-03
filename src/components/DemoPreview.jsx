export default function DemoPreview({ src, title, eager = false }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-elevated">
      <iframe
        src={src}
        title={title}
        loading={eager ? 'eager' : 'lazy'}
        tabIndex={-1}
        className="image-zoom pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0"
      />
    </div>
  )
}
