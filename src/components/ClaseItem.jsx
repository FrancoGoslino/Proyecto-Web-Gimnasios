import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export default function ClaseItem({
  ID,
  nombre,
  categoria,
  descripcion,
  horario,
  instructor,
  duracion,
  capacidad,
  inscritos,
  estaInscrito,
  onInscribirse,
  onDesinscribirse
}) {


  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <Card id={`card-clase-${ID}`} className="h-100 clase-card bg-dark text-light">
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <Card.Title className="mb-1">{nombre}</Card.Title>
              <Card.Subtitle className="text-muted small">{categoria}</Card.Subtitle>
            </div>
            <div className="text-end">
              <Badge bg="primary" className="mb-1">{duracion}</Badge>
              <div className="small text-muted">ID {ID}</div>
            </div>
          </div>

          <Card.Text className="text-light small mb-2">
            {descripcion}
          </Card.Text>

          <div className="mb-2 small">
            <div><strong>Horario:</strong> {horario}</div>
            <div><strong>Instructor:</strong> {instructor}</div>
          </div>

          <div className="mb-3 small">
            <strong>Disponibilidad:</strong> {inscritos}/{capacidad}
            <div className="mt-1">
              {inscritos >= capacidad ? (
                <Badge bg="danger">Cupos agotados</Badge>
              ) : (
                <Badge bg="success">{capacidad - inscritos} lugares</Badge>
              )}
            </div>
          </div>

          <div className="mt-auto">
            {estaInscrito ? (
            <Button variant="outline-danger" className="w-100" onClick={onDesinscribirse}>
              Cancelar inscripción
            </Button>
          ) : (
            <Button
              variant={inscritos >= capacidad ? 'secondary' : 'success'}
              className="w-100"
              onClick={onInscribirse}
              disabled={inscritos >= capacidad}
            >
              {inscritos >= capacidad ? 'Clase llena' : 'Inscribirse'}
            </Button>
          )}
          </div>
        </Card.Body>
        
        <Card.Footer className="bg-dark border-0 text-muted small">
          <div className="d-flex justify-content-between">
            <span>Instructor: {instructor}</span>
            <span>ID: {ID}</span>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}