import comingSoonImage from '../../assets/coming-soon.png';

const ComingSoon = ({ title = "Coming Soon" }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      textAlign: 'center'
    }}>
      <img 
        src={comingSoonImage} 
        alt="Coming Soon" 
        style={{
          maxWidth: '500px',
          width: '100%',
          height: 'auto',
          borderRadius: '12px',
        }}
      />
      {/* <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: 'rgba(31, 111, 84, 1)',
        marginBottom: '10px'
      }}>
        {title}
      </h2> */}
      <p style={{
        fontSize: '16px',
        color: '#6b7280'
      }}>
        We're working on this feature. Stay tuned!
      </p>
    </div>
  );
};

export default ComingSoon;
