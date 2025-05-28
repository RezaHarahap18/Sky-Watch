import React from "react";
import airQuality from "../assets/images/airquality.jpg";
import air from "../assets/images/air.jpg";


const AboutSection = () => {
  const aboutCards = [
    {
      imgSrc: airQuality,
      imgAlt: "Air Quality Sensor",
      title: "Sky Watch: Data Lingkungan",
      description:
        "Data seperti suhu, kelembapan, dan partikel debu dikumpulkan melalui sensor, lalu dianalisis untuk menghasilkan nilai Indeks Kualitas Udara (AQI).",
    },
    {
      imgSrc: air,
      imgAlt: "Air Quality Prediction",
      title: "Sky Watch: Prediksi Real-Time",
      description:
        "Sistem ini dirancang untuk memprediksi kualitas udara secara real-time menggunakan kombinasi sensor lingkungan dan model machine learning.",
      workflow: ["Data", "Model", "Hasil"],
    },
  ];

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5">Tentang Sky Watch</h2>
        <p className="text-muted lead">
          Solusi canggih untuk memantau dan memprediksi kualitas udara dengan
          teknologi mutakhir.
        </p>
      </div>
      <div className="row g-4 justify-content-center">
        {aboutCards.map((card, index) => (
          <div key={index} className="col-md-6 col-lg-5">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{
                borderRadius: "15px",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                maxWidth: "600px",
                margin: "0 auto",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
              }}
            >
              <div className="row g-0 h-100">
                <div className="col-5">
                  <img
                    src={card.imgSrc}
                    alt={card.imgAlt}
                    className="img-fluid rounded-start"
                    style={{
                      width: "200px",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-7 d-flex flex-column">
                  <div className="card-body d-flex flex-column p-3">
                    <h5 className="card-title fw-bold mb-2">{card.title}</h5>
                    <p className="card-text text-muted mb-2 flex-grow-1">
                      {card.description}
                    </p>
                    {card.workflow && (
                      <div className="d-flex justify-content-start align-items-center gap-2">
                        {card.workflow.map((step, idx) => (
                          <React.Fragment key={idx}>
                            <span
                              className="px-2 py-1 rounded text-white"
                              style={{
                                background:
                                  "linear-gradient(90deg, #9A9AFF, #353589)",
                                fontSize: "0.85rem",
                              }}
                            >
                              {step}
                            </span>
                            {idx < card.workflow.length - 1 && (
                              <span className="mx-1">➔</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
