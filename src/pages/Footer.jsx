// ...existing code...
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


import '../styles/footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setMsg({ tipo: 'danger', texto: 'Ingresa un email válido.' });
      setTimeout(() => setMsg(null), 3000);
      return;
    }
    setMsg({ tipo: 'success', texto: '¡Suscripción recibida!' });
    setEmail('');
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <footer className="site-footer">
      <Container>
        <Row className="gy-4 align-items-start">
          <Col md={3}>
            <div className="footer-brand">
              <h4>P.GYM</h4>
              <p className="small">Centro integral de entrenamiento — fuerza, cardio y bienestar.</p>
            </div>
            <address className="footer-contact small">
              <div>Av. Ejemplo 123, Ciudad</div>
              <div>Tel: <a href="tel:+541112345678">+54 11 1234-5678</a></div>
              <div>Email: <a href="mailto:info@pgym.com">info@pgym.com</a></div>
            </address>
          </Col>

          <Col md={2}>
            <h6>Horarios</h6>
            <ListGroup variant="flush" className="footer-list">
              <ListGroup.Item className="bg-transparent px-0">Lun - Vie: 06:00 - 23:00</ListGroup.Item>
              <ListGroup.Item className="bg-transparent px-0">Sáb: 08:00 - 20:00</ListGroup.Item>
              <ListGroup.Item className="bg-transparent px-0">Dom: 09:00 - 18:00</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={2}>
            <h6>Enlaces</h6>
            <ListGroup variant="flush" className="footer-list">
              <ListGroup.Item className="bg-transparent px-0"><Link to="/" className="link">Inicio</Link></ListGroup.Item>
              <ListGroup.Item className="bg-transparent px-0"><Link to="/clases" className="link">Clases</Link></ListGroup.Item>
              <ListGroup.Item className="bg-transparent px-0"><Link to="/maquinas" className="link">Máquinas</Link></ListGroup.Item>
              <ListGroup.Item className="bg-transparent px-0"><Link to="/planes" className="link">Planes</Link></ListGroup.Item>
            </ListGroup>
          </Col>
          
          <Col md={2}>
            <h6>Redes sociales</h6>
            <ul className="list-unstyled footer-social-list">
              <li className="d-flex align-items-center mb-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link me-2" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A3.5 3.5 0 1 1 8.5 11 3.5 3.5 0 0 1 12 7.5zm4.75-.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/></svg>
                </a>
                <span>Instagram</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link me-2" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.07C22 6.52 17.52 2 12 2S2 6.52 2 12.07c0 5 3.66 9.13 8.44 9.95v-7.05h-2.54V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.62.77-1.62 1.56V12h2.77l-.44 2.97h-2.33V22C18.34 21.2 22 17.08 22 12.07z"/></svg>
                </a>
                <span>Facebook</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link me-2" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C16.8 2.5 12 2.5 12 2.5h0s-4.8 0-8.6.4c-.4 0-1.3.1-2.1 1C.7 4.6.5 6.2.5 6.2S.2 8 .2 9.8v.3c0 1.8.3 3.6.3 3.6s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.2 7 .4 7 .4s4.8 0 8.6-.4c.4 0 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.3-1.8.3-3.6v-.3c0-1.8-.3-3.6-.3-3.6zM9.8 15.4V7.6l6.4 3.9-6.4 3.9z"/></svg>
                </a>
                <span>YouTube</span>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h6>Newsletter</h6>
            <Form onSubmit={handleSubscribe} className="footer-newsletter">
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Suscribirme
              </Button>
            </Form>
            {msg && (
              <div className={`alert alert-${msg.tipo} mt-3 py-1`} role="alert">
                {msg.texto}
              </div>
            )}
          </Col>
        </Row>

        <Row className="pt-3 align-items-center">
          <Col md={6} className="small">
            © {new Date().getFullYear()} P.GYM • Todos los derechos reservados
          </Col>
          <Col md={6} className="text-md-end">
            <Link to="/politicas" className="link me-3">Políticas</Link>
            <Link to="/terminos" className="link">Términos</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
