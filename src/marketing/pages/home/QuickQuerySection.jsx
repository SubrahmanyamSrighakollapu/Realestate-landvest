import { Mail } from "lucide-react";

const QuickQuerySection = () => {
  const inputStyle = {
    width: "100%",
    padding: "0.7rem 0.75rem",
    borderRadius: "6px",
    border: "1px solid #D1D5DB",
    fontSize: "0.9rem",
    outline: "none",
  };

  return (
    <section
      style={{
        backgroundColor: "#1F6F54",
        padding: "4rem 1rem",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, color: "#FFFFFF", minWidth: "280px", maxWidth: "600px" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1rem",
              lineHeight: "1.2",
            }}
            className="query-title"
          >
            Ready to find your dream plot?
          </h2>

          <p
            style={{
              fontSize: "0.95rem",
              opacity: 0.9,
              maxWidth: "520px",
              marginBottom: "2rem",
              lineHeight: "1.6",
            }}
          >
            Schedule a free site visit this weekend. We provide
            complimentary pick-up and drop-off services for site
            inspections.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "#EAF5F1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Mail size={20} color="#1F6F54" />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                  Email Us
                </div>
                <strong style={{ fontSize: "0.95rem" }}>
                  Landvest2026@gmail.com
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "360px",
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            padding: "1.75rem",
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h3
            style={{
              fontSize: "1.15rem",
              fontWeight: "600",
              marginBottom: "1.25rem",
              color: "#111827",
            }}
          >
            Quick Enquiry
          </h3>

          <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Enter Name"
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Enter Phone Number"
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Green Valley Phase I"
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                marginTop: "0.5rem",
                backgroundColor: "#C9A24D",
                color: "#FFFFFF",
                padding: "0.75rem",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "0.95rem",
              }}
            >
              Request Callback
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .query-title {
            font-size: 2.6rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default QuickQuerySection;