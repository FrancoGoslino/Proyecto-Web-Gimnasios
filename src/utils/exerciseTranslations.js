export const exerciseNameTranslations = {
  // Ejercicios de brazos
  'barbell curl': 'Curl de bíceps con barra',
  'dumbbell curl': 'Curl de bíceps con mancuerna',
  'hammer curl': 'Curl martillo',
  'concentration curl': 'Curl concentrado',
  'tricep dip': 'Fondos en paralelas',
  'tricep pushdown': 'Jalón de tríceps en polea',
  'skullcrusher': 'Fondos franceses',
  'overhead tricep extension': 'Extensión de tríceps por encima de la cabeza',
  
  // Ejercicios de pecho
  'barbell bench press': 'Press de banca con barra',
  'dumbbell bench press': 'Press de banca con mancuernas',
  'incline bench press': 'Press inclinado con barra',
  'decline bench press': 'Press declinado con barra',
  'chest fly': 'Aperturas con mancuernas',
  'push up': 'Flexiones de pecho',
  'dip': 'Fondos en paralelas',
  
  // Ejercicios de espalda
  'pull up': 'Dominadas',
  'chin up': 'Dominadas supinas',
  'lat pulldown': 'Jalón al pecho',
  'bent over row': 'Remo inclinado con barra',
  't-bar row': 'Remo con barra T',
  'seated row': 'Remo sentado en máquina',
  'deadlift': 'Peso muerto',
  
  // Ejercicios de hombros
  'overhead press': 'Press militar',
  'arnold press': 'Press Arnold',
  'lateral raise': 'Elevaciones laterales',
  'front raise': 'Elevaciones frontales',
  'rear delt fly': 'Vuelos posteriores',
  'face pull': 'Face pull',
  'upright row': 'Remo al mentón',
  
  // Ejercicios de piernas
  'squat': 'Sentadillas',
  'front squat': 'Sentadilla frontal',
  'bulgarian split squat': 'Sentadilla búlgara',
  'leg press': 'Prensa de piernas',
  'leg extension': 'Extensión de piernas',
  'leg curl': 'Curl de piernas',
  'romanian deadlift': 'Peso muerto rumano',
  'calf raise': 'Elevaciones de pantorrillas',
  
  // Ejercicios de abdominales
  'crunch': 'Abdominales',
  'sit up': 'Abdominales completos',
  'leg raise': 'Elevaciones de piernas',
  'russian twist': 'Giros rusos',
  'plank': 'Plancha',
  'mountain climber': 'Escalador',
  'hanging leg raise': 'Elevaciones de piernas colgado',
  
  // Cardio
  'jumping jacks': 'Saltos de tijera',
  'burpee': 'Burpees',
  'jump rope': 'Saltar la cuerda',
  'high knees': 'Rodillas al pecho',
  'mountain climbers': 'Escalador',
  'jump squat': 'Sentadilla con salto',
  };

export const translateExerciseName = (name) => {
  if (!name) return name;
  
  const lowerName = name.toLowerCase().trim();
  
  if (exerciseNameTranslations[lowerName]) {
    return exerciseNameTranslations[lowerName];
  }
  
  for (const [key, value] of Object.entries(exerciseNameTranslations)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }
  return name;
};