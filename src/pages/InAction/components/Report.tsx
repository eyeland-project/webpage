import Title from '@components/Title'
import {useTranslation} from 'react-i18next'
import React from 'react'

function Report() {
    const {t} = useTranslation()

    return (
        <div>
            <Title title={t('inAction.sections.inAction.name')} textColor={'text-black'} />
            <div className='text-xl'>
                <p>
                {t('inAction.sections.inAction.text')}
                </p>
            </div>
        </div>
    )
}

export default Report