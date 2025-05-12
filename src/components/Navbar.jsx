import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">Farmacia</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!usuario && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Registro</Link>
                </li>
              </>
            )}
            {usuario?.rol && (
              <li className="nav-item">
                <Link to="/productos" className="nav-link">Productos</Link>
              </li>
            )}
          </ul>

          {usuario && (
            <button className="btn btn-outline-light" onClick={logout}>
              Salir
            </button>
          )}
          {usuario && (
            <li className="nav-item">
              <Link to="/perfil" className="nav-link">Perfil</Link>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
}
