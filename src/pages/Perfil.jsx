import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { useClasses } from '@contexts/ClassesContext';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import ScrollToTop from '../ScrollTop';

import '../styles/perfil.css';

export default function Perfil() {
  const { user = null, isLoggedIn, logout, suscripciones = [], inscripciones = [], updateUser } = useAuth();
  const { clases = [] } = useClasses();

  const [nombre, setNombre] = useState(user?.nombre || '');
  const [email, setEmail] = useState(user?.email || '');
  const [telefono, setTelefono] = useState(user?.telefono || '');
  const [fotoPreview, setFotoPreview] = useState(user?.foto || null);
  const [fotoFile, setFotoFile] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    setNombre(user?.nombre || '');
    setEmail(user?.email || '');
    setTelefono(user?.telefono || '');
    setFotoPreview(user?.foto || null);
  }, [user]);

  if (!isLoggedIn) {
    return (
      <Container className={`perfil-page mt-5 ${planActualClass}`}>
        <Card className="bg-dark text-light p-4">
          <Card.Body>
            <h4>Inicia sesión para ver tu perfil</h4>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const planActualId = (suscripciones && suscripciones.length > 0) ? suscripciones[0] : null;
  const planActualNombre = {
    1: 'Standard',
    2: 'Standard+',
    3: 'Premium',
    4: 'Gold'
  }[planActualId] || 'Sin suscripción';

  const misClases = (clases || []).filter(c => (inscripciones || []).includes(c.ID));

  const handleFotoChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFotoFile(f);
    const reader = new FileReader();
    reader.onload = () => setFotoPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleRemoveFoto = () => {
    setFotoFile(null);
    setFotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const guardarCambios = (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      ...(user || {}),
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      email: email,  
      foto: fotoPreview || null,
      suscripciones: user?.suscripciones || suscripciones || [],
      inscripciones: user?.inscripciones || inscripciones || []
    };

    if (typeof updateUser === 'function') {
      updateUser(nuevoUsuario);
      setMensaje({ tipo: 'success', texto: 'Perfil actualizado' });
      setTimeout(() => setMensaje(null), 2500);
      return;
    }

    try {
      localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
      setMensaje({ tipo: 'success', texto: 'Perfil actualizado (recargando...)' });
      setTimeout(() => {
        setMensaje(null);
        window.location.reload();
      }, 900);
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: 'No se pudo guardar el perfil' });
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  return (
    <Container className="perfil-page mt-5">
      <ScrollToTop />
      <Row>
        <Col lg={8} md={12}>
          <Card className="mb-4 perfil-card">
            <div className="perfil-banner d-flex align-items-center">
              <div className="banner-left">
                <h3 className="mb-0">Tu plan</h3>
                <div className="plan-chip">
                  <Badge bg="warning" text="dark">{planActualNombre}</Badge>
                </div>
                <div className="plan-sub">
                  {(planActualId) ? <small>Acceso activo</small> : <small>No tenés suscripción</small>}
                </div>
              </div>
              <div className="banner-right text-end">
                <Button variant="outline-light" onClick={logout}>Cerrar sesión</Button>
              </div>
            </div>

            <Card.Body>
              <h5 className="text-light mb-3">Perfil</h5>

              {mensaje && (
                <div className={`alert alert-${mensaje.tipo}`} role="alert">
                  {mensaje.texto}
                </div>
              )}

              <Form onSubmit={guardarCambios}>
                <Row className="g-3">
                  <Col md={4} className="text-center">
                    <div className="foto-preview-wrapper mb-2">
                      {fotoPreview ? (
                        <Image src={fotoPreview} roundedCircle fluid className="foto-preview" />
                      ) : (
                        <div className="foto-placeholder">Sin foto</div>
                      )}
                    </div>

                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFotoChange}
                      ref={fileInputRef}
                    />
                    <div className="d-flex gap-2 mt-2 justify-content-center">
                      <Button variant="outline-secondary" size="sm" onClick={handleRemoveFoto}>Quitar</Button>
                    </div>
                  </Col>

                  <Col md={8}>
                    <Form.Group className="mb-3" controlId="perfilNombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        placeholder="Tu nombre"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="perfilEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={email} readOnly />
                      <Form.Text className="text-muted">El email no es editable desde aquí</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="perfilTelefono">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        type="tel"
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
                        placeholder="+54 9 ..."
                      />
                    </Form.Group>

                    <div className="d-flex gap-2">
                      <Button type="submit" variant="primary">Guardar cambios</Button>
                      <Button variant="outline-secondary" onClick={() => {
                        // restaurar valores desde user
                        setNombre(user?.nombre || '');
                        setTelefono(user?.telefono || '');
                        setFotoPreview(user?.foto || null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                        setMensaje(null);
                      }}>Restaurar</Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mb-5 bg-dark text-light">
            <Card.Body>
              <h5 className="mb-3">Actividades inscritas</h5>
              {misClases.length === 0 ? (
                <p>No estás inscrito en actividades. <a href="/clases">Ver clases</a></p>
              ) : (
                <div className="list-actividades">
                  {misClases.map(c => (
                    <Card key={c.ID} className="mb-2 bg-secondary bg-opacity-10 border-0">
                      <Card.Body className="p-2 d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-bold">{c.nombre}</div>
                          <div className="small text">{c.horario} • {c.instructor}</div>
                        </div>
                        <div className="text-end">
                          <Badge bg={c.inscritos >= c.capacidad ? 'danger' : 'success'}>
                            {c.inscritos}/{c.capacidad}
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={12}>
          <Card className={`mb-4 perfil-plan-card plan-${{
            1: 'standard',
            2: 'standard-plus',
            3: 'premium',
            4: 'gold'
          }[planActualId]}`}>
            <Card.Body>
              <h6>Tu Plan Actual</h6>
              {planActualId ? (
                <>
                  <div className="mb-2"><strong>{planActualNombre}</strong></div>
                  <div className="mb-2">Precio: {
                    {
                      1: '$19.900 / mes',
                      2: '$29.900 / mes',
                      3: '$44.900 / mes',
                      4: '$69.900 / mes'
                    }[planActualId]
                  }</div>
                  <div className="mb-2">Beneficios:</div>
                  <ul className="small">
                    {
                      {
                        1: ['Acceso a máquinas libre', 'Vestuario y lockers', '1 clase grupal semanal'],
                        2: ['Acceso a máquinas libre', 'Zona funcional', '2 clases grupales semanales'],
                        3: ['Clases ilimitadas', 'Sala premium y sauna', 'Plan personalizado'],
                        4: ['Entrenador personal', 'Descuentos exclusivos', 'Acceso VIP']
                      }[planActualId].map((b, i) => <li key={i}> {b}</li>)
                    }
                  </ul>
                </>
              ) : (
                <div className="text-muted">No tenés un plan activo actualmente.</div>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4 perfil-resumen-card">
            <Card.Body>
              <h6>Resumen</h6>
              <div className="dato"><strong>Nombre:</strong> {user?.nombre || '-'}</div>
              <div className="dato"><strong>Email:</strong> {user?.email || '-'}</div>
              <div className="dato"><strong>Teléfono:</strong> {user?.telefono || '-'}</div>
              <div className="dato"><strong>Plan:</strong> {planActualNombre}</div>
              <div className="dato"><strong>Clases inscritas:</strong> {(inscripciones || []).length}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}