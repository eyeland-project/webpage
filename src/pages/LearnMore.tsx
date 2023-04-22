import Footer from '@components/Footer'
import NavBar from '@components/NavBar'
import Title from '@components/Title'
import Lottie from 'lottie-react';
import accessibility from '@animations/AccessibilityColors.json';

function LearnMore() {
    return (
        <>
            <NavBar />
            <div className='mt-40 mx-20'>
                <div className=' flex justify-between gap-20 items-center'>
                    <h1 className='font-bold text-6xl max-w-96 w-1/2'>
                        Inclusión y aprendizaje de inglés para todos:
                        <span className='font-normal'>una experiencia innovadora</span>
                    </h1>
                    <Lottie animationData={accessibility} loop={true} className='mr-20' />
                </div>
                <Title title={'Introducción'} textColor={'text-black'} />
                <p className='text-xl'>
                    En nuestra misión de brindar oportunidades educativas a todos los estudiantes de educación media en Colombia, hemos creado una aplicación móvil que no solo facilita el aprendizaje del inglés, sino que también es accesible para personas con discapacidad visual. Nuestra plataforma inclusiva se basa en metodologías de enseñanza efectivas y técnicas de accesibilidad, asegurando que todos los estudiantes, independientemente de sus habilidades, puedan beneficiarse de nuestras actividades y recursos.
                </p>
                <Title title={'Metodologías de enseñanza'} textColor={'text-black'} />
                <p className='text-xl'>
                    Nuestra aplicación incorpora una variedad de metodologías de enseñanza probadas, como el enfoque comunicativo, la enseñanza basada en tareas y el aprendizaje basado en proyectos. Estas metodologías fomentan la interacción en situaciones reales, promueven la colaboración entre estudiantes y facilitan un aprendizaje significativo y duradero.
                </p>
                <Title title={'Accesibilidad'} textColor={'text-black'} />
                <p className='text-xl'>
                    Creemos firmemente en la inclusión de todos los estudiantes, y por ello hemos implementado características accesibles para personas con discapacidad visual. Algunas de estas características incluyen:
                </p>
                <ul className='list-decimal list-inside text-xl ml-5'>
                    <li>Integración con lectores de pantalla y asistentes de voz: Nuestra aplicación es compatible con las tecnologías asistivas más comunes, permitiendo a los usuarios con discapacidad visual navegar e interactuar fácilmente con el contenido.</li>
                    <li>Diseño de alto contraste y ajustes de tamaño de fuente: Los usuarios pueden personalizar la apariencia de la aplicación según sus necesidades, eligiendo entre esquemas de color de alto contraste y ajustando el tamaño de fuente.</li>
                    <li>Contenido de audio: Complementamos nuestras actividades con recursos de audio para apoyar a los estudiantes que prefieren aprender a través del oído. Además, nuestra plataforma permite a los estudiantes grabar y almacenar audios para su práctica y evaluación.</li>
                </ul>
                <div className='mt-10 card border text-center text-2xl border-black'>
                    <p>Únete a nuestra comunidad y descubre cómo nuestra aplicación puede marcar la diferencia en el aprendizaje del inglés y la inclusión de estudiantes con discapacidad visual en Colombia. </p>
                    <p className='mt-10 font-bold'>¡Juntos, podemos construir un futuro más inclusivo y equitativo para todos!</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LearnMore