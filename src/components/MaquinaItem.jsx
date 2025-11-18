import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import '../styles/maquinaItem.css';

export default function MaquinaItemk({
  nombre,
  descripcion,
  imagen,
  categoria,
  musculos = [],
  nivel,
  beneficios = [],
  ubicacion,
  tiempoEstimado
}) {
  return (
    <Col lg="3" md="6" sm="12" className='mb-4'>
      <Card className="machine-card-alt-dark">
        <div className="card-img-wrapper-alt-dark">
          {imagen ? (
            <>
              <img className="machine-img-alt-dark" src={imagen} alt={nombre} />
              <div className="card-img-caption-dark">
                <div style={{fontSize:12, fontWeight:700}}>{categoria || '—'}</div>
                <div style={{fontSize:12, color:'rgba(230,238,246,0.95)'}}>{nivel || ''}</div>
              </div>
            </>
          ) : (
            <div className="machine-placeholder-alt-dark">
              <div style={{fontSize:16}}>Imagen no disponible</div>
              <div style={{fontSize:13, color:'var(--muted-dark)'}}>Agregá una imagen para esta máquina</div>
            </div>
          )}
        </div>

        <Card.Body>
          <div>
            <h5 className="machine-title">{nombre}</h5>
            <div className="machine-sub">{descripcion}</div>
          </div>

          <div className="machine-meta-list-dark" aria-hidden>
            {musculos.slice(0,3).map((m,i) => <div className="meta-item" key={i}>{m}</div>)}
            {beneficios.slice(0,2).map((b,i) => <div className="meta-item" key={`b${i}`}>✓ {b}</div>)}
          </div><div className="machine-badges">
            {tiempoEstimado && (
                <div className="machine-badge">
                ⏱ {tiempoEstimado}
                </div>
            )}
            {ubicacion && (
                <div className="machine-badge">
                📍 {ubicacion}
                </div>
            )}
            </div>

        </Card.Body>
      </Card>
    </Col>
  );
}