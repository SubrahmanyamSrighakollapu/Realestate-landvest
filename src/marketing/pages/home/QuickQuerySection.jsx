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
        padding: "5rem 0",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "4rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, color: "#FFFFFF", minWidth: "320px" }}>
          <h2
            style={{
              fontSize: "2.6rem",
              fontWeight: "700",
              marginBottom: "1.2rem",
              lineHeight: "1.2",
            }}
          >
            Ready to find your dream plot?
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              opacity: 0.9,
              maxWidth: "520px",
              marginBottom: "2.5rem",
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
                <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                  Email Us
                </div>
                <strong style={{ fontSize: "1rem" }}>
                  Landvest2026@gmail.com
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "360px",
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
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
    </section>
  );
};

export default QuickQuerySection;