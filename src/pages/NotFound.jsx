import { useEffect } from 'react'
import Button from '../components/Button.jsx'
import Layout from '../components/Layout.jsx'
import { site } from '../data/portfolio.js'

export default function NotFound() {
  useEffect(() => {
    document.title = `Page not found - ${site.name}`
    return () => {
      document.title = site.seo.title
    }
  }, [])

  return (
    <Layout>
      <section className="bg-grid flex min-h-[80vh] items-center pt-24">
        <div className="mx-auto max-w-[640px] px-5 py-20 text-center">
          <p className="font-mono text-sm text-accent">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Looks like this route doesn&apos;t exist.
          </h1>
          <p className="mt-4 text-mute">
            The page may have moved, or the URL is off by a character.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/">Back Home</Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}
