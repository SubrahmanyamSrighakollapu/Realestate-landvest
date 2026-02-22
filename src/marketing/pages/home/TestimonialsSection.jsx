import testimonial1 from '../../../assets/testimonial-image1.jpeg';
import testimonial2 from '../../../assets/testimonial-image2.jpeg';
import testimonial3 from '../../../assets/testimonial-image3.jpeg';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Satya Phanindra",
      // role: "Inventor, Hyderabad",
      text:
        "I recently purchased a plot in Sadhnagar from Landvest, and the entire process was smooth and transparent. Their team was professional, supportive, and guided me clearly at every step. Truly satisfied with their service.",
      img: testimonial1,
    },
    {
      name: "Hema",
      // role: "Inventor, Hyderabad",
      text:
        "I recently invested in a plot through Landvest in Adibatla, and the experience was excellent from start to finish. The team was knowledgeable, responsive, and ensured all my queries were addressed promptly.",
      img: testimonial2,
    },
    {
      name: "Pedapudi Samuel Raju",
      // role: "Inventor, Hyderabad",
      text:
        "Purchasing a plot with Landvest in Shadnagar was a hassle-free experience. Their staff was courteous, well-informed, and guided me through each step with clarity and patience.",
      img: testimonial3,
    },
  ];

  return (
    <section
      style={{
        padding: "4rem 1rem",
        backgroundColor: "#FFFFFF",
        position: "relative",
        width: "100%",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1F6F54" }}>
          Our Testimonials
        </h2>
        <p style={{ color: "#7A8C85", marginTop: "0.4rem", fontSize: "0.95rem" }}>
          What Our Customers Says
        </p>
      </div>

      <div
        className="quote-left"
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
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          padding: "0 1rem"
        }}
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#FFFFFF",
              padding: "1.75rem",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: "1.6",
                color: "#6B7C73",
                marginBottom: "1.5rem",
              }}
            >
              "{item.text}"
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <strong style={{ fontSize: "0.9rem" }}>{item.name}</strong>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#8A9C95",
                  }}
                >
                  {/* {item.role} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="quote-right"
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

      <style>{`
        @media (max-width: 768px) {
          .quote-left, .quote-right { display: none; }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;