import { FeaturesSection } from '@/components/home/FeaturesSection'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { WhyChooseSection } from '@/components/home/WhyChooseSection'
import { MissionSection } from '@/components/home/MissionSection'

export function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-0.5">
      <HeroSection />
      <FeaturesSection />
      <WhyChooseSection />
      <ServicesSection />
      <MissionSection />
      <footer className="flex items-center justify-center pb-10 px-4">
        <p className="text-foreground/50 text-center text-sm md:text-base">© 2025 Vet Sync App</p>
      </footer>
    </div>
  )
}
