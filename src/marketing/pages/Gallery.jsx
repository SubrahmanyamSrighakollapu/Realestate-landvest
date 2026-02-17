import SiteGallery from './gallery/SiteGallery';
import GalleryCollection from './gallery/GalleryCollection';
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

const Gallery = () => {
  return (
    <div>
      <AnimatedSection direction="up">
        <SiteGallery />
      </AnimatedSection>
      <AnimatedSection direction="up">
        <GalleryCollection />
      </AnimatedSection>
      <AnimatedSection direction="up">
        <QuickQuerySection />
      </AnimatedSection>
    </div>
  );
};

export default Gallery;