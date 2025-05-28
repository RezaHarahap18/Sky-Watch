import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-white shadow-sm rounded-pill px-3 px-md-4 py-2 fixed-top mx-auto"
        style={{
          maxWidth: "900px",
          maxHeight: "50px",
          margin: "1rem auto",
          zIndex: 1030,
        }}
      >
        <div className="container-fluid d-flex align-items-center">
          {/* Logo - left of brand on small screens, right on large */}
          <div
            className="bg-light rounded-circle d-flex justify-content-center align-items-center order-0 order-lg-2 ms-0 ms-lg-2"
            style={{ width: "36px", height: "36px", overflow: "hidden" }}
          >
            <img
              src={logo}
              alt="Weather Icon"
              className="w-100 h-100 object-fit-contain"
            />
          </div>

          {/* Brand - after logo on small screens, left on large */}
          <Link
            className="navbar-brand fw-bold text-dark ms-2 order-1 order-lg-0"
            to="/"
          >
            Sky Watch
          </Link>

          {/* Toggle button - always on the right */}
          <button
            className="navbar-toggler order-2 ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links - centered on large screens, stacked on small */}
          <div
            className="collapse navbar-collapse justify-content-center order-3 order-lg-1"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link mx-1 mx-md-2 fw-medium text-dark text-white-collapsed"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link mx-1 mx-md-2 fw-medium text-dark text-white-collapsed"
                  to="/pollution"
                >
                  Predict
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link mx-1 mx-md-2 fw-medium text-dark text-white-collapsed"
                  to="/information"
                >
                  Education
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>
        {`
          @media (max-width: 991.98px) {
            .navbar-collapse {
              background-color: rgba(0, 0, 0, 0.7);
              padding: 0.75rem;
              margin-top: 0.5rem;
              border-radius: 0.5rem;
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              z-index: 1029;
            }
            .text-white-collapsed {
              color: white !important;
            }
            .navbar {
              height: 56px; /* Fixed height to prevent expansion */
            }
          }
        `}
      </style>
    </>
  );
}

export default Navbar;
