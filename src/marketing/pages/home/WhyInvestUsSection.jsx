import {
  ShieldCheck,
  Landmark,
  TrendingUp,
  Handshake
} from 'lucide-react';
import { colors } from '../../colors';
import whyInvestImage from '../../../assets/why-invest-us-image.jpg';

const WhyInvestUsSection = () => {
  const features = [
    {
      title: '100% Clear Title',
      description:
        'Every project undergoes strict legal scrutiny. We guarantee plots free from litigation or encumbrances.',
      icon: ShieldCheck,
    },
    {
      title: 'Govt. Approved',
      description:
        'All our layouts are DTCP & RERA-approved, ensuring hassle-free construction permissions and loan access.',
      icon: Landmark,
    },
    {
      title: 'High Appreciation',
      description:
        'Located in rapidly developing areas near SEZs and highways to ensure maximum ROI for you.',
      icon: TrendingUp,
    },
    {
      title: 'Post-Sales Support',
      description:
        'From registration assistance to project maintenance and fencing, we stay with you.',
      icon: Handshake,
    },
  ];

  const benefits = [
    {
      title: 'Strong Investment Returns',
      description:
        'Invest in premium land assets that deliver reliable long-term growth.',
    },
    {
      title: 'Wide Property Selection',
      description:
        'Build a balanced real estate portfolio with multiple property choices.',
    },
    {
      title: 'Protection Against Inflation',
      description:
        'Safeguard your wealth with assets that retain value as prices rise.',
    },
  ];

  return (
    <section
      style={{
        marginTop: '2rem',
        padding: '1rem 0',
        backgroundColor: colors.backgroundLight,
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
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2
            style={{
              fontSize: '2.4rem',
              fontWeight: '600',
              color: colors.primary,
              marginBottom: '0.75rem',
            }}
          >
            Why Invest With Us?
          </h2>
          <p
            style={{
              fontSize: '1.2rem',
              color: colors.textLight,
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            We don't just sell plots, we build wealth. Our rigorous selection
            process ensures your investment is safe, secure, and profitable.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    border: `2px solid ${colors.primary}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}
                >
                  <Icon size={28} color={colors.primary} strokeWidth={1.75} />
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: '600',
                    color: colors.text,
                    marginBottom: '0.5rem',
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: colors.textLight,
                    lineHeight: '1.6',
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="why-invest-grid"
        >
          <div
            style={{
              height: '350px',
              borderRadius: '12px',
              backgroundImage: `url(${whyInvestImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                style={{
                  padding: '1.5rem 1.75rem',
                  backgroundColor: colors.background,
                  borderRadius: '12px',
                  border: `1.5px solid ${colors.primary}`,
                }}
              >
                <h4
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: '600',
                    color: colors.text,
                    marginBottom: '0.4rem',
                  }}
                >
                  {benefit.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: colors.textLight,
                    lineHeight: '1.6',
                  }}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .why-invest-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyInvestUsSection;