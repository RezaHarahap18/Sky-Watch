import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg px-3" style={{ backgroundColor: '#4ED7F1' }}>
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="Logo" width={50} className="me-2"/>
        <span style={{ fontSize : '24px', fontFamily: 'Gabriela, serif', color: 'white'}}>SkyWatch</span>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Beranda</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pollution">Polusi</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/information">Informasi</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
