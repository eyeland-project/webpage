import Title from '@components/Title';
import { useTranslation } from 'react-i18next';
import React from 'react';

function Report() {
	const { t } = useTranslation('', {
		keyPrefix: 'inAction.sections.inAction'
	});

	return (
		<div>
			<Title title={t('name')} textColor={'text-black'} />
			<div className="text-xl">
				<p>{t('text')}</p>
			</div>
		</div>
	);
}

export default Report;
