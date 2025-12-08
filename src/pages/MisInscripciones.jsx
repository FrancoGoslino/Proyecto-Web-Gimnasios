import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ScrollToTop from '../ScrollTop';

import { useAuth } from '@contexts/AuthContext';
import { useClasses } from '@contexts/ClassesContext';

import '../styles/mis-inscripciones.css';

export default function MisInscripciones() {
const { inscripciones, desinscribirDeClase } = useAuth();
const { clases } = useClasses();
const misClases = (clases || []).filter(c => inscripciones.includes(c.ID));

  return (
    <Container style={{ padding:"5rem" }}>
      <ScrollToTop />
      <h1 className="display-4 fw-bold text-light mb-3">Tus Inscripciones</h1>

      {misClases.length === 0 ? (
        <Card className="bg-dark text-light p-4 empty-card">
          <Card.Body>
            <h5>No estás inscrito en ninguna clase</h5>
            <p>Explorá nuestras actividades y empezá a entrenar hoy mismo.</p>
            <Button variant="outline-light" href="/clases">Ver clases disponibles</Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {misClases.map(clase => (
            <Col md={6} lg={4} key={clase.ID} className="mb-4">
              <Card className="clase-card h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-light mb-2">{clase.nombre}</Card.Title>
                  <Card.Text className="text-light small mb-1">
                    <strong>📅 Horario:</strong> {clase.horario}
                  </Card.Text>
                  <Card.Text className="text-light small mb-1">
                    <strong>👨‍🏫 Instructor:</strong> {clase.instructor}
                  </Card.Text>
                  <Card.Text className="text-light small mb-1">
                    <strong>⏱️ Duración:</strong> {clase.duracion}
                  </Card.Text>
                  <Card.Text className="text-light small mb-3">
                    <strong>👥 Cupos:</strong> {clase.inscritos}/{clase.capacidad}
                  </Card.Text>

                  <Button
                    variant="danger"
                    onClick={() => desinscribirDeClase(clase.ID)}
                    className="mt-auto"
                  >
                    Cancelar inscripción
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}