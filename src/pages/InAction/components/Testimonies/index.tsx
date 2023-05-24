import Title from '@components/Title'
import { useMemo } from 'react'


function Testimonies() {

    const testimonies = useMemo(() => {
        return [
            'testimonies/4.ogg',
            'testimonies/5.ogg',
            'testimonies/6.ogg',
            'testimonies/7.ogg'
        ]
    }, [])

    return (
        <div>
            <Title title='Testimonios' textColor='text-black' />
            <div className='flex py-2 space-x-4 justify-center flex-wrap'>
                {
                    testimonies.map((testimony, index) => {
                        return (
                            <div key={index} className='flex flex-col items-center justify-center'>
                                <div className="w-72 shadow-lg">
                                    <div className="p-4">
                                        <audio controls src={testimony} className="w-full">
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Testimonies
