import { useId, useState } from 'react'

const fieldClass =
  'peer w-full rounded-xl border border-border bg-background px-4 pb-3 pt-6 text-sm text-primary outline-none transition-colors placeholder:text-transparent focus:border-accent'

export function FloatingInput({
  id: idProp,
  label,
  name,
  type = 'text',
  error,
  className = '',
  onFocus,
  onBlur,
  onChange,
  ...props
}) {
  const uid = useId()
  const id = idProp ?? uid
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const floated = focused || hasValue

  return (
    <div className={className} data-contact-field>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder=" "
          className={fieldClass}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            setHasValue(!!e.target.value.trim())
            onBlur?.(e)
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value.trim())
            onChange?.(e)
          }}
          {...props}
        />
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
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

export function FloatingSelect({
  id: idProp,
  label,
  name,
  children,
  error,
  className = '',
  onFocus,
  onBlur,
  onChange,
  defaultValue = '',
  ...props
}) {
  const uid = useId()
  const id = idProp ?? uid
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(!!defaultValue)
  const floated = focused || hasValue

  return (
    <div className={className} data-contact-field>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue={defaultValue}
          className={[fieldClass, 'appearance-none'].join(' ')}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            setHasValue(!!e.target.value)
            onBlur?.(e)
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value)
            onChange?.(e)
          }}
          {...props}
        >
          {children}
        </select>
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
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

export function FloatingTextarea({
  id: idProp,
  label,
  name,
  rows = 5,
  error,
  className = '',
  onFocus,
  onBlur,
  onChange,
  ...props
}) {
  const uid = useId()
  const id = idProp ?? uid
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const floated = focused || hasValue

  return (
    <div className={className} data-contact-field>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder=" "
          className={[fieldClass, 'resize-none'].join(' ')}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            setHasValue(!!e.target.value.trim())
            onBlur?.(e)
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value.trim())
            onChange?.(e)
          }}
          {...props}
        />
        <label
          htmlFor={id}
          className={[
            'pointer-events-none absolute left-4 origin-left transition-all duration-200',
            floated
              ? 'top-2 text-xs text-accent'
              : 'top-3.5 text-sm text-secondary',
          ].join(' ')}
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}
