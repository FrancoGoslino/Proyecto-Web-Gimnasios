const API_URL = 'https://api.api-ninjas.com/v1/exercises';
const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;

// Obtener todos los ejercicios de la API
export const getAllExercises = async () => {
  try {
    const muscleGroups = [
      'abdominals', 'abductors', 'adductors', 'biceps', 'calves', 
      'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 
      'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps'
    ];

    // Hacer todas las peticiones en paralelo
    const promises = muscleGroups.map(muscle => 
      fetch(`${API_URL}?muscle=${muscle}`, {
        headers: { 'X-Api-Key': API_KEY }
      }).then(response => {
        if (!response.ok) throw new Error('Error en la petición');
        return response.json();
      })
    );

    // Esperar a que todas las peticiones terminen
    const results = await Promise.all(promises);
    
    // Combinar y eliminar duplicados
    const allExercises = results.flat();
    const uniqueExercises = Array.from(
      new Map(allExercises.map(ex => [ex.name, ex])).values()
    );
    
    return uniqueExercises;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};