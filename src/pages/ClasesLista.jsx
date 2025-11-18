import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useClasses } from '@contexts/ClassesContext';
import { useAuth } from '@contexts/AuthContext';
import ScrollToTop from '../ScrollTop';

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
    <><ScrollToTop />
      <div style={{ padding:"5rem" }} >
        <h1 className='text-light mb-4'>Nuestras Clases</h1>

        {mensaje && (
          <div role="alert" className={`alert alert-${mensaje.tipo}`} onClick={() => setMensaje(null)}>
            {mensaje.texto}
          </div>
        )}

        <div className='mb-4'>
          <div className='d-flex gap-2 flex-wrap'>
            {categorias.map(cat => (
              <button
                key={cat}
                className={`btn ${filtro === cat ? 'btn-primary' : 'btn-outline-light'}`}
                onClick={() => setFiltro(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className='mb-3'>
          <p className='text-light'><strong>Tus inscripciones:</strong> {inscripciones.length}</p>
        </div>

        <div className="row">
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
      </div>
    </>
  );
}