import aboutImage from '../../../assets/main-about-us-image.png';
import { colors } from '../../colors';

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
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '3rem',
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
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#2f7d5a',
                marginBottom: '0.5rem',
              }}
            >
              About Us
            </p>

            <h2
              style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1.2rem',
              }}
            >
              Building Legacies on Solid Ground
            </h2>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#4b5563',
                marginBottom: '1.2rem',
              }}
            >
              We curate the foundation for your future. It is a forward-thinking real
              estate development company committed to making land ownership simple,
              secure, and accessible for everyone. Built on integrity, transparency,
              and customer-centric values, we focus on creating well-planned
              developments that deliver long-term value and peace of mind.
            </p>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#4b5563',
                marginBottom: '1.2rem',
              }}
            >
              With over 20 years of experience, our leadership CMD Mr. Chandra Shekhar
              Ayyakari ED Mr. Arun Kumar Bidla drives the development of quality
              infrastructure and high-value projects.
            </p>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#4b5563',
              }}
            >
              We specialize in legally compliant, well-planned developments that offer
              long-term growth and peace of mind for our clients.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '3.5rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '260+', label: 'Projects Completed' },
            { value: '10+', label: 'Years Of Trust' },
            { value: '5k+', label: 'Happy Families' },
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
                {item.value}
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
    </section>
  );
};

export default MainAboutUs;