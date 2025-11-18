import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import '../styles/plans.css';

export default function PlanItem({
  ID,
  nombre,
  precio,
  beneficios = [],
  suscrito,
  onSuscribirse,
  onCancelar,
  variant = 'standard'  
}) {
  return (
    <Col lg="3" md="6" sm="12" className="mb-5">
      <Card className={`h-100 plan-card ${variant}`}>
        <div className="plan-header">
          <div className="plan-name">{nombre}</div>
          <div className="plan-price">{precio}</div>
        </div>

        <Card.Body className="d-flex flex-column">
          <div className="plan-badge">
            <span className="level-label">{variant === 'gold' ? 'VIP' : nombre}</span>
          </div>

          <ListGroup variant="flush" className="mb-4 plan-features">
            {beneficios.map((b, i) => (
              <ListGroup.Item key={i} className="bg-transparent border-0 px-0">
                <span className="feat-check">✓</span>
                <span className="feat-text">{b}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="mt-auto">
            {suscrito ? (
              <Button variant="outline-danger" className="w-100" onClick={() => onCancelar(ID, nombre)}>
                Cancelar
              </Button>
            ) : (
              <Button variant="primary" className="w-100" onClick={() => onSuscribirse(ID, nombre)}>
                Suscribirse
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}