import React from "react";
import hero from "../assets/images/image.jpg";

const HeroSection = () => {
  return (
    <section
      className="position-relative text-white overflow-hidden"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div className="container d-flex flex-column flex-md-row align-items-end justify-content-between gap-4">
        <div className="text-start" style={{ maxWidth: "600px" }}>
          <h1 className="display-4 fw-bold mb-3">
            Prediksi Kualitas Udara di Jakarta
          </h1>
          <p className="lead mb-4">
            Sistem prediksi kualitas udara kami memberikan data real-time untuk
            mendukung keputusan Anda setiap hari.
          </p>
          <a
            href="/pollution"
            className="btn btn-primary btn-lg"
            style={{
              background: "linear-gradient(90deg, #9A9AFF, #353589)",
              border: "none",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Lihat Prediksi Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
