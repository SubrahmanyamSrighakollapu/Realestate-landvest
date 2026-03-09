import { useState, useEffect } from 'react';
import { publicGalleryService } from '../../../services/publicGalleryService';

export default function GalleryCollection() {
  const [activeTab, setActiveTab] = useState('All');
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = ['All', 'Site Layout', 'Open Plots', 'Infrastructure', 'Videos'];

  useEffect(() => {
    fetchGalleryImages();
  }, [activeTab]);

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const category = activeTab === 'All' ? '' : activeTab;
      const response = await publicGalleryService.listImages(category);
      if (response.success) {
        setGalleryImages(response.data);
      }
    } catch (error) {
      console.error('Failed to load gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', padding: '2rem 1rem' }}>
      
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: tab === activeTab ? 'bold' : '500',
              color: tab === activeTab ? '#fff' : '#333',
              backgroundColor: tab === activeTab ? '#e67e22' : '#f0f0f0',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow:
                tab === activeTab
                  ? '0 4px 12px rgba(230,126,34,0.3)'
                  : 'none',
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
        Showing {activeTab}
      </h2>

      {/* Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          Loading images...
        </div>
      ) : galleryImages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          No images found in this category
        </div>
      ) : (
        /* Gallery Grid */
        <div
          className="gallery-grid"
          style={{
            display: 'grid',
            gap: '1.25rem',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          {galleryImages.map((image) => (
            <div
              key={image._id}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                transition: 'transform 0.25s, box-shadow 0.25s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow =
                  '0 12px 30px rgba(0,0,0,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(0,0,0,0.12)';
              }}
            >
              {image.category === 'Videos' ? (
                <video
                  src={`https://api.landvestinfra.com/${image.file}`}
                  controls
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                    aspectRatio: '4 / 3',
                    backgroundColor: '#000',
                  }}
                />
              ) : (
                <img
                  src={`https://api.landvestinfra.com/${image.file}`}
                  alt={image.category}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                    aspectRatio: '4 / 3',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

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
