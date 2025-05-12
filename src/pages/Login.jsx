import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
      navigate('/');
    } catch {
      setError('Credenciales inválidas');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {/* Título verde hoja */}
          <h2 className="text-center mb-4" style={{ color: '#4CAF50' }}>
            Iniciar Sesión
          </h2>

          {error && (
            <Alert variant="success" className="text-success">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Ingresa tu usuario"
                value={form.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Botón verde hoja */}
            <Button
              type="submit"
              className="w-100"
              style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
            >
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
