import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import ArtistsSection from '../sections/ArtistsSection'
import GallerySection from '../sections/GallerySection'
import TestimonialsSection from '../sections/TestimonialsSection'
import NewsletterSection from '../sections/NewsletterSection'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function HomePage() {
  return (
    <>
      <Navbar dark />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ArtistsSection />
        <GallerySection />
        <TestimonialsSection />
        <NewsletterSection />
        <Footer />
      </main>
    </>
  )
}
