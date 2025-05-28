const Footer = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year

  return (
    <footer
      className="bg-dark text-white py-5"
      style={{
        background: "linear-gradient(180deg, #1c2526 0%, #2c3e50 100%)",
      }}
    >
      <div className="container">
        <div className="row g-4">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6 text-center text-md-start">
            <h4 className="fw-bold mb-3">Sky Watch</h4>
            <p className="text-muted">
              Solusi prediksi kualitas udara berbasis teknologi ARIMA untuk
              lingkungan yang lebih baik.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-lg-4 col-md-6 text-center">
            <h5 className="fw-bold mb-3">Navigasi</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="/"
                  className="text-white text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1e90ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#ffffff")
                  }
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/"
                  className="text-white text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1e90ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#ffffff")
                  }
                >
                  About
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/pollution"
                  className="text-white text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1e90ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#ffffff")
                  }
                >
                  Predict
                </a>
              </li>
              <li>
                <a
                  href="/information"
                  className="text-white text-decoration-none"
                  style={{ transition: "color 0.3s ease" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1e90ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#ffffff")
                  }
                >
                  Education
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-12 text-center text-md-end">
            <h5 className="fw-bold mb-3">Hubungi Kami</h5>
            <p className="mb-2">Email: info@skywatch.com</p>
            <p className="mb-2">Telepon: +62 123 456 7890</p>
            <p>Alamat: Jl. Lingkungan Sehat No. 123, Jakarta</p>
          </div>
        </div>
        <hr className="my-4" style={{ borderColor: "rgba(255,255,255,0.2)" }} />
        <div className="text-center">
          <small>© {currentYear} Sky Watch. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
