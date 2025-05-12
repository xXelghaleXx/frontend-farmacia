import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          {/* Título con verde hoja */}
          <h1 style={{ color: '#4CAF50' }} className="fw-bold">
            Bienvenido a Farmacia Vital
          </h1>

          <p className="lead mt-3">
            {usuario
              ? `Hola ${usuario.username}, estás logueado como ${usuario.rol}.`
              : 'Por favor, inicia sesión o regístrate para comenzar a gestionar productos.'}
          </p>

          {/* Ícono de hoja desde Flaticon */}
          <img
            src="https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvMjkxNy8yOTE3OTk1LnBuZw==&ts=1747036401&sig=8598c85e2d6b2c97ae90642a566706675f1abc0c1aa906435e455152d27b8a92"
            alt="Icono hoja"
            className="img-fluid mt-4"
            style={{ maxWidth: '120px' }}
          />
        </Col>
      </Row>
    </Container>
  );
}
