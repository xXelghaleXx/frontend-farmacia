import { Container, Card, Row, Col } from 'react-bootstrap';

export default function PerfilUsuario() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario) {
    return (
      <Container className="mt-5 text-center">
        <h3 style={{ color: '#4CAF50' }}>No has iniciado sesión</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Header
              className="text-white fw-bold text-center"
              style={{ backgroundColor: '#4CAF50' }}
            >
              Perfil de Usuario
            </Card.Header>
            <Card.Body>
              <p><strong>Usuario:</strong> {usuario.username}</p>
              <p><strong>Correo:</strong> {usuario.correo || '(correo no mostrado en login)'}</p>
              <p><strong>Rol:</strong> {usuario.rol}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
