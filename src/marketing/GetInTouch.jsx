import { colors } from './colors';

const GetInTouch = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: colors.text || '#333'}}>
      <section
        style={{
          backgroundColor: '#f8f9fa',
          padding: '4rem 2rem',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          Get In Touch
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Have questions about a property or need assistance? We are here to help you find your dream home.
        </p>
      </section>

      <section
        style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'stretch',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Enquiry Form</h2>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: `1px solid ${colors.border || '#ccc'}`,
                    borderRadius: '5px',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: `1px solid ${colors.border || '#ccc'}`,
                    borderRadius: '5px',
                    fontSize: '1rem',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Email Address"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: `1px solid ${colors.border || '#ccc'}`,
                  borderRadius: '5px',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>
                Interested In
              </label>
              <input
                type="text"
                placeholder="Green Valley Phase I"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: `1px solid ${colors.border || '#ccc'}`,
                  borderRadius: '5px',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>
                Your Message
              </label>
              <textarea
                placeholder="Tell us more about your requirements..."
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: `1px solid ${colors.border || '#ccc'}`,
                  borderRadius: '5px',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: colors.button || '#e67e22',
                color: colors.background || 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              Send Enquiry →
            </button>
          </form>
        </div>

        <div style={{ backgroundColor: colors.background || '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Contact Information</h2>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              <span style={{ marginRight: '0.5rem' }}>📍</span> Our Office
            </p>
            <p>5th Floor, Tech Park Tower<br />Hitec City, Madhapur, Telangana 500081</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              <span style={{ marginRight: '0.5rem' }}>☎</span> Phone Number
            </p>
            <p>+91 9887654321</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              <span style={{ marginRight: '0.5rem' }}>✉</span> Email Us
            </p>
            <p>realestate@gmail.com</p>
          </div>

          <div>
            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Working Hours</p>
            <p>Monday-Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 2rem 4rem' }}>
        <div
          style={{
            width: '100%',
            height: '500px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          }}
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
    </div>
  );
};

export default GetInTouch;