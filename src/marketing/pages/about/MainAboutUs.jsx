import { useState, useEffect, useRef } from 'react';
import aboutImage from '../../../assets/main-about-us-image.png';
import { colors } from '../../colors';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const MainAboutUs = () => {
  return (
    <section
      style={{
        padding: '3rem 0',
        backgroundColor: '#f9fdfb',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
            }}
          >
            <img
              src={aboutImage}
              alt="About Us"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          <div>
            <p
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#2f7d5a',
                marginBottom: '0.5rem',
              }}
              className="about-subtitle"
            >
              About Us
            </p>

            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1rem',
              }}
              className="about-title"
            >
              Landvet Infra Developers Pvt. Ltd.
            </h2>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#4b5563',
                marginBottom: '1.2rem',
              }}
            >
             Next-Level Open Plotting. Smart Investments. Strong Returns.
            </p>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#4b5563',
                marginBottom: '1.2rem',
              }}
            >
              Landvest Infra Developers Pvt. Ltd. is a visionary real estate company focused on premium open plotting developments. With over 20 years of real estate and marketing expertise, our MD Mr. Arun Kumar Bitla leads with a mission to make land ownership secure, affordable, and rewarding for every individual.

            </p>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#4b5563',
              }}
            >
              We develop legally clear, strategically located, and future-ready layouts designed for long-term appreciation and lifestyle growth.

            </p>
          </div>
        </div>

        <div
          className="stats-grid"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '3rem',
            flexWrap: 'wrap',
          }}
        >
  {[
    { value: 260, label: 'Projects Completed', suffix: '+' },
    { value: 10, label: 'Years Of Trust', suffix: '+' },
    { value: 5000, label: 'Happy Families', suffix: '+' },
  ].map((item) => (
    <div
      key={item.label}
      style={{
        backgroundColor: '#ffffff',
        padding: '2rem 3rem',
        borderRadius: '10px',
        textAlign: 'center',
        minWidth: '200px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb',
      }}
    >
      <h3
        style={{
          fontSize: '1.6rem',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '0.4rem',
        }}
      >
        <AnimatedCounter end={item.value} suffix={item.suffix} />
      </h3>
      <p
        style={{
          fontSize: '0.95rem',
          color: '#6b7280',
        }}
      >
        {item.label}
      </p>
    </div>
  ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr 1.1fr !important;
            gap: 3rem !important;
          }
          .about-subtitle {
            font-size: 1.5rem !important;
          }
          .about-title {
            font-size: 2rem !important;
            margin-bottom: 1.2rem !important;
          }
          .stats-grid {
            gap: 2rem !important;
            margin-top: 3.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default MainAboutUs;