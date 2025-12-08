# 🏋️‍♂️ P-Gym - Plataforma de Gestión de Gimnasio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF?logo=vite)](https://vitejs.dev/)
[![API](https://img.shields.io/badge/API-Ninja_Exercises-00A67E?logo=api)](https://api-ninjas.com/api/exercises)

## 📋 Descripción del Proyecto

P-Gym es una plataforma web moderna diseñada para revolucionar la gestión de gimnasios, ofreciendo una experiencia intuitiva tanto para los administradores como para los usuarios. Con un diseño responsivo y una interfaz amigable, P-Gym facilita la administración de clases, seguimiento de máquinas disponibles y gestión de membresías.

### 🎯 Objetivos Principales
- **Para Usuarios**: Acceso fácil a información de clases, reservas y seguimiento de progreso.
- **Para Administradores**: Herramientas completas para la gestión de instalaciones, horarios y membresías.
- **Tecnológico**: Implementar las mejores prácticas de desarrollo web moderno con React y Vite.

### ✨ Beneficios Clave
- **Ahorro de Tiempo**: Gestión centralizada de todas las operaciones del gimnasio.
- **Accesibilidad**: Interfaz intuitiva disponible en cualquier dispositivo.
- **Escalable**: Arquitectura modular que permite crecer con las necesidades del negocio.

## 🚀 Características

- 📋 Visualización de clases disponibles
- 💪 Catálogo de ejercicios con búsqueda avanzada
- 🏋️‍♂️ Información detallada de máquinas del gimnasio
- 🔍 Sistema de búsqueda y filtrado intuitivo
- 🎨 Interfaz moderna con tema oscuro
- 📱 Diseño completamente responsivo
- ⚡ Integración con API de ejercicios

## 🛠️ Tecnologías

- **Frontend**: React 18, Vite 4
- **Estilos**: CSS Modules, Variables CSS
- **Gestión de Estado**: React Hooks, Context API
- **Enrutamiento**: React Router v6
- **API**: Ninja Exercises API
- **Bundler**: Vite
- **Iconos**: Bootstrap Icons
- **Componentes UI**: Bootstrap 5

## 🚀 Cómo comenzar

### Requisitos previos
- Node.js 16+
- npm 8+ o yarn 1.22+
- Clave de API de [Ninja API](https://api-ninjas.com/api/exercises)

### Instalación

1. Clona el repositorio
   ```bash
   git clone https://github.com/FrancoGoslino/Proyecto-Web-Gimnasios.git
   cd Proyecto-Web-Gimnasios

2. Instala las dependencias
   ```bash
   npm install
   # o
   yarn

3. Configura las variables de entorno
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega tu API key:
     ```
     VITE_API_KEY=tu_api_key_aquí
     ```

4. Inicia el servidor de desarrollo
   ```bash
   npm run dev
   # o
   yarn dev

5. Abre http://localhost:5173 en tu navegador
📂 Estructura del Proyecto
src/
   ├── components/     # Componentes reutilizables
   ├── contexts/       # Contextos de React
   ├── data/           # Datos iniciales
   ├── pages/          # Componentes de página
   └── styles/         # Estilos CSS

## 🆕 Novedades

### Últimas Actualizaciones
- ✅ Integración con Ninja Exercises API
- 🎨 Rediseño completo de las tarjetas de ejercicios
- 🔍 Sistema de búsqueda y filtrado mejorado
- 📱 Mejoras en la experiencia móvil
- 🎯 Optimización de rendimiento

## 🧩 Características Técnicas

### Ejercicios
- Búsqueda por nombre, tipo y grupo muscular
- Filtrado por dificultad y categoría
- Paginación de resultados
- Diseño de tarjetas con información detallada

### Máquinas
- Catálogo completo de equipamiento
- Información detallada por máquina
- Sistema de búsqueda integrado

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## ✉️ Contacto

Franco Goslino - [@FrancoGoslino](https://github.com/FrancoGoslino)

🔗 Enlace al proyecto: [https://github.com/FrancoGoslino/Proyecto-Web-Gimnasios](https://github.com/FrancoGoslino/Proyecto-Web-Gimnasios)

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev/)
- [Documentación de Vite](https://vitejs.dev/guide/)
- [Ninja Exercises API](https://api-ninjas.com/api/exercises)
- [Bootstrap 5](https://getbootstrap.com/)

## 📊 Estructura del Proyecto

```
src/
├── components/    # Componentes reutilizables
├── contexts/      # Contextos de React
├── pages/         # Componentes de página
├── services/      # Lógica de servicios y APIs
├── styles/        # Estilos globales
└── utils/         # Utilidades y helpers
```
