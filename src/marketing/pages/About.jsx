import MainAboutUs from './about/MainAboutUs';
import CorePhilosophy from './about/CorePhilosophy';
import MeetOurExpertTeam from './about/MeetOurExpertTeam';
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

const About = () => {
  return (
    <div style={{ paddingTop: '72px' }}>
      <AnimatedSection direction="up">
        <MainAboutUs />
      </AnimatedSection>
      <AnimatedSection direction="up">
        <CorePhilosophy />
      </AnimatedSection>
      {/* <AnimatedSection direction="up">
        <MeetOurExpertTeam />
      </AnimatedSection> */}
      <AnimatedSection direction="up">
        <QuickQuerySection/>
      </AnimatedSection>
    </div>
  );
};

export default About;