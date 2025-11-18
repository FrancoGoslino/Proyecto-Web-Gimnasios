import { useState } from 'react';
import { Link } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ExampleCarouselImage from '@components/ExampleCarouselImage';
import ScrollToTop from '../ScrollTop';

import '../styles/landing.css';

export default function Inicio() {
  const slides = [
    {
      id: 1,
      title: 'SUCURSAL CENTRAL',
      caption: '¡Visítanos en nuestra sucursal principal!',
      boton_1: { text: 'Empezar por $19.900', to: '/planes' },
      boton_2: { text: 'Planes disponibles', to: '/planes' },
      img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3ltfGVufDB8fDB8fHww'
    },
    {
      id: 2,
      title: 'NUESTROS EQUIPOS',
      caption: 'Contamos con maquinaria de última generación.',
      boton_1: { text: 'Máquinas', to: '/maquinas' },
      boton_2: { text: 'Clases', to: '/clases' },
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhlJTIwZ3ltfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000k='
    },
    {
      id: 3,
      title: 'CLASES VIRTUALES',
      caption: 'Entrena desde la comodidad de tu hogar con nuestras clases en línea. Reserva tu lugar hoy mismo.',
      boton_1: { text: 'Ver Clases', to: '/clases' },
      boton_2: { text: 'Iniciar Sesión', to: '/login' },
      img: 'https://videoapi-muybridge.vimeocdn.com/animated-thumbnails/image/9aa10887-5bd3-49b0-b024-d5604a4919df.gif?ClientID=vimeo-core-prod&Date=1679999693&Signature=566a3f2140841eeabfbcebe74117b3134a500a3f'
    }
  ];

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  return (
    <><ScrollToTop />
      <Carousel 
        fade 
        activeIndex={index} 
        onSelect={handleSelect} 
        interval={4000} 
        pause="hover" 
        controls 
        indicators
        className="hero-carousel"
      >
        {slides.map(s => (
          <Carousel.Item key={s.id}>
            <ExampleCarouselImage src={s.img} alt={s.title} />
            <Carousel.Caption className="carousel-caption-custom">
              <h3 style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>{s.title}</h3>
              <p style={{ color: '#ffffff', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>{s.caption}</p>

              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button as={Link} to={s.boton_1.to} variant="primary">
                  {s.boton_1.text}
                </Button>
                <Button as={Link} to={s.boton_2.to} variant="outline-light">
                  {s.boton_2.text}
                </Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      
      <section className="landing-section beneficios">
        <h2 className="section-title">¿Por qué elegir P.Gym?</h2>
        <div className="beneficios-grid-v2">
          <div className="beneficio-card" style={{ backgroundImage: 'url(https://aquasportsgrancanaria.com/wp-content/uploads/hiit-o-entrenamiento-intervalico-de-alta-intensidad.jpg)' }}>
            <div className="overlay" />
            <div className="icon">1</div>
            <div className="text">
              <h4>Entrenamiento libre</h4>
              <p>Acceso total a máquinas, zona funcional y cardio sin límites.</p>
            </div>
          </div>
          <div className="beneficio-card" style={{ backgroundImage: 'url(https://crunch.com/wp-content/uploads/2023/09/CR011SLTH_The-Hub_09.01.232-800x584.jpg)' }}>
            <div className="overlay" />
            <div className="icon">2</div>
            <div className="text">
              <h4>Clases guiadas</h4>
              <p>Más de 20 clases semanales con instructores certificados.</p>
            </div>
          </div>
          <div className="beneficio-card" style={{ backgroundImage: 'url(https://media.istockphoto.com/id/1849345050/es/foto/instructora-personal-y-mujer-atl%C3%A9tica-que-realiza-planes-de-ejercicios-en-un-gimnasio.jpg?s=612x612&w=0&k=20&c=y1b0zh5MJUeaaP-ySNh6XsE8TPFd5ysUG9f8SxtUg6I=)' }}>
            <div className="overlay" />
            <div className="icon">3</div>
            <div className="text">
              <h4>Personal Trainer</h4>
              <p>Los mejores profesionales a tu disposición.</p>
            </div>
          </div>
        </div>
      </section>
          
      <section className="landing-section planes-horizontal">
        <h2 className="section-title">Elegí tu plan</h2>
        <div className="planes-horizontal-grid">
          <div className="plan-horizontal standard">
            <div className="plan-info">
              <h4>Standard</h4>
              <div className="precio">$19.900 / mes</div>
            </div>
            <div className="plan-detalle">
              <ul>
                <li><span className="check-icon standard" />Acceso a máquinas libre</li>
                <li><span className="check-icon standard" />Vestuarios y lockers</li>
                <li><span className="check-icon standard" />1 clase grupal semanal</li>
                <li><span className="check-icon standard" />Wi-Fi en sala</li>
              </ul>
              <Button as={Link} to="/planes" variant="primary" size="sm">
                Suscribirse
              </Button>
            </div>
          </div>

          <div className="plan-horizontal standard-plus">
            <div className="plan-info">
              <h4>Standard+</h4>
              <div className="precio">$29.900 / mes</div>
            </div>
            <div className="plan-detalle">
              <ul>
                <li><span className="check-icon standard-plus" />Acceso a máquinas libre</li>
                <li><span className="check-icon standard-plus" />Vestuarios y lockers</li>
                <li><span className="check-icon standard-plus" />1 clase grupal semanal</li>
                <li><span className="check-icon standard-plus" />Wi-Fi en sala</li>
                <li><span className="check-icon standard-plus" />1 consulta con entrenador mensual</li>
              </ul>
              <Button as={Link} to="/planes" variant="primary" size="sm">
                Suscribirse
              </Button>
            </div>
          </div>

          <div className="plan-horizontal premium">
            <div className="plan-info">
              <h4>Premium</h4>
              <div className="precio">$44.900 / mes</div>
            </div>
            <div className="plan-detalle">
              <ul>
                <li><span className="check-icon premium" />Acceso a máquinas libre</li>
                <li><span className="check-icon premium" />Vestuarios y lockers</li>
                <li><span className="check-icon premium" />2 clases grupales semanales</li>
                <li><span className="check-icon premium" />Wi-Fi en sala</li>
                <li><span className="check-icon premium" />1 consulta con entrenador mensual</li>
                <li><span className="check-icon premium" />Clases limitadas</li>
                <li><span className="check-icon premium" />Acceso a piscina, sauna</li>
                <li><span className="check-icon premium" />Plan de entrenamiento personalizado</li>
              </ul>
              <Button as={Link} to="/planes" variant="primary" size="sm">
                Suscribirse
              </Button>
            </div>
          </div>

          <div className="plan-horizontal gold">
            <div className="plan-info">
              <h4>Gold</h4>
              <div className="precio">$69.900 / mes</div>
            </div>
            <div className="plan-detalle">
              <ul>
                <li><span className="check-icon gold" /> Acceso a máquinas libre</li>
                <li><span className="check-icon gold" /> Vestuarios y lockers</li>
                <li><span className="check-icon gold" /> 3 clases grupales semanales</li>
                <li><span className="check-icon gold" /> Wi-Fi en sala</li>
                <li><span className="check-icon gold" /> 2 consultas con entrenador mensual</li>
                <li><span className="check-icon gold" /> Clases ilimitadas</li>
                <li><span className="check-icon gold" /> Acceso a piscina y sauna</li>
                <li><span className="check-icon gold" /> Plan de entrenamiento personalizado</li>
                <li><span className="check-icon gold" /> Acceso VIP (prioridad en reservas)</li>
              </ul>
              <Button as={Link} to="/planes" variant="primary" size="sm">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section horarios-v2">
        <h2 className="section-title">Horarios</h2>
        <div className="horarios-grid-v2">
          <div className="horario-card dia">
            <div className="horario-icon">📅</div>
            <div className="horario-text">
              <strong>Lunes a Viernes</strong>
              <span>06:00 - 22:00</span>
            </div>
          </div>
          <div className="horario-card sabado">
            <div className="horario-icon">🧘</div>
            <div className="horario-text">
              <strong>Sábados</strong>
              <span>08:00 - 18:00</span>
            </div>
          </div>
          <div className="horario-card cerrado">
            <div className="horario-icon">🚫</div>
            <div className="horario-text">
              <strong>Domingos</strong>
              <span>Cerrado</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section mapa-v2">
        <h2 className="section-title">Nuestras sedes</h2>
        <div className="mapa-grid">
          <div className="sede-lista">
            <div className="sede-card">
              <h4>Sucursal Central</h4>
              <p>Av. Principal 1234, CABA</p>
            </div>
            <div className="sede-card">
              <h4>Sede Palermo</h4>
              <p>Godoy Cruz 2345, CABA</p>
            </div>
            <div className="sede-card">
              <h4>Sede Belgrano</h4>
              <p>Av. Cabildo 4567, CABA</p>
            </div>
            <div className="sede-card">
              <h4>Sede San Telmo</h4>
              <p>Defensa 789, CABA</p>
            </div>
          </div>
          <div className="mapa-frame">
            <iframe
              title="Mapa P.Gym"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.123!2d-58.45!3d-34.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sP.Gym!5e0!3m2!1ses!2sar!4v1600000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

    </>
  );
}