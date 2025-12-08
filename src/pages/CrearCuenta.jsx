import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { Form, Button, Card, Row, Col, Alert, Container } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaIdCard } from 'react-icons/fa';
import '../styles/crear-cuenta.css';

export default function CrearCuenta() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    dni: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Ingrese un email válido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      await signup({
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono,
        direccion: formData.direccion,
        dni: formData.dni
      });
      navigate('/perfil');
    } catch (error) {
      setError('Error al crear la cuenta. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="crear-cuenta-page">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="crear-cuenta-card">
            <Card.Header className="crear-cuenta-card-header text-center">
              <h2 className="crear-cuenta-title">Crear Cuenta</h2>
              <p className="crear-cuenta-subtitle">Únete a nuestra comunidad fitness</p>
            </Card.Header>
            
            <Card.Body className="p-4">
              {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="nombre">
                      <Form.Label><FaUser className="me-2" /> Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Ingrese su nombre"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="apellido">
                      <Form.Label><FaUser className="me-2" /> Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                        placeholder="Ingrese su apellido"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label><FaEnvelope className="me-2" /> Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ejemplo@dominio.com"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="telefono">
                      <Form.Label><FaPhone className="me-2" /> Teléfono</Form.Label>
                      <Form.Control
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+54 9 11 1234-5678"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="dni">
                      <Form.Label><FaIdCard className="me-2" /> DNI</Form.Label>
                      <Form.Control
                        type="text"
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        placeholder="12345678"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="direccion">
                  <Form.Label><FaMapMarkerAlt className="me-2" /> Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Calle, número, ciudad"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label><FaLock className="me-2" /> Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Mínimo 6 caracteres"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="confirmPassword">
                      <Form.Label><FaLock className="me-2" /> Confirmar Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Vuelva a escribir la contraseña"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4" controlId="terms">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span>
                        Acepto los <a href="/terminos" className="text-primary">Términos y Condiciones</a> y la <a href="/privacidad" className="text-primary">Política de Privacidad</a>
                      </span>
                    }
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={loading}
                    className="py-2"
                  >
                    {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </Button>
                </div>
              </Form>
            </Card.Body>

            <Card.Footer className="crear-cuenta-card-footer">
              <p className="mb-0">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="text-primary fw-bold">Iniciar Sesión</Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}