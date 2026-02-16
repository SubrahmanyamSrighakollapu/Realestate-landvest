import galleryImage from '../../../assets/gallery-bg.jpg';

const SiteGallery = () => {
  return (
    <section
      style={{
        position: 'relative',
        height: '85vh',
        minHeight: '620px',
        backgroundImage: `url(${galleryImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // left align container
        color: 'white',
        textAlign: 'left', // left align text
        width: '100%',
        paddingLeft: '6%', // space from left
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.72) 100%)',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '960px',
          padding: '0 1.5rem',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.2rem)', // decreased size
            fontWeight: 500,
            lineHeight: 1.1,
            margin: '0 0 1.2rem 0',
            letterSpacing: '-0.02em',
            color: '#ffffff', // full white
            textShadow: '0 4px 18px rgba(0,0,0,0.75)',
          }}
        >
          Site Gallery
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: '760px',
            margin: 0,
            opacity: 0.94,
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          Explore our approved open plots, premium amenities, and latest development
          progress through our lens.
        </p>
      </div>
    </section>
  );
};

export default SiteGallery;