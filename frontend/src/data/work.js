import { workPosters, workVideos } from './assets'

export const selectedWorkSection = {
  label: 'Work',
  headline: "Visuals That Don't Just Look Good: They Perform.",
  subtext:
    'Every frame here started as a brief. Then we made it loud. Browse our content production services in action.',
  cta: { label: 'View All Projects', href: '/portfolio' },
}

export const workItems = [
  {
    id: 'work-1',
    title: 'Product Launch CGI',
    tags: ['CGI', '3D Animation', 'Product Visualization'],
    placeholder: 'from-violet-900/40 to-background',
    video: workVideos.cgi,
    poster: workPosters.cgi,
  },
  {
    id: 'work-2',
    title: 'Brand Film VFX',
    tags: ['VFX', 'Brand Film', 'Motion Graphics'],
    placeholder: 'from-indigo-900/40 to-background',
    video: workVideos.brand,
    poster: workPosters.brand,
  },
  {
    id: 'work-3',
    title: 'E-commerce Visualization',
    tags: ['3D', 'E-commerce Visualization'],
    placeholder: 'from-purple-900/40 to-background',
    video: workVideos.product,
    poster: workPosters.product,
  },
  {
    id: 'work-4',
    title: 'Architectural CGI',
    tags: ['CGI', 'Architectural Visualization'],
    placeholder: 'from-blue-900/40 to-background',
    video: workVideos.caseStudy,
    poster: workPosters.caseStudy,
  },
  {
    id: 'work-5',
    title: 'Social Reels Package',
    tags: ['Motion', 'VFX', 'Reels'],
    placeholder: 'from-fuchsia-900/40 to-background',
    video: workVideos.motion,
    poster: workPosters.motion,
  },
]
