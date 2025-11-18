import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaRunning, FaUserFriends, FaChartLine, FaCheck, FaArrowRight } from 'react-icons/fa';
import { useCallback } from 'react';
import { Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ExampleCarouselImage from '@components/ExampleCarouselImage';
import ScrollToTop from '../ScrollTop';

import '../styles/landing.css';
import '../styles/carousel-styles.css';

export default function Inicio() {
  const slides = [
    {
      id: 1,
      title: 'SUCURSAL CENTRAL',
      caption: '¡Visítanos en nuestra sucursal principal!',
      boton_1: { text: 'Empezar por $19.900', to: '/planes' },
      boton_2: { text: 'Ver planes', to: '/planes' },
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

   useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const particlesOptions = {
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#4facfe",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        },
        random: true
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false
        },
        random: true
      },
    },
    detectRetina: true,
  };

  return (
    <div className="main-content">
      <ScrollToTop />
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
        className="particles"
      />

      <div className="position-relative">
      <Carousel 
        fade 
        activeIndex={index} 
        onSelect={handleSelect} 
        interval={5000} 
        pause="hover" 
        controls 
        indicators
        className="hero-carousel"
      >
        {slides.map(s => (
          <Carousel.Item key={s.id} style={{ height: '90vh', minHeight: '600px' }}>
            <div 
              className="w-100 h-100" 
              style={{
                backgroundImage: `url(${s.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              <div className="carousel-info-card">
                <h2 className="carousel-info-title">{s.title}</h2>
                <p className="carousel-info-text">{s.caption}</p>
                <div className="carousel-info-buttons">
                  <Button 
                    as={Link} 
                    to={s.boton_1.to} 
                    className="btn-primary"
                  >
                    {s.boton_1.text}
                  </Button>
                  <Button 
                    as={Link} 
                    to={s.boton_2.to} 
                    className="btn-outline-light ms-2"
                  >
                    {s.boton_2.text}
                  </Button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      </div>

      <section className="landing-section beneficios animate-on-scroll">
        <Container>
          <motion.h2 
            className="section-title glow-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ¿Por qué elegir <span style={{ color: '#4facfe' }}>P.Gym</span>?
          </motion.h2>
          
          <div className="beneficios-grid-v2">
            <motion.div 
              className="beneficio-card" 
              style={{ backgroundImage: 'url(https://aquasportsgrancanaria.com/wp-content/uploads/hiit-o-entrenamiento-intervalico-de-alta-intensidad.jpg)' }}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="overlay" />
              <div className="icon">
                <FaDumbbell />
              </div>
              <div className="text">
                <h4>Entrenamiento Libre</h4>
                <p>Acceso ilimitado a nuestra amplia gama de equipos de última generación, zona funcional y área de cardio.</p>
                <Button variant="outline-light" size="sm" className="mt-2">
                  Ver instalaciones <FaArrowRight className="ms-1" />
                </Button>
              </div>
            </motion.div>

            <motion.div 
              className="beneficio-card" 
              style={{ backgroundImage: 'url(https://crunch.com/wp-content/uploads/2023/09/CR011SLTH_The-Hub_09.01.232-800x584.jpg)' }}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="overlay" />
              <div className="icon">
                <FaRunning />
              </div>
              <div className="text">
                <h4>Clases Guiadas</h4>
                <p>Más de 20 clases semanales con instructores certificados. Desde HIIT hasta yoga, tenemos algo para todos.</p>
                <Button variant="outline-light" size="sm" className="mt-2">
                  Ver clases <FaArrowRight className="ms-1" />
                </Button>
              </div>
            </motion.div>

            <motion.div 
              className="beneficio-card" 
              style={{ backgroundImage: 'url(https://media.istockphoto.com/id/1849345050/es/foto/instructora-personal-y-mujer-atl%C3%A9tica-que-realiza-planes-de-ejercicios-en-un-gimnasio.jpg?s=612x612&w=0&k=20&c=y1b0zh5MJUeaaP-ySNh6XsE8TPFd5ysUG9f8SxtUg6I=)' }}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="overlay" />
              <div className="icon">
                <FaUserFriends />
              </div>
              <div className="text">
                <h4>Entrenamiento Personalizado</h4>
                <p>Planes de entrenamiento personalizados con nuestros entrenadores expertos para alcanzar tus metas más rápido.</p>
                <Button variant="outline-light" size="sm" className="mt-2">
                  Conoce más <FaArrowRight className="ms-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
          
      {/* Sección de Planes */}
      <section className="landing-section planes-horizontal animate-on-scroll">
        <Container>
          <motion.h2 
            className="section-title mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Elige tu <span style={{ color: '#4facfe' }}>Plan Ideal</span>
          </motion.h2>
          
          <div className="planes-horizontal-grid">
            <motion.div 
              className="plan-horizontal standard"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="plan-info">
                <h4>Standard</h4>
                <div className="precio">$19.900 <span className="periodo">/mes</span></div>
                <small className="text-muted">Ideal para empezar</small>
              </div>
              <div className="plan-detalle">
                <ul>
                  <li><span className="check-icon standard" /><span>Acceso ilimitado a máquinas</span></li>
                  <li><span className="check-icon standard" /><span>Vestuarios y lockers</span></li>
                  <li><span className="check-icon standard" /><span>1 clase grupal semanal</span></li>
                  <li><span className="check-icon standard" /><span>Wi-Fi en sala</span></li>
                </ul>
                <Button as={Link} to="/planes" className="btn-gradient">
                  Empezar ahora
                </Button>
              </div>
            </motion.div>

            <motion.div 
              className="plan-horizontal standard-plus"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="plan-info">
                <h4>Standard+</h4>
                <div className="precio">$29.900 <span className="periodo">/mes</span></div>
                <small className="text-muted">Lo más popular</small>
              </div>
              <div className="plan-detalle">
                <ul>
                  <li><span className="check-icon standard-plus" /><span>Todo en Standard</span></li>
                  <li><span className="check-icon standard-plus" /><span>+ 1 consulta mensual con entrenador</span></li>
                  <li><span className="check-icon standard-plus" /><span>Acceso a app de seguimiento</span></li>
                  <li><span className="check-icon standard-plus" /><span>Descuentos en suplementos</span></li>
                </ul>
                <Button as={Link} to="/planes" className="btn-gradient">
                  Elegir este plan
                </Button>
              </div>
            </motion.div>

            <motion.div 
              className="plan-horizontal premium"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="plan-info">
                <h4>Premium</h4>
                <div className="precio">$44.900 <span className="periodo">/mes</span></div>
                <small className="text-muted">Para los más exigentes</small>
              </div>
              <div className="plan-detalle">
                <ul>
                  <li><span className="check-icon premium" /><span>Todo en Standard+</span></li>
                  <li><span className="check-icon premium" /><span>Clases ilimitadas</span></li>
                  <li><span className="check-icon premium" /><span>Acceso a piscina y sauna</span></li>
                  <li><span className="check-icon premium" /><span>Plan de entrenamiento personalizado</span></li>
                  <li><span className="check-icon premium" /><span>2 consultas mensuales con entrenador</span></li>
                </ul>
                <Button as={Link} to="/planes" className="btn-gradient">
                  Elegir Premium
                </Button>
              </div>
            </motion.div>

            <motion.div 
              className="plan-horizontal gold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="plan-info">
                <h4>Gold</h4>
                <div className="precio">$69.900 <span className="periodo">/mes</span></div>
                <small className="text-muted">Experiencia VIP</small>
              </div>
              <div className="plan-detalle">
                <ul>
                  <li><span className="check-icon gold" /><span>Todo en Premium</span></li>
                  <li><span className="check-icon gold" /><span>Acceso VIP 24/7</span></li>
                  <li><span className="check-icon gold" /><span>Entrenador personal incluido</span></li>
                  <li><span className="check-icon gold" /><span>Nutricionista 1 vez al mes</span></li>
                  <li><span className="check-icon gold" /><span>Toalla y locker permanente</span></li>
                  <li><span className="check-icon gold" /><span>Acceso a eventos exclusivos</span></li>
                </ul>
                <Button as={Link} to="/planes" className="btn-gradient">
                  Ser VIP
                </Button>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mt-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
          </motion.div>
        </Container>
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

      {/* Sección de CTA */}
      <section className="py-5 bg-dark text-white text-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="display-5 fw-bold mb-4">¿Listo para transformar tu vida?</h2>
            <p className="lead mb-4">Únete a nuestra comunidad fitness y comienza tu viaje hacia una vida más saludable hoy mismo.</p>
            <div className="d-flex justify-content-center gap-3">
              <Button as={Link} to="/registro" size="lg" className="btn-gradient px-4">
                Comenzar ahora
              </Button>
              <Button as={Link} to="/contacto" variant="outline-light" size="lg" className="px-4">
                Contáctanos
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}