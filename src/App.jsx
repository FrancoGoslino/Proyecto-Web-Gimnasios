import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClassesProvider } from './contexts/ClassesContext';
import AuthProvider from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './contexts/ProtectedRoute';

import Inicio from '@pages/Inicio';
import Login from '@pages/Login';
import MaquinasLista from '@pages/MaquinasLista';
import Error404 from '@pages/Error404';
import ClasesLista from '@pages/ClasesLista';
import PlanesLista from './pages/PlanesLista';
import Footer from './pages/Footer';
import Perfil from '@pages/Perfil';
import MisInscripciones from '@pages/MisInscripciones';
import Menu from '@components/Menu';
import CrearCuenta from '@pages/CrearCuenta';

import './App.css';


export default function App() {
  return (
    <ClassesProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="app-wrapper">
            <Menu />
            <div className="main-content">
              <Routes>
                <Route
                  path="/inicio"
                  element={
                    <Container>
                      <Inicio />
                    </Container>
                  }
                />
                
                  <Route
                    path="/crear-cuenta"
                    element = {
                      <Container>
                        <CrearCuenta />
                      </Container>
                    }
                  />
                
                <Route
                  path="/clases"
                  element={
                    <Container>
                      <ClasesLista />
                    </Container>
                  }
                />
                <Route
                  path="/maquinas"
                  element={
                    <Container>
                      <MaquinasLista />
                    </Container>
                  }
                />
                <Route
                  path="/planes"
                  element={
                    <Container>
                      <PlanesLista />
                    </Container>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Container>
                      <Login />
                    </Container>
                  }
                />
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/MisInscripciones"
                    element={
                      <Container>
                        <MisInscripciones />
                      </Container>
                    }
                  />
                </Route>
                <Route
                  path="/"
                  element={<Navigate to="/inicio" replace />}
                />
                <Route
                  path="/perfil"
                  element={
                    <Container>
                      <Perfil />
                    </Container>
                  }
                />

                <Route
                  path="*"
                  element={
                    <Container>
                      <Error404 />
                    </Container>
                  }
                />
              </Routes>
              
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ClassesProvider>
  );
}