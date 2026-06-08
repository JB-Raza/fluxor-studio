import { navLinks, siteName } from './nav'

const serviceLinks = navLinks.find((link) => link.children)?.children ?? []

export const footerContent = {
  brand: {
    name: siteName,
    tagline:
      'A content creation studio for CGI, VFX, and 3D — built for brands that refuse to blend in.',
  },
  columns: [
    {
      title: 'Studio',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Our Work', href: '/#work' },
        { label: 'Process', href: '/#process' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: serviceLinks.map((link) => ({
        label: link.label,
        href: link.href,
      })),
    },
    {
      title: 'Connect',
      links: [
        { label: 'hello@fluxor.studio', href: 'mailto:hello@fluxor.studio' },
        { label: 'Book a discovery call', href: '/contact' },
        { label: 'Portfolio', href: '/portfolio' },
      ],
    },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Vimeo', href: 'https://vimeo.com' },
    { label: 'Behance', href: 'https://behance.net' },
  ],
  cta: {
    label: "Let's Create",
    href: '/contact',
  },
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
}
