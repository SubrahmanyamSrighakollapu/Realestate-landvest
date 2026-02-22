import { colors } from './colors';
import QuickQuerySection from './pages/home/QuickQuerySection';

const GetInTouch = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: colors.text || '#333', paddingTop: '72px'}}>
      <section
        style={{
          backgroundColor: '#f8f9fa',
          padding: '3rem 1rem',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <h1 className="contact-title" style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold', color: '#1F6F54' }}>
          Get In Touch
        </h1>
        <p style={{ fontSize: '1rem', maxWidth: '800px', margin: '0 auto', color: '#64748b', padding: '0 1rem' }}>
          Have questions about a property or need assistance? We are here to help you find your dream home.
        </p>
      </section>

      <section
        className="contact-grid"
        style={{
          padding: '3rem 1rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1F6F54' }}>Enquiry Form</h2>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-row" style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.95rem' }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.95rem' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.95rem' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Email Address"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.95rem' }}>
                Interested In
              </label>
              <input
                type="text"
                placeholder="Green Valley Phase I"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.95rem' }}>
                Your Message
              </label>
              <textarea
                placeholder="Tell us more about your requirements..."
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#C9A24D',
                color: '#ffffff',
                padding: '0.9rem 2rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                alignSelf: 'flex-start',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b8923d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#C9A24D'}
            >
              Send Enquiry →
            </button>
          </form>
        </div>

        <div className="contact-info" style={{ backgroundColor: '#1F6F54', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', color: '#ffffff' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#ffffff' }}>Contact Information</h2>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📍</span> Our Office
            </p>
            <p style={{ lineHeight: '1.6', opacity: 0.9 }}>Door No: 12-8-42, 2nd Floor, Savithri Mallaiah Arcade<br />Lallaguda, Secunderabad, Hyderabad, Telangana-500017</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>✉</span> Email Us
            </p>
            <p style={{ opacity: 0.9 }}>Landvest2026@gmail.com</p>
          </div>

          <div>
            <p style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '1.05rem' }}>Working Hours</p>
            <p style={{ opacity: 0.9, lineHeight: '1.8' }}>Monday-Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 1rem 3rem' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            height: '400px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          }}
          className="map-container"
        >
          <iframe
            title="Office Location - HITEC City, Hyderabad"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Hyderabad,Telangana&output=embed"
          />
        </div>
      </section>

      <QuickQuerySection />

      <style>{`
        @media (min-width: 768px) {
          .contact-title {
            font-size: 2.8rem !important;
          }
          .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: start;
            padding: 4rem 2rem !important;
          }
          .form-row {
            grid-template-columns: 1fr 1fr !important;
          }
          .map-container {
            height: 500px !important;
          }
        }
        @media (max-width: 767px) {
          .contact-grid {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
          .contact-info {
            order: 2;
          }
        }
      `}</style>
    </div>
  );
};

export default GetInTouch;