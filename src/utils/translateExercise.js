import { translateExerciseName } from './exerciseTranslations';

const translations = {
  // Músculos
  'biceps': 'bíceps',
  'triceps': 'tríceps',
  'chest': 'pecho',
  'back': 'espalda',
  'shoulders': 'hombros',
  'legs': 'piernas',
  'abs': 'abdominales',
  'cardio': 'cardio',
  'quadriceps': 'cuádriceps',
  'hamstrings': 'isquiotibiales',
  'calves': 'pantorrillas',
  'glutes': 'glúteos',
  'forearms': 'antebrazos',
  'traps': 'trapecios',
  'lats': 'dorsales',
  'middle back': 'espalda media',
  'lower back': 'espalda baja',
  
  // Tipos de ejercicio
  'strength': 'fuerza',
  'powerlifting': 'levantamiento de pesas',
  'stretching': 'estiramiento',
  'olympic weightlifting': 'levantamiento olímpico',
  'strongman': 'strongman',
  'plyometrics': 'pliometría',
  
  // Niveles de dificultad
  'beginner': 'principiante',
  'intermediate': 'intermedio',
  'expert': 'avanzado',
  
  // Equipamiento común
  'body only': 'solo con el peso corporal',
  'machine': 'máquina',
  'dumbbell': 'mancuerna',
  'barbell': 'barra',
  'kettlebell': 'kettlebell',
  'bands': 'bandas elásticas',
  'cable': 'polea',
  'e-z curl bar': 'barra z',
  'exercise ball': 'pelota de ejercicio',
  'foam roll': 'rodillo de espuma',
  'medicine ball': 'balón medicinal'
};

export const translateExercise = (exercise) => {
  if (!exercise) return exercise;
  
  const translatedName = translateExerciseName(exercise.name);
  
  return {
    ...exercise,
    name: translatedName,
    muscle: translations[exercise.muscle] || exercise.muscle,
    type: translations[exercise.type] || exercise.type,
    difficulty: translations[exercise.difficulty] || exercise.difficulty,
    equipment: exercise.equipment ? exercise.equipment.split(',').map(
      item => translations[item.trim()] || item.trim()
    ).join(', ') : 'Ninguno'
  };
};