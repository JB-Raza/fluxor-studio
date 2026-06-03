import { usePageMeta } from '../hooks/usePageMeta'
import { pageMeta } from '../data/nav'
import ContactCTA from '../sections/ContactCTA'

export default function Contact() {
  usePageMeta(pageMeta.contact)

  return (
    <div className="pt-20">
      <ContactCTA />
    </div>
  )
}
