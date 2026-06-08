export const siteName = 'FLUXOR'

export const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'CGI Production', href: '/services#cgi-production' },
      { label: 'VFX & Visual Effects', href: '/services#vfx' },
      { label: '3D Animation', href: '/services#3d-animation' },
      { label: 'Product Visualization', href: '/services#product-visualization' },
      { label: 'Motion Graphics', href: '/services#motion-graphics' },
      { label: 'Brand Films', href: '/services#brand-films' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export const navCta = {
  label: "Let's Create",
  href: '/contact',
}

export const heroLabels = [
  'Visual Agency',
  'CGI Studio',
  'VFX Experts',
  '3D Production House',
  'Motion Creators',
]

export const heroHeadlineSuffix = 'That Makes You Impossible to Ignore.'

export const heroSubhead =
  'We are Fluxor: a content creation studio built for brands that are done being average. CGI. VFX. 3D. All of it. None of the fluff.'

export const heroCtas = {
  primary: { label: 'See Our Work', href: '/#work' },
  secondary: { label: "Let's Talk", href: '/contact' },
}

export const socialProofLine =
  'Trusted by brands across e-commerce, tech, real estate, fashion & beyond.'

export const socialProofClients = [
  'E-commerce',
  'Tech',
  'Real Estate',
  'Fashion',
  'Consumer Products',
  'Architecture',
  'Startups',
  'Enterprise',
]

export const footerTagline =
  'FLUXOR — The Content Creation Studio for Brands That Mean Business.'

// Update siteUrl to the real production domain before launch.
export const siteUrl = 'https://fluxor.studio'
export const defaultOgImage = '/og-image.svg'

export const pageMeta = {
  home: {
    title: 'Fluxor, Leading Content Creation Studio for CGI, VFX & 3D',
    description:
      'Fluxor is a bold content creation studio delivering world-class CGI, VFX, and 3D video production services. We turn raw ideas into visual experiences that convert, captivate, and stick.',
  },
  about: {
    title: 'About Fluxor, The Visual Agency Behind the Magic',
    description:
      'Meet Fluxor: the content creation studio redefining what visual storytelling looks like. CGI, VFX, and 3D production built for brands that refuse to blend in.',
  },
  services: {
    title: 'CGI, VFX & 3D Content Production Services - Fluxor',
    description:
      "From photorealistic CGI to explosive VFX and cinematic 3D animation - Fluxor's content production services are engineered for brands ready to be seen.",
  },
  portfolio: {
    title: 'Our Work: Fluxor Content Creation Studio',
    description:
      "Browse Fluxor's portfolio of CGI, VFX, and 3D productions. Real projects. Real results. Visual storytelling that actually moves people.",
  },
  contact: {
    title: 'Work With Fluxor: Content Creation Studio',
    description:
      'Ready to build something unforgettable? Contact Fluxor, your go-to content creation studio for CGI, VFX, and 3D video production.',
  },
  notFound: {
    title: 'Page Not Found - Fluxor',
    description:
      "The page you're looking for doesn't exist. Head back to Fluxor's content creation studio for CGI, VFX, and 3D production.",
  },
}
