import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useClasses } from '@contexts/ClassesContext';
import { useAuth } from '@contexts/AuthContext';
import ScrollToTop from '../ScrollTop';
import { FaFilter, FaTicketAlt } from 'react-icons/fa';
import '../styles/clases.css';
import ClaseItem from '@components/ClaseItem';

export default function ClasesLista() {
  const { clases = [] } = useClasses();
  const { isLoggedIn, inscripciones = [], inscribirEnClase, desinscribirDeClase } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mensaje, setMensaje] = useState(null);
  const [filtro, setFiltro] = useState('Todas');

  const categorias = ['Todas', ...new Set((clases || []).map(c => c.categoria || 'Sin categoría'))];
  const clasesFiltradas = filtro === 'Todas' ? (clases || []) : (clases || []).filter(c => c.categoria === filtro);

  const redirectToLogin = () => navigate('/login', { state: { from: location } });

  const handleInscribirse = (claseId, claseNombre) => {
    if (!isLoggedIn) { redirectToLogin(); return; }
    if (inscripciones.includes(claseId)) {
      setMensaje({ tipo: 'warning', texto: `Ya estás inscrito en ${claseNombre}` });
      setTimeout(() => setMensaje(null), 2500);
      return;
    }
    if (typeof inscribirEnClase === 'function') inscribirEnClase(claseId);
    setMensaje({ tipo: 'success', texto: `¡Te inscribiste en ${claseNombre}!` });
    setTimeout(() => setMensaje(null), 3000);
  };

  const handleDesinscribirse = (claseId, claseNombre) => {
    if (!isLoggedIn) { redirectToLogin(); return; }
    if (typeof desinscribirDeClase === 'function') desinscribirDeClase(claseId);
    setMensaje({ tipo: 'info', texto: `Te desinscribiste de ${claseNombre}` });
    setTimeout(() => setMensaje(null), 3000);
  };

  return (
    <>
      <ScrollToTop />
      <div className="clases-page">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-light mb-3">Nuestras Clases</h1>
          </div>

          {mensaje && (
            <div 
              role="alert" 
              className={`alert alert-${mensaje.tipo} alert-dismissible fade show`} 
              onClick={() => setMensaje(null)}
            >
              {mensaje.texto}
              <button type="button" className="btn-close" onClick={(e) => {
                e.stopPropagation();
                setMensaje(null);
              }} />
            </div>
          )}

          <div className="filtros-container mb-4">
            <div className="d-flex align-items-center mb-3">
              <FaFilter className="me-2 text-primary" />
              <h5 className="mb-0 text-light">Filtrar por categoría:</h5>
            </div>
            <div className="clases-filtros">
              {categorias.map(cat => (
                <button
                  key={cat}
                  className={`clase-filtro-btn ${filtro === cat ? 'active' : ''}`}
                  onClick={() => setFiltro(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="inscripciones-info mb-4">
            <div className="d-flex align-items-center">
              <FaTicketAlt className="me-2 text-primary" />
              <span className="text-light">
                <strong>Tus inscripciones:</strong> {inscripciones.length} {inscripciones.length === 1 ? 'clase' : 'clases'}
              </span>
            </div>
          </div>

          {clasesFiltradas.length === 0 ? (
            <div className="text-center py-5">
              <div className="alert alert-info">
                No hay clases disponibles en esta categoría. Prueba con otro filtro.
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {clasesFiltradas.map(clase => (
                <ClaseItem
                  key={clase.ID}
                  ID={clase.ID}
                  nombre={clase.nombre}
                  categoria={clase.categoria}
                  descripcion={clase.descripcion}
                  horario={clase.horario}
                  instructor={clase.instructor}
                  duracion={clase.duracion}
                  capacidad={clase.capacidad}
                  inscritos={clase.inscritos}
                  estaInscrito={inscripciones.includes(clase.ID)}
                  onInscribirse={() => handleInscribirse(clase.ID, clase.nombre)}
                  onDesinscribirse={() => handleDesinscribirse(clase.ID, clase.nombre)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}