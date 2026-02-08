import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { IntentSection } from '@/components/intent-section';
import { ScrollToTop } from '@/components/scroll-to-top';
import { TrustSection } from '@/components/trust-section';

export default function Page() {
  return (
    <main className='min-h-screen bg-background text-foreground'>
      <Header />
      <HeroSection />
      <TrustSection />
      <IntentSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
