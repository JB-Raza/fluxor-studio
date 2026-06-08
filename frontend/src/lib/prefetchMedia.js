// Warm the browser cache for media in the background, AFTER the page has
// loaded, so the first hover plays instantly without slowing first paint.
// We fetch each file to completion (filling the HTTP cache) at low concurrency,
// at LOW network priority so visible images (posters) never get starved, and
// only when the network/data conditions are reasonable.

const requested = new Set()

// On constrained links (2g/3g or Data Saver) heavy video prefetch competes
// with the visible posters, so we skip it entirely and let videos load on hover.
function isSlowConnection() {
  if (typeof navigator === 'undefined') return false
  const conn =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection
  if (!conn) return false
  if (conn.saveData) return true
  if (conn.effectiveType && /(^|-)[23]g$/.test(conn.effectiveType)) return true
  return false
}

function prefetchMedia(urls, { concurrency = 2, priority = 'low' } = {}) {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') return
  if (isSlowConnection()) return

  const queue = urls.filter((url) => url && !requested.has(url))
  if (queue.length === 0) return

  let index = 0
  const pump = () => {
    if (index >= queue.length) return
    const url = queue[index]
    index += 1
    requested.add(url)
    // Reading the body to completion fills the cache; we discard the bytes.
    // `priority: 'low'` lets the browser serve real image/video requests first.
    fetch(url, { credentials: 'same-origin', priority })
      .then((res) => res.blob())
      .catch(() => {})
      .finally(pump)
  }

  for (let i = 0; i < Math.min(concurrency, queue.length); i += 1) pump()
}

// Defer until the page is fully loaded and the main thread is idle.
export function prefetchMediaWhenIdle(urls, opts) {
  if (typeof window === 'undefined') return

  const schedule = () => {
    const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 300))
    idle(() => prefetchMedia(urls, opts))
  }

  if (document.readyState === 'complete') {
    schedule()
  } else {
    window.addEventListener('load', schedule, { once: true })
  }
}
