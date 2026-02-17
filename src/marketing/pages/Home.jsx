import Hero from './home/Hero';
import WhyInvestUsSection from './home/WhyInvestUsSection';
import OurProjectsSection from './home/OurProjectsSection';
import SmartInvestmentPathSection from './home/SmartInvestmentPathSection';
import TestimonialsSection from './home/TestimonialsSection';
import QuickQuerySection from './home/QuickQuerySection';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AnimatedSection = ({ children, direction = 'up' }) => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  const animations = {
    up: {
      transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
      opacity: isVisible ? 1 : 0,
    },
    left: {
      transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
      opacity: isVisible ? 1 : 0,
    },
    right: {
      transform: isVisible ? 'translateX(0)' : 'translateX(60px)',
      opacity: isVisible ? 1 : 0,
    },
  };

  return (
    <div
      ref={ref}
      style={{
        ...animations[direction],
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {children}
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <Hero />
      <AnimatedSection direction="up">
        <WhyInvestUsSection />
      </AnimatedSection>
      <AnimatedSection direction="up">
        <OurProjectsSection />
      </AnimatedSection>
      <AnimatedSection direction="up">
        <SmartInvestmentPathSection />
      </AnimatedSection>
      <AnimatedSection direction="up">
        <TestimonialsSection />
      </AnimatedSection>
      <AnimatedSection direction="up">
        <QuickQuerySection />
      </AnimatedSection>
    </div>
  );
};

export default Home;