import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MaquinaItem from '@components/MaquinaItem';
import maquinas from '../data/maquinas';
import ScrollToTop from '../ScrollTop';

import '../styles/maquinaItem.css';


export default function MaquinasLista() {
  const [q, setQ] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  // calcular categorías disponibles dinámicamente
  const categorias = ['Todas', ...Array.from(new Set((maquinas || []).map(m => m.categoria || 'Sin categoría')))];

  const normalized = (s) => (s || '').toString().toLowerCase().trim();

  const maquinasFiltradas = (maquinas || []).filter(m => {
    if (categoria !== 'Todas' && (m.categoria || '') !== categoria) return false;
    if (!q) return true;
    const needle = normalized(q);
    return normalized(m.nombre).includes(needle)
      || normalized(m.descripcion).includes(needle)
      || (m.musculos || []).some(mm => normalized(mm).includes(needle));
  });

  return (
    <Container className='Maquinas-page'>
      <ScrollToTop />
      <h1 className='text-light mb-4'>Máquinas disponibles</h1>

      <div className="mb-4 d-flex gap-2 flex-column flex-md-row align-items-start">
        <InputGroup style={{ maxWidth: 420 }}>
          <Form.Control
            placeholder="Buscar máquina, músculo o característica..."
            value={q}
            onChange={e => setQ(e.target.value)}
            aria-label="Buscar máquinas"
          />
          <Button variant="outline-light" onClick={() => setQ('')}>Limpiar</Button>
        </InputGroup>

        <Form.Select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          style={{ width: 220 }}
          aria-label="Filtrar por categoría"
        >
          {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </Form.Select>

        <div className="text-muted small ms-auto">
          {maquinasFiltradas.length} resultado{maquinasFiltradas.length !== 1 ? 's' : ''}
        </div>
      </div>

      <Row>
        {maquinasFiltradas.length === 0 ? (
          <div className="text-light">No se encontraron máquinas. Probá con otra búsqueda o categoría.</div>
        ) : (
          maquinasFiltradas.map(m => (
            <MaquinaItem
              key={m.ID}
              nombre={m.nombre}
              descripcion={m.descripcion}
              imagen={m.imagen}
              categoria={m.categoria}
              musculos={m.musculos}
              nivel={m.nivel}
              intensidad={m.intensidad}
              beneficios={m.beneficios}
              consejos={m.consejos}
              ubicacion={m.ubicacion}
              equipoNecesario={m.equipoNecesario}
              tiempoEstimado={m.tiempoEstimado}
            />
          ))
        )}
      </Row>
    </Container>
  );
}