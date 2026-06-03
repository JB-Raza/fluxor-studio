import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from '../ui/CustomCursor'
import BackToTop from '../ui/BackToTop'
import ScrollProgressBar from '../motion/ScrollProgressBar'

export default function Layout() {
  return (
    <>
      <CustomCursor color="#7c5cfc" />
      <ScrollProgressBar />
      <Navbar />
      <Outlet />
      <Footer />
      <BackToTop />
    </>
  )
}
