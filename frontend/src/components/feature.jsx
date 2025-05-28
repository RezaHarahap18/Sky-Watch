// import machineLearning from "../assets/images/machinelearning.jpg";
import ml from "../assets/images/ml.jpg";
import devices from "../assets/images/device.jpg";
import target from "../assets/images/target.jpg";
const FeaturesSection = () => {
  const features = [
    {
      imgSrc: target, // Replace with actual image path
      imgAlt: "Realtime Prediction",
      title: "Prediksi Secara Realtime",
      description:
        "Memprediksi data secara real-time dengan akurasi tinggi untuk keputusan yang lebih cepat.",
    },
    {
      imgSrc: devices, // Replace with actual image path
      imgAlt: "Device Compatibility",
      title: "Kompatibel di Berbagai Perangkat",
      description:
        "Akses layanan kami kapan saja, di mana saja, dari perangkat apa pun.",
    },
    {
      imgSrc: ml, // Replace with actual image path
      imgAlt: "Machine Learning Technology",
      title: "Berbasis Machine Learning",
      description:
        "Teknologi canggih untuk analisis data yang cerdas dan adaptif.",
    },
  ];

  return (
    <section className="bg-light py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5">Fitur Unggulan Kami</h2>
          <p className="text-muted lead">
            Temukan keunggulan layanan kami yang dirancang untuk mendukung
            kebutuhan Anda.
          </p>
        </div>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div
                className="card h-100 border-0 shadow-sm feature-card"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0,0,0,0.05)";
                }}
              >
                <div className="card-body text-center p-4">
                  <div
                    className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "80px",
                      height: "80px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={feature.imgSrc}
                      alt={feature.imgAlt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h5 className="card-title fw-bold mb-3">{feature.title}</h5>
                  <p className="card-text text-muted">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
