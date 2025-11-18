```powershell
@"
# 🏋️‍♂️ P-Gym - Plataforma de Gestión de Gimnasio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF?logo=vite)](https://vitejs.dev/)

Plataforma web moderna para la gestión de gimnasios que permite a los usuarios ver clases, máquinas disponibles y planes de membresía.

## 🚀 Características

- Visualización de clases disponibles
- Catálogo de máquinas del gimnasio
- Gestión de planes de membresía
- Sistema de perfil de usuario
- Interfaz responsiva y moderna

## 🛠️ Tecnologías

- **Frontend**: React 18, Vite 4
- **Estilos**: CSS Modules
- **Gestión de Estado**: React Context API
- **Enrutamiento**: React Router
- **Bundler**: Vite

## 🚀 Cómo comenzar

### Requisitos previos
- Node.js 16+
- npm 8+ o yarn 1.22+

### Instalación

1. Clona el repositorio
   \`\`\`bash
   git clone https://github.com/FrancoGoslino/Proyecto-Web-Gimnasios.git
   cd P-Gym
   \`\`\`

2. Instala las dependencias
   \`\`\`bash
   npm install
   # o
   yarn
   \`\`\`

3. Inicia el servidor de desarrollo
   \`\`\`bash
   npm run dev
   # o
   yarn dev
   \`\`\`

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador

## 📂 Estructura del Proyecto

\`\`\`
src/
├── components/     # Componentes reutilizables
├── contexts/       # Contextos de React
├── data/           # Datos iniciales
├── pages/          # Componentes de página
└── styles/         # Estilos CSS
\`\`\`

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, lee las [pautas de contribución](CONTRIBUTING.md) antes de enviar un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## ✉️ Contacto

Franco Goslino - [@FrancoGoslino]

Enlace al proyecto: [https://github.com/FrancoGoslino/Proyecto-Web-Gimnasios](https://github.com/FrancoGoslino/Proyecto-Web-Gimnasios)
"@ | Out-File -FilePath .\README.md -Encoding utf8

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
