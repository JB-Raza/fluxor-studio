import { useEffect, useId, useRef, useState } from 'react'

const triggerClass =
  'peer w-full rounded-xl border border-border bg-background px-4 pb-3 pt-6 text-left text-sm text-primary outline-none transition-colors focus:border-accent'

export default function FloatingDropdown({
  id: idProp,
  label,
  name,
  options = [],
  error,
  className = '',
  onFocus,
  defaultValue = '',
}) {
  const uid = useId()
  const id = idProp ?? uid
  const rootRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState(defaultValue)

  const selected = options.find((option) => option.value === value)
  const floated = focused || open || Boolean(value)

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const selectOption = (optionValue) => {
    setValue(optionValue)
    setOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={[className, 'relative', open ? 'z-50' : 'z-10'].filter(Boolean).join(' ')}
      data-contact-field
    >
      <input type="hidden" name={name} value={value} />

      <div className="relative">
        <button
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={triggerClass}
          onClick={() => setOpen((prev) => !prev)}
          onFocus={(event) => {
            setFocused(true)
            onFocus?.(event)
          }}
          onBlur={() => setFocused(false)}
        >
          <span className="block min-h-[1.25rem] text-primary">
            {selected?.label ?? '\u00A0'}
          </span>
        </button>

        <label
          htmlFor={id}
          className={[
            'pointer-events-none absolute left-4 origin-left transition-all duration-200',
            floated
              ? 'top-2 translate-y-0 text-xs text-accent'
              : 'top-1/2 -translate-y-1/2 text-sm text-secondary',
          ].join(' ')}
        >
          {label}
        </label>

        {open && (
          <ul
            role="listbox"
            aria-labelledby={id}
            className="animate-dropdown-in absolute left-0 right-0 top-full z-50 mt-1.5 max-h-56 overflow-y-auto rounded-xl border border-border bg-surface py-1 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          >
            {options.map((option) => (
              <li key={option.value} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={value === option.value}
                  className={[
                    'w-full px-4 py-2.5 text-left text-sm transition-colors',
                    value === option.value
                      ? 'bg-accent/15 text-primary'
                      : 'text-secondary hover:bg-background hover:text-primary',
                  ].join(' ')}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}
