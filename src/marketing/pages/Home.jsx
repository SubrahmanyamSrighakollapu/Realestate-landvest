import Hero from './home/Hero';
import WhyInvestUsSection from './home/WhyInvestUsSection';
import OurProjectsSection from './home/OurProjectsSection';
import SmartInvestmentPathSection from './home/SmartInvestmentPathSection';
import TestimonialsSection from './home/TestimonialsSection';
import QuickQuerySection from './home/QuickQuerySection';

const Home = () => {
  return (
    <div>
      <Hero />
      <WhyInvestUsSection />
      <OurProjectsSection />
      <SmartInvestmentPathSection />
      <TestimonialsSection />
      <QuickQuerySection />
    </div>
  );
};

export default Home;