import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from '../ui/CustomCursor'
import BackToTop from '../ui/BackToTop'
import ScrollProgressBar from '../motion/ScrollProgressBar'

export default function Layout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[200] rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <CustomCursor color="#7c5cfc" />
      <ScrollProgressBar />
      <Navbar />
      <Outlet />
      <Footer />
      <BackToTop />
    </>
  )
}
