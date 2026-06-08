import { useEffect } from 'react'
import { defaultOgImage, siteName, siteUrl } from '../data/nav'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function usePageMeta({ title, description, ogImage } = {}) {
  useEffect(() => {
    if (title) document.title = title

    const url =
      typeof window !== 'undefined'
        ? `${siteUrl}${window.location.pathname}`
        : siteUrl
    const image = `${siteUrl}${ogImage || defaultOgImage}`

    upsertMeta('name', 'description', description)
    upsertCanonical(url)

    // Open Graph
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', siteName)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)
  }, [title, description, ogImage])
}
