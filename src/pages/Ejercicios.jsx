import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Spinner, Alert, InputGroup, FormControl } from 'react-bootstrap';
import { getAllExercises } from '../services/exerciseService';
import { translateExercise } from '../utils/translateExercise';
import '../styles/ejercicios.css';

const muscleGroups = [
  { value: 'abdominals', label: 'Abdominales' },
  { value: 'abductors', label: 'Aductores' },
  { value: 'adductors', label: 'Abductores' },
  { value: 'biceps', label: 'Bíceps' },
  { value: 'calves', label: 'Pantorrillas' },
  { value: 'chest', label: 'Pecho' },
  { value: 'forearms', label: 'Antebrazos' },
  { value: 'glutes', label: 'Glúteos' },
  { value: 'hamstrings', label: 'Isquiotibiales' },
  { value: 'lats', label: 'Dorsales' },
  { value: 'lower_back', label: 'Espalda Baja' },
  { value: 'middle_back', label: 'Espalda Media' },
  { value: 'neck', label: 'Cuello' },
  { value: 'quadriceps', label: 'Cuádriceps' },
  { value: 'traps', label: 'Trapecios' },
  { value: 'triceps', label: 'Tríceps' }
];

const exerciseTypes = [
  { value: 'cardio', label: 'Cardio' },
  { value: 'olympic_weightlifting', label: 'Pesas Olímpicas' },
  { value: 'plyometrics', label: 'Pliometría' },
  { value: 'powerlifting', label: 'Powerlifting' },
  { value: 'strength', label: 'Fuerza' },
  { value: 'stretching', label: 'Estiramientos' },
  { value: 'strongman', label: 'Strongman' }
];

export default function Ejercicios() {
  const [allExercises, setAllExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 20;
  const [availableTypes, setAvailableTypes] = useState([]);

  // Cargar todos los ejercicios al montar el componente
  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        const data = await getAllExercises();
        const translatedData = data.map(exercise => translateExercise(exercise));
        setAllExercises(translatedData);
        setFilteredExercises(translatedData);
      } catch (err) {
        console.error('Error loading exercises:', err);
        setError('No se pudieron cargar los ejercicios. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  // Resetear a la primera página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDifficulty, selectedType]);

  // Filtrar ejercicios cuando cambian los filtros
  useEffect(() => {
    if (allExercises.length === 0) return;

    const filtered = allExercises.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = !selectedDifficulty || exercise.difficulty === selectedDifficulty;
      const matchesType = !selectedType || exercise.type === selectedType;
      
      return matchesSearch && matchesDifficulty && matchesType;
    });

    setFilteredExercises(filtered);
}, [searchTerm, selectedDifficulty, selectedType, allExercises]);

    useEffect(() => {
    if (allExercises.length > 0) {
        const typesWithExercises = [...new Set(allExercises.map(ex => ex.type))];
        setAvailableTypes(
        exerciseTypes.filter(type => 
            typesWithExercises.includes(type.value)
        )
        );
    }
    }, [allExercises]);

// Calcular ejercicios para la página actual
const indexOfLastExercise = currentPage * exercisesPerPage;
const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);
const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);

  // cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // CSS según la dificultad y tipo de ejercicio
  const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty) {
      case 'principiante': return 'bg-success';
      case 'intermedio': return 'bg-warning';
      case 'avanzado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };
  const getExerciseTypeClass = (type) => {
    switch (type.toLowerCase()) {
        case 'cardio': return 'bg-danger'; // Rojo para cardio
        case 'olympic_weightlifting': return 'bg-info'; // Celeste para pesas olímpicas
        case 'plyometrics': return 'bg-warning'; // Amarillo para pliometría
        case 'powerlifting': return 'bg-primary'; // Azul para powerlifting
        case 'strength': return 'bg-success'; // Verde para fuerza
        case 'stretching': return 'bg-purple'; // Morado para estiramientos
        case 'strongman': return 'bg-dark'; // Negro para strongman
        default: return 'bg-secondary'; // Gris para cualquier otro
    }
  };

  const getExerciseImage = (muscle) => {
    return 'https://www.hsnstore.it/blog/wp-content/uploads/2013/05/fuerza-factores.jpg';
  };

  if (error) {
    return (
      <Container className="mt-2">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    
    <Container className="ejercicios-container">
      <h1 className="display-4 fw-bold text-light mb-3">Ejercicios</h1>
      
      {/* Filtros de búsqueda */}
      <div className="filters-container mb-4">
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Buscar ejercicio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del ejercicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
                <Form.Label>Dificultad</Form.Label>
                <Form.Select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                <option value="">Todas las dificultades</option>
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
                </Form.Select>
            </Form.Group>
            </Col>
          <Col md={4}>
            <Form.Group>
                <Form.Label>Tipo de ejercicio</Form.Label>
                <Form.Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                >
                <option value="">Todos los tipos</option>
                {availableTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                    {type.label}
                    </option>
                ))}
                </Form.Select>
            </Form.Group>
            </Col>
        </Row>
      </div>

      {loading ? (
        <div className="loading-container">
          <Spinner animation="border" variant="light" />
          <p className="mt-3">Cargando ejercicios...</p>
        </div>
      ) : (
        <>
          <div className="results-count mb-4">
            Mostrando {filteredExercises.length} de {allExercises.length} ejercicios
          </div>
          
          {filteredExercises.length === 0 ? (
            <div className="no-results">
              <i className="bi bi-search" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}></i>
              <h4>No se encontraron ejercicios</h4>
              <p className="text-muted">Intenta con otros términos de búsqueda o ajusta los filtros.</p>
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {currentExercises.map((exercise, index) => (
                <Col key={`${exercise.name}-${index}`} className="mb-4">
                    <Card className="exercise-card h-100 d-flex flex-column">
                    <div className="exercise-image-container">
                        <Card.Img 
                        variant="top" 
                        src={getExerciseImage(exercise.muscle)} 
                        alt={exercise.name}
                        className="exercise-img"
                        />
                    </div>
                    <Card.Body className="d-flex flex-column">
                        <div className="mb-2">
                        <span className={`badge ${getDifficultyBadgeClass(exercise.difficulty)} me-1`}>
                            {exercise.difficulty}
                        </span>
                        <span style={{ marginBottom: '0.25rem' }} className={`badge ${getExerciseTypeClass(exercise.type)} me-1`}>{exercise.type}</span>
                        <span style={{ marginBottom: '0.25rem' }} className="badge bg-secondary">{exercise.muscle}</span>
                        </div>
                        <Card.Title className="mb-2 fs-6">{exercise.name}</Card.Title>
                        <div className="exercise-instructions mt-auto">
                        {exercise.instructions ? (
                            <>
                            <h6 className="mb-1">Instrucciones:</h6>
                            <p className="small mb-0 text-truncate-3">
                                {exercise.instructions.length > 120 
                                ? `${exercise.instructions.substring(0, 250)}...` 
                                : exercise.instructions}
                            </p>
                            </>
                        ) : (
                            <div className="no-instructions" style={{ height: '3rem' }} />
                        )}
                        </div>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
          )}

          {/* Controles de paginación */}
          {filteredExercises.length > exercisesPerPage && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </button>
                  </li>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => paginate(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    );
                  })}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </Container>
  );
}