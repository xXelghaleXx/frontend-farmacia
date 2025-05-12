import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#4CAF50' }}>
      <div className="container">
        {/* Marca con ícono de hoja y texto verde claro */}
        <Link
          to="/"
          className="navbar-brand fw-bold d-flex align-items-center"
          style={{ color: '#A5D6A7' }}
        >
          <img
            src="https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvMzEvMzE3MTQucG5n&ts=1747036480&sig=e2060800e0de13d881e2a442a3b2024a6d335e1fca340286a278063a304d4979"
            alt="Icono de hoja"
            width="30"
            height="30"
            className="me-2"
          />
          Farmacia
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!usuario && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-white">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link text-white">Registro</Link>
                </li>
              </>
            )}
            {usuario?.rol && (
              <li className="nav-item">
                <Link to="/productos" className="nav-link text-white">Productos</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0">
            {usuario && (
              <>
                <li className="nav-item">
                  <Link to="/perfil" className="nav-link text-white">Perfil</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-light text-success ms-2" onClick={logout}>
                    Salir
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
