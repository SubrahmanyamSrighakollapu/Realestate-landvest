export default function GalleryCollection() {
  const tabs = ['All Photos', 'Site Layout', 'Open Plots', 'Infrastructure', 'Videos'];

  // Sample image data – replace src with your actual asset paths
  const galleryImages = [
    '/src/assets/gallery1.png',
    '/src/assets/gallery2.jpg', // or your video icon
    '/src/assets/gallery3.jpg',
    '/src/assets/gallery4.jpg',
    '/src/assets/gallery5.jpg',
    '/src/assets/gallery6.jpg',
    '/src/assets/gallery7.jpg',
    '/src/assets/gallery8.png',
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', padding: '2rem 1rem' }}>
      {/* Tabs / Filters */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab}
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: tab === 'All Photos' ? 'bold' : '500',
              color: tab === 'All Photos' ? '#fff' : '#333',
              backgroundColor: tab === 'All Photos' ? '#e67e22' : '#f0f0f0',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: tab === 'All Photos' ? '0 4px 12px rgba(230,126,34,0.3)' : 'none',
            }}
            className="gallery-tab"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Heading */}
      <h2
        style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '2rem',
          color: '#222',
        }}
        className="gallery-heading"
      >
        Showing All Photos
      </h2>

      {/* Gallery Grid */}
      <div
        className="gallery-grid"
        style={{
          display: 'grid',
          gap: '1.25rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {galleryImages.map((src, index) => (
          <div
            key={index}
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
              transition: 'transform 0.25s, box-shadow 0.25s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)';
            }}
          >
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
                aspectRatio: '4 / 3', // consistent shape – adjust if needed (e.g. 16/9)
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .gallery-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .gallery-tab {
            padding: 0.75rem 1.5rem !important;
            font-size: 1rem !important;
          }
        }
        @media (min-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem !important;
          }
          .gallery-heading {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </div>
  );
}