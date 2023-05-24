import { useMemo } from 'react'
import Flickity from 'react-flickity-component'
import 'flickity/css/flickity.css'

const flickityOptions = {
    initialIndex: 2,
    wrapAround: true,
    autoPlay: 3000,
    pauseAutoPlayOnHover: true,
    prevNextButtons: false,
    pageDots: false
}

function Hero() {

    const images = useMemo(() => [
        'images/1.jpeg',
        'images/2.jpeg',
        'images/3.jpeg',
        'images/4.jpeg',
        'images/5.jpeg',
    ], [])

    return (
        <div className='py-10'>
            <h1 className='uppercase text-center bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-7xl font-bold text-transparent xl:text-6xl'>Institución Educativa Distrital La Magdalena</h1>
            <div className="mt-10">
                <Flickity className={'carousel w-full overflow-visible'} options={flickityOptions} >
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`carousel-item-${index}`} className="w-full h-[35vw] object-cover rounded-xl shadow-lg" />
                    ))}
                </Flickity>
            </div>
        </div>
    )
}

export default Hero
