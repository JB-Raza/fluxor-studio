import VelocityMarquee from '../components/motion/VelocityMarquee'
import { socialProofClients } from '../data/nav'

export default function SocialProof() {
  return (
    <section aria-label="Trusted industries" className="border-y border-border">
      <VelocityMarquee items={socialProofClients} className="py-8" />
    </section>
  )
}
