import { useMagnetic } from '../../hooks/useMagnetic'

export default function Magnetic({ children, strength = 0.4, className = '' }) {
  const ref = useMagnetic({ strength })

  return (
    <span ref={ref} className={['inline-block', className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
