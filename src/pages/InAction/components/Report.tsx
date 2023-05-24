import Title from '@components/Title'
import React from 'react'

function Report() {
    return (
        <div>
            <Title title={'Eyeland en acción'} textColor={'text-black'} />
            <div className='text-xl'>
                <p>
                    El día comenzó con la convocatoria de doce estudiantes seleccionados para participar en la validación del prototipo de nuestra nueva aplicación. Los estudiantes fueron organizados en cuatro equipos de tres miembros cada uno. De manera intencional, en cada equipo se incluyó a un estudiante con dificultades visuales para poder evaluar de manera adecuada la accesibilidad y funcionalidad colaborativa de la aplicación.
                </p>
                <p>
                    Los equipos procedieron a utilizar el primer módulo de la aplicación, el cual está diseñado para abordar las etapas de Aprendizaje, Colaboración y Evaluación. Por limitaciones de logística, sólo se pudo probar un módulo durante esta jornada. Durante las etapas de Aprendizaje y Colaboración, el módulo se centró en varios componentes de aprendizaje: vocabulario, uso de preposiciones de lugar, habilidad de escucha, comprensión lectora y producción oral.
                </p>
                <p>
                    En la etapa de Evaluación, se puso un especial énfasis en la producción oral, aunque se examinaron la mayoría de los componentes anteriores, con la excepción de la habilidad de escucha. Como resultado de esta omisión, los resultados del examen no reflejaron el nivel de los estudiantes en esa habilidad.
                </p>
                <p>
                    Al finalizar la experiencia con el módulo, se procedió a la recogida de datos mediante una encuesta de usabilidad y satisfacción. Las preguntas de la encuesta estaban diseñadas para obtener información sobre la facilidad de uso de la aplicación, la comprensión de las actividades de aprendizaje, la efectividad de las funciones de colaboración, y la satisfacción general con la experiencia de aprendizaje proporcionada por la aplicación. Los resultados de la encuesta fueron analizados para evaluar si la aplicación cumplía con sus objetivos de enseñanza y accesibilidad.
                </p>
            </div>
        </div>
    )
}

export default Report