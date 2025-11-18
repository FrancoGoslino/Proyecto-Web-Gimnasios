import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useClasses } from './ClassesContext';

const AuthContext = createContext();



export default function AuthProvider({ children }) {
  const { suscribirse, desinscribirse } = useClasses();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [suscripciones, setSuscripciones] = useState([]); // IDs de planes
  const [inscripciones, setInscripciones] = useState([]); // IDs de clases

  useEffect(() => {
    try {
      const raw = localStorage.getItem('usuario');
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
        setIsLoggedIn(true);
        setSuscripciones(parsed.suscripciones || []);
        setInscripciones(parsed.inscripciones || []);
      }
    } catch (e) {
    }
  }, []);

  const persistUser = useCallback((u) => {
    try {
      localStorage.setItem('usuario', JSON.stringify(u));
    } catch (e) {
     }
  }, []);

   const login = ({ email, recordar } = {}) => {
    const u = { email, nombre: '', telefono: '', foto: null, suscripciones: [], inscripciones: [] };
    setIsLoggedIn(true);
    setUser(u);
    setSuscripciones([]);
    setInscripciones([]);
    if (recordar) persistUser(u);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setSuscripciones([]);
    setInscripciones([]);
    localStorage.removeItem('usuario');
  };

   const updateUser = (partialUser) => {
    const merged = {
      ...(user || {}),
      ...partialUser,
      suscripciones: partialUser.suscripciones ?? suscripciones,
      inscripciones: partialUser.inscripciones ?? inscripciones
    };
    setUser(merged);
    setSuscripciones(merged.suscripciones || []);
    setInscripciones(merged.inscripciones || []);
    persistUser(merged);
  };

   const suscribirsePlan = (planId) => {
    setSuscripciones(prev => {
      if (prev.includes(planId)) return prev;
      const next = [planId];
      const u = { ...(user || {}), suscripciones: next, inscripciones: inscripciones };
      setUser(u);
      persistUser(u);
      return next;
    });
  };

  const cancelarSuscripcionPlan = (planId) => {
    setSuscripciones(prev => {
      const next = prev.filter(id => id !== planId);
      const u = { ...(user || {}), suscripciones: next, inscripciones: inscripciones };
      setUser(u);
      persistUser(u);
      return next;
    });
  };

  const inscribirEnClase = (claseId) => {
  if (inscripciones.includes(claseId)) return;
  const next = [...inscripciones, claseId];
  const u = { ...(user || {}), inscripciones: next };
  setInscripciones(next);
  setUser(u);
  persistUser(u);
  if (typeof suscribirse === 'function') suscribirse(claseId);
};

const desinscribirDeClase = (claseId) => {
  const next = inscripciones.filter(id => id !== claseId);
  const u = { ...(user || {}), inscripciones: next };
  setInscripciones(next);
  setUser(u);
  persistUser(u);
  if (typeof desinscribirse === 'function') desinscribirse(claseId);
};

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      login,
      logout,
      updateUser,
      suscripciones,
      suscribirsePlan,
      cancelarSuscripcionPlan,
      inscripciones,
      inscribirEnClase,
      desinscribirDeClase
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);