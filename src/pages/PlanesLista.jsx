// src/pages/PlanesLista.jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import PlanItem from '@components/PlanItem';
import ScrollToTop from '../ScrollTop';

export default function PlanesLista() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, suscripciones = [], suscribirsePlan, cancelarSuscripcionPlan } = useAuth();

 const planes = [
    {
      ID: 1,
      nombre: 'Standard',
      precio: '$19.900 / mes',
      variant: 'standard',
      imagen: '/img/plans/standard.jpg',
      beneficios: [
        'Acceso a máquinas libre',
        'Vestuario y lockers',
        '1 clase grupal semanal',
        'Wi-Fi en sala'
      ]
    },
    {
      ID: 2,
      nombre: 'Standard+',
      precio: '$29.900 / mes',
      variant: 'standard-plus',
      imagen: '/img/plans/standard-plus.jpg',
      beneficios: [
        'Acceso a máquinas libre',
        'Vestuario y lockers',
        '1 clase grupal semanal',
        'Wi-Fi en sala',
        '2 clases grupales semanales',
        'Acceso a zona funcional',
        '1 consulta con entrenador mensual'
      ]
    },
    {
      ID: 3,
      nombre: 'Premium',
      precio: '$44.900 / mes',
      variant: 'premium',
      imagen: '/img/plans/premium.jpg',
      beneficios: [
        'Acceso a máquinas libre',
        'Vestuario y lockers',
        '1 clase grupal semanal',
        'Wi-Fi en sala',
        '2 clases grupales semanales',
        'Acceso a zona funcional',
        '1 consulta con entrenador mensual',
        'Clases ilimitadas',
        'Acceso a sala premium y sauna',
        'Plan de entrenamiento personalizado'
      ]
    },
    {
      ID: 4,
      nombre: 'Gold',
      precio: '$69.900 / mes',
      variant: 'gold',
      imagen: '/img/plans/gold.jpg',
      beneficios: [
        'Acceso a máquinas libre',
        'Vestuario y lockers',
        '1 clase grupal semanal',
        'Wi-Fi en sala',
        '2 clases grupales semanales',
        'Acceso a zona funcional',
        '1 consulta con entrenador mensual',
        'Clases ilimitadas',
        'Acceso a sala premium y sauna',
        'Plan de entrenamiento personalizado',
        'Entrenador personal 2 sesiones/mes',
        'Descuentos en suplementos y tienda',
        'Acceso VIP (prioridad en reservas)'
      ]
    }
  ];

  const [mensaje, setMensaje] = useState(null);

  const redirectToLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  const handleSuscribirse = (planID, planNombre) => {
    if (!isLoggedIn) {
      redirectToLogin();
      return;
    }

    if (suscripciones.includes(planID)) {
      setMensaje({ tipo: 'warning', texto: `Ya estás suscrito a ${planNombre}` });
      setTimeout(() => setMensaje(null), 3000);
      return;
    }

    if (suscripciones.length > 0) {
      const anteriorID = suscripciones[0];
      const anteriorNombre = planes.find(p => p.ID === anteriorID)?.nombre || 'otro plan';
      setMensaje({ tipo: 'info', texto: `Se canceló ${anteriorNombre} y te suscribiste a ${planNombre}` });
    } else {
      setMensaje({ tipo: 'success', texto: `Te suscribiste a ${planNombre}` });
    }

    suscribirsePlan(planID);
    setTimeout(() => setMensaje(null), 3000);
  };

  const handleCancelar = (planID, planNombre) => {
    if (!isLoggedIn) {
      redirectToLogin();
      return;
    }
    cancelarSuscripcionPlan(planID);
    setMensaje({ tipo: 'info', texto: `Cancelaste la suscripción a ${planNombre}` });
    setTimeout(() => setMensaje(null), 3000);
  };

  return (
    
    <Container className='Planes-page'>
      <ScrollToTop />
      <h1 className="text-light mb-3">Planes</h1>

      {mensaje && (
        <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje(null)}>
          {mensaje.texto}
        </Alert>
      )}

      <Row>
        {planes.map(plan => (
          <PlanItem
            key={plan.ID}
            ID={plan.ID}
            nombre={plan.nombre}
            precio={plan.precio}
            beneficios={plan.beneficios}
            suscrito={suscripciones.includes(plan.ID)}
            onSuscribirse={handleSuscribirse}
            onCancelar={handleCancelar}
            variant={plan.variant}
          />
        ))}
      </Row>
    </Container>
  );
}