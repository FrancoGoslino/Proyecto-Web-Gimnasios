import React, { createContext, useContext, useEffect, useState } from 'react';


const ClassesContext = createContext();
const suscribirse = (claseId) => {
  setClases(prev =>
    prev.map(c => c.ID === claseId ? { ...c, inscritos: c.inscritos + 1 } : c)
  );
};

const desinscribirse = (claseId) => {
  setClases(prev =>
    prev.map(c => c.ID === claseId ? { ...c, inscritos: Math.max(0, c.inscritos - 1) } : c)
  );
};
export function ClassesProvider({ children, initial = [] }) {
  const [clases, setClases] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('clases');
      if (raw) setClases(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('clases', JSON.stringify(clases));
    } catch (e) {
      // ignore
    }
  }, [clases]);

  const suscribirse = (id) => {
    setClases(prev =>
      prev.map(c =>
        c.ID === id && c.inscritos < c.capacidad ? { ...c, inscritos: c.inscritos + 1 } : c
      )
    );
  };

  const desinscribirse = (id) => {
    setClases(prev =>
      prev.map(c =>
        c.ID === id && c.inscritos > 0 ? { ...c, inscritos: c.inscritos - 1 } : c
      )
    );
  };

  return (
    <ClassesContext.Provider value={{
      clases,
      setClases,
      loading,
      error,
      suscribirse,
      desinscribirse
    }}>
      {children}
    </ClassesContext.Provider>
  );

  
}

export const useClasses = () => useContext(ClassesContext);
export default ClassesContext;