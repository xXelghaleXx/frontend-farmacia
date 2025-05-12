import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '' });
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const cargarProductos = async () => {
    const res = await api.get('/productos');
    setProductos(res.data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const crearProducto = async (e) => {
    e.preventDefault();
    try {
      await api.post('/productos', form);
      setForm({ nombre: '', precio: '', stock: '' });
      cargarProductos();
      setError('');
    } catch {
      setError('No autorizado para crear productos');
    }
  };

  const actualizarProducto = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/productos/${editando}`, form);
      setEditando(null);
      setForm({ nombre: '', precio: '', stock: '' });
      cargarProductos();
      setError('');
    } catch {
      setError('No autorizado para editar productos');
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await api.delete(`/productos/${id}`);
      cargarProductos();
      setError('');
    } catch {
      setError('Solo el admin puede eliminar productos');
    }
  };

  const editar = (producto) => {
    setEditando(producto.id);
    setForm({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{ color: '#4CAF50' }}>
        Lista de Productos
      </h2>

      {error && (
        <Alert variant="success" className="text-success">
          {error}
        </Alert>
      )}

      <Row xs={1} md={2} lg={2} className="g-4 mb-4">
        {productos.map((p) => (
          <Col key={p.id}>
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title className="fw-bold">{p.nombre}</Card.Title>
                <Card.Text>
                  Precio: S/. {p.precio}<br />
                  Stock: {p.stock}
                </Card.Text>
                {usuario.rol !== 'usuario' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => editar(p)}
                      style={{ backgroundColor: '#66BB6A', borderColor: '#66BB6A' }}
                      className="me-2 text-white"
                    >
                      ✏️ Editar
                    </Button>
                    {usuario.rol === 'admin' && (
                      <Button variant="danger" size="sm" onClick={() => eliminarProducto(p.id)}>
                        🗑 Eliminar
                      </Button>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {usuario.rol !== 'usuario' && (
        <Form
          onSubmit={editando ? actualizarProducto : crearProducto}
          className="bg-light p-4 rounded shadow"
        >
          <h4 className="text-center mb-4" style={{ color: '#4CAF50' }}>
            {editando ? 'Editar Producto' : 'Nuevo Producto'}
          </h4>

          <Row>
            <Col md={4} className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                placeholder="Nombre del producto"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4} className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                name="precio"
                type="number"
                placeholder="Precio"
                step="0.01"
                value={form.precio}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4} className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                name="stock"
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-center gap-3">
            <Button
              type="submit"
              style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
            >
              {editando ? 'Actualizar' : 'Crear'}
            </Button>
            {editando && (
              <Button variant="secondary" onClick={() => setEditando(null)}>
                Cancelar
              </Button>
            )}
          </div>
        </Form>
      )}
    </Container>
  );
}
