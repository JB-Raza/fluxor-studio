// Warm the browser cache for media in the background, AFTER the page has
// loaded, so the first hover plays instantly without slowing first paint.
// We fetch each file to completion (filling the HTTP cache) at low concurrency
// and only when the network/data conditions are reasonable.

const requested = new Set()

function networkAllowsPrefetch() {
  if (typeof navigator === 'undefined') return true
  const conn =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection
  if (!conn) return true
  if (conn.saveData) return false
  if (conn.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return false
  return true
}

function prefetchMedia(urls, { concurrency = 2 } = {}) {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') return
  if (!networkAllowsPrefetch()) return

  const queue = urls.filter((url) => url && !requested.has(url))
  if (queue.length === 0) return

  let index = 0
  const pump = () => {
    if (index >= queue.length) return
    const url = queue[index]
    index += 1
    requested.add(url)
    // Reading the body to completion fills the cache; we discard the bytes.
    fetch(url, { credentials: 'same-origin' })
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
