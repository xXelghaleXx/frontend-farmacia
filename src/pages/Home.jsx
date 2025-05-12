import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="text-danger fw-bold">Bienvenido a Farmacia Vital</h1>
          <p className="lead mt-3">
            {usuario
              ? `Hola ${usuario.username}, estás logueado como ${usuario.rol}.`
              : 'Por favor, inicia sesión o regístrate para comenzar a gestionar productos.'}
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
            alt="Farmacia"
            className="img-fluid mt-4"
            style={{ maxWidth: '200px' }}
          />
        </Col>
      </Row>
    </Container>
  );
}
