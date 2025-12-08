import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import '../styles/clases.css'

// ... (imports previos)

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
      <Card id={`card-clase-${ID}`} className={`h-100 clase-card ${inscritos >= capacidad ? 'clase-llena' : ''}`}>
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <Card.Title className="clase-nombre">{nombre}</Card.Title>
              <div className="clase-categoria">{categoria}</div>
            </div>
            <div className="clase-duracion">
              <span className="badge bg-primary">{duracion}</span>
            </div>
          </div>

          <Card.Text className="clase-descripcion">
            {descripcion}
          </Card.Text>

          <div className="clase-info">
            <div className="clase-info-item">
              <span className="clase-info-label">Horario:</span>
              <span className="clase-info-value">{horario}</span>
            </div>
            <div className="clase-info-item">
              <span className="clase-info-label">Instructor:</span>
              <span className="clase-info-value">{instructor}</span>
            </div>
            <div className="clase-info-item">
              <span className="clase-info-label">Disponibilidad:</span>
              <span className="clase-info-value">
                {inscritos}/{capacidad}
                {inscritos >= capacidad ? (
                  <span className="ms-2 badge bg-danger">Completo</span>
                ) : (
                  <span className="ms-2 badge bg-success">Disponible</span>
                )}
              </span>
            </div>
          </div>

          <div className="mt-auto pt-3">
            {estaInscrito ? (
              <button 
                className="btn btn-cancelar w-100"
                onClick={onDesinscribirse}
              >
                Cancelar inscripción
              </button>
            ) : (
              <button
                className={`btn btn-inscribirse w-100 ${inscritos >= capacidad ? 'disabled' : ''}`}
                onClick={onInscribirse}
                disabled={inscritos >= capacidad}
              >
                {inscritos >= capacidad ? 'Cupos agotados' : 'Inscribirse ahora'}
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}