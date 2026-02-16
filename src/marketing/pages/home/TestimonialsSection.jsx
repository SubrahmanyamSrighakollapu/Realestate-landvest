import testimonial1 from '../../../assets/testimonial-image1.png';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Inventor, Hyderabad",
      text:
        "I bought a plot in Green Valley 3 years ago. The value has nearly doubled! The registration process was incredibly smooth and transparent.",
      img: testimonial1,
    },
    {
      name: "Priya Reddy",
      role: "Inventor, Hyderabad",
      text:
        "As an NRI, I was worried about managing property in India. OpenPlots team handled everything from fencing to legal checks remotely.",
      img: testimonial1,
    },
    {
      name: "Anil Gupta",
      role: "Inventor, Hyderabad",
      text:
        "The best part was no hidden charges. The price quoted was all-inclusive. Very professional and great locations.",
      img: testimonial1,
    },
  ];

  return (
    <section
      style={{
        padding: "6rem 0",
        backgroundColor: "#FFFFFF",
        position: "relative",
        width: "100%",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h2 style={{ fontSize: "2.3rem", fontWeight: 700, color: "#1F6F54" }}>
          Our Testimonials
        </h2>
        <p style={{ color: "#7A8C85", marginTop: "0.4rem" }}>
          What Our Customers Says
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "80px",
          fontSize: "6rem",
          color: "#EAF5F1",
          fontFamily: "serif",
        }}
      >
        "
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          padding: "0 1rem"
        }}
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#FFFFFF",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.6",
                color: "#6B7C73",
                marginBottom: "1.8rem",
              }}
            >
              "{item.text}"
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <strong style={{ fontSize: "0.95rem" }}>{item.name}</strong>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#8A9C95",
                  }}
                >
                  {item.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "60px",
          right: "80px",
          fontSize: "6rem",
          color: "#EAF5F1",
          fontFamily: "serif",
        }}
      >
        "
      </div>
    </section>
  );
};

export default TestimonialsSection;