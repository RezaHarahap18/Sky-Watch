import arima from "../assets/images/arima-model-scaled.jpg"; // Ensure this import matches your image path

const ArimaSection = () => {
  return (
    <section
      className="py-5 text-white"
      style={{
        background: "linear-gradient(135deg, #004080 0%, #0066cc 100%)",
      }}
    >
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 mb-3">
            Prediksi Canggih dengan ARIMA
          </h2>
          <p className="lead" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Sistem kami menggunakan model{" "}
            <strong>ARIMA (AutoRegressive Integrated Moving Average)</strong>{" "}
            untuk analisis data yang akurat dan andal.
          </p>
        </div>
        <div className="row align-items-center g-5">
          {/* Text Content */}
          <div className="col-lg-6">
            <h4 className="fw-bold mb-3">Bagaimana ARIMA Bekerja?</h4>
            <p className="mb-4">
              ARIMA menganalisis pola historis dari data seperti suhu,
              kelembapan, tekanan udara, dan lainnya. Model ini sangat efektif
              untuk menangani data dengan tren dan fluktuasi yang berlangsung
              seiring waktu, memberikan prediksi yang presisi untuk pengambilan
              keputusan.
            </p>
            <a
              href="#learn-more"
              className="btn btn-outline-light btn-lg"
              style={{
                transition: "background-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
          {/* Image */}
          <div className="col-lg-6 text-center">
            <div
              className="image-container"
              style={{
                maxWidth: "500px",
                margin: "0 auto",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={arima}
                alt="Diagram Model ARIMA"
                className="img-fluid"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArimaSection;
