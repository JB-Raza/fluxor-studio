import PartnerMarquee from '../components/motion/PartnerMarquee'
import { partners } from '../data/partners'

export default function SocialProof() {
  return (
    <section aria-label="Partners we've served" className="border-y border-border">
      <PartnerMarquee items={partners} className="py-8" />
    </section>
  )
}
