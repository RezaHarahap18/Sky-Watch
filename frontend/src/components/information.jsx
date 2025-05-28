import info from "../assets/images/info.jpg"; // Ensure this import matches your image path

const InfoSection = () => {
  const benefits = [
    "Memahami aktivitas di luar ruangan saat kualitas udara buruk",
    "Mengambil langkah responsif",
    "Meminimalisir risiko dan dampak jangka panjang",
    "Memberikan informasi yang akurat",
  ];

  return (
    <section className="bg-white py-5">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          {/* Text Content */}
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">Mengapa Sistem Prediksi Kami?</h2>
            <p className="text-muted mb-4">
              Dengan teknologi prediksi canggih, kami membantu Anda membuat
              keputusan yang lebih baik dengan:
            </p>
            <ul className="list-unstyled">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="d-flex align-items-start mb-3"
                  style={{ transition: "transform 0.3s ease" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateX(10px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateX(0)")
                  }
                >
                  <span className="text-primary me-3">✔</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <a
              href="/information"
              className="btn btn-success btn-lg mt-3"
              style={{
                transition: "background-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Informasi Lainnya
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
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
                src={info}
                alt="Sistem Prediksi Ilustrasi"
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

export default InfoSection;
