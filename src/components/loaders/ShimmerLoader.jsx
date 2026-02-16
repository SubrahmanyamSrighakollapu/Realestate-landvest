import React from 'react';

export const TableShimmer = ({ rows = 5, columns = 6 }) => (
  <div style={{ width: '100%' }}>
    <style>{`
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      .shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
      }
    `}</style>
    {[...Array(rows)].map((_, i) => (
      <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        {[...Array(columns)].map((_, j) => (
          <div key={j} className="shimmer" style={{ 
            height: '40px', 
            flex: 1, 
            borderRadius: '4px' 
          }} />
        ))}
      </div>
    ))}
  </div>
);

export const CardShimmer = ({ count = 4 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
    <style>{`
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      .shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
      }
    `}</style>
    {[...Array(count)].map((_, i) => (
      <div key={i} style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
      }}>
        <div className="shimmer" style={{ height: '20px', width: '60%', borderRadius: '4px', marginBottom: '12px' }} />
        <div className="shimmer" style={{ height: '32px', width: '40%', borderRadius: '4px', marginBottom: '8px' }} />
        <div className="shimmer" style={{ height: '16px', width: '50%', borderRadius: '4px' }} />
      </div>
    ))}
  </div>
);

export const ProfileShimmer = () => (
  <div>
    <style>{`
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      .shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
      }
    `}</style>
    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
        <div className="shimmer" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <div style={{ flex: 1 }}>
          <div className="shimmer" style={{ height: '28px', width: '200px', borderRadius: '4px', marginBottom: '12px' }} />
          <div className="shimmer" style={{ height: '16px', width: '300px', borderRadius: '4px', marginBottom: '8px' }} />
          <div className="shimmer" style={{ height: '16px', width: '250px', borderRadius: '4px', marginBottom: '8px' }} />
          <div className="shimmer" style={{ height: '16px', width: '280px', borderRadius: '4px' }} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="shimmer" style={{ height: '100px', borderRadius: '8px' }} />
        ))}
      </div>
    </div>
  </div>
);
