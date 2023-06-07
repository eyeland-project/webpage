import Title from '@components/Title'
import { useMemo } from 'react'
import {useTranslation} from 'react-i18next'


function Testimonies() {

    const testimonies = useMemo(() => {
        return [
            'testimonies/4.ogg',
            'testimonies/5.ogg',
            'testimonies/6.ogg',
            'testimonies/7.ogg'
        ]
    }, [])

    const {t} = useTranslation()

    return (
        <div>
            <Title title={t('inAction.sections.testimonies')} textColor='text-black' />
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
