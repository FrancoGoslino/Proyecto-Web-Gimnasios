import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { useLocation } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ScrollToTop from '../ScrollTop';

import '../styles/login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
      const location = useLocation();
      const from = location.state?.from?.pathname || '/inicio';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recordar, setRecordar] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.trim() || !password.trim()) {
      setError('Completa email y contraseña');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Ingrese un email válido');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    try {
      setLoading(true);
      await login({ email, recordar });
      navigate(from, { replace: true });
    } catch (err) {
      setError('Error al iniciar sesión. Revisa tus credenciales');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-wrapper">
        <Card className="login-card">
          <ScrollToTop />
          <Card.Header className="login-card-header">
            <h2 className="login-title">Iniciar sesión</h2>
            <p className="login-subtitle">Accede a tu cuenta y gestiona tus clases</p>
          </Card.Header>

          <Card.Body>
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

            <Form onSubmit={handleLogin} noValidate>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@ejemplo.com"
                  className="bg-transparent text-light"
                  aria-label="Email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label className="form-label">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="bg-transparent text-light"
                  aria-label="Contraseña"
                  required
                />
              </Form.Group>

              <Row className="align-items-center mb-3">
                <Col xs="6">
                  <Form.Check
                    type="checkbox"
                    id="rememberMe"
                    label="Recordarme"
                    checked={recordar}
                    onChange={e => setRecordar(e.target.checked)}
                    className="text-light"
                  />
                </Col>
                <Col xs="6" className="text-end">
                  <a className="login-forgot-link" href="/forgot">¿Olvidaste tu contraseña?</a>
                </Col>
              </Row>

              <div className="d-grid">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Ingresando...' : 'Iniciar sesión'}
                </Button>
              </div>
            </Form>
          </Card.Body>

          <Card.Footer className="login-card-footer">
            <small className="">¿No tenés cuenta? <a href="/register">Crear cuenta</a></small>
          </Card.Footer>
        </Card>
        {/* Promo estático debajo del login */}
        <section className="login-promo mt-4">
        <div className="promo-grid">
            <article className="promo-card">
            <div className="promo-title primary">Comenzá hoy</div>
            <p className="lead">Prueba 7 días sin compromiso y descubre todas las clases</p>
            <ul>
                <li>Acceso a sala libre</li>
                <li>Clases grupales: Cardio, Fuerza, Yoga</li>
                <li>Entrenadores certificados</li>
            </ul>
            <div className="promo-flag">Planes desde $19.900 / mes</div>
            </article>

            <article className="promo-card">
            <div className="promo-title primary">Clases destacadas</div>
            <p className="lead">Entrenamientos pensados para todos los niveles</p>
            <ul>
                <li>Spinning: alta quema calórica</li>
                <li>Pilates: fuerza y control</li>
                <li>HIIT: 30–45 min, máximo resultado</li>
            </ul>
            <div className="promo-flag secondary">Reserva tu plaza</div>
            </article>

            <article className="promo-card">
            <div className="promo-title primary">Beneficio VIP</div>
            <p className="lead">Planes Premium con acceso a sauna y prioridad en reservas</p>
            <ul>
                <li>Clases ilimitadas</li>
                <li>Consulta mensual con entrenador</li>
                <li>Descuentos en tienda</li>
            </ul>
            <div className="promo-flag highlight">Mejor valor</div>
            </article>
        </div>
        </section>
      </section>
    </main>
  );
}