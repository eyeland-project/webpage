import Geography from '@icons/Geography.svg';
import ColombiaFlag from '@images/ColombiaFlag.png';
import USAFlag from '@images/USAFlag.png';

import { useTranslation, Trans } from 'react-i18next';
import { useState } from 'react';

const lngs = {
	en: { nativeName: 'English' },
	es: { nativeName: 'Español' }
};

interface Props {
	type: 'small' | 'large';
}

function LanguageSwitch({ type }: Props) {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(
		i18n.language === 'en' ? lngs['en'] : lngs['es']
	);

	const changeLanguage = () => {
		const newLanguage = i18n.language === 'en' ? 'es' : 'en';
		i18n.changeLanguage(newLanguage);
		setLanguage(lngs[newLanguage]);
	};

	return (
		<div
			className={
				type === 'small'
					? 'flex gap-2 float-right my-1 mr-5 cursor-pointer'
					: 'rounded-xl w-12 h-12 cursor-pointer relative hover:scale-105 transition-all duration-300 bg-[#3A84DB] shadow-buttonNavbar'
			}
			onClick={changeLanguage}
		>
			<p
				className={
					type === 'small'
						? 'font-bold text-gray-700 items-center'
						: 'hidden'
				}
			>
				{language.nativeName}
			</p>
			<img
				className={type === 'large' ? 'hidden' : ''}
				src={Geography}
				alt=""
			/>
			<img
				className={
					type === 'large'
						? 'w-3/5 h-3/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none'
						: 'hidden'
				}
				src={language.nativeName === 'English' ? USAFlag : ColombiaFlag}
				alt=""
			/>
		</div>
	);
}

export default LanguageSwitch;
