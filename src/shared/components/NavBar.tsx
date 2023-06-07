import { Link, useNavigate } from 'react-router-dom';
import {useTranslation, Trans} from 'react-i18next';
import {useState} from 'react';
import MiniLogo from '@icons/MiniLogo.svg';
import Login from '@images/Login.svg';
import Geography from '@icons/Geography.svg';

const lngs = {
	'en': { nativeName: 'English' },
	'es': { nativeName: 'Español' }
};

function NavBar({ showTeacherButton = true }) {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(i18n.language === 'en' ? lngs['en'] : lngs['es']);

	const changeLanguage = () => {
		const newLanguage = i18n.language === 'en' ? 'es' : 'en';
		i18n.changeLanguage(newLanguage);
		setLanguage(lngs[newLanguage]);
	}

	return (
		<div>
		<div className='flex gap-2 float-right my-1 mr-5 cursor-pointer' onClick={changeLanguage}>
			<p className='font-bold text-gray-700 items-center'>{language.nativeName}</p>
			<img src={Geography} alt="" />
		</div>
		<div className="relative mx-5 mb-5 flex items-center justify-center md:justify-start w-full">
			<div
				className={`flex px-5 h-16 shadow-2xl rounded-lg w-full justify-between items-center bg-white bg-opacity-90 ${!showTeacherButton && 'mr-10'
					}`}
			>
				<div className="cursor-pointer">
					<img
						src={MiniLogo}
						alt=""
						className="w-32"
						onClick={() => {
							navigate('/');
						}}
					/>
				</div>
				<div className="flex gap-10 mr-5">
					<Link to={'/ourteam'}>
						<p className="text-large font-bold text-center hover:underline">
							{t('navbar.ourTeam')}
						</p>
					</Link>
					<Link to={'/learnmore'}>
						<p className="text-large font-bold text-center hover:underline">
							{t('navbar.learnMore')}
						</p>
					</Link>
					<Link to={'/inaction'}>
						<p className="text-large font-bold text-center hover:underline">
							{t('navbar.inAction')}
						</p>
					</Link>
				</div>
			</div>
			{showTeacherButton && (
				<div className="ml-4 mr-10 w-52 h-16">
					<Link
						className="h-16 flex items-center justify-center rounded-lg bg-green-primary px-2 py-2 text-base font-bold text-white shadow-lg hover:opacity-80 active:opacity-70 md:px-5 md:py-3"
						to={'/login'}
					>
						<img src={Login} alt="" className="md:hidden" />
						<p className="hidden md:block">{t('navbar.teacher')}</p>
					</Link>
				</div>
			)}
		</div>
		</div>
	);
}

export default NavBar;
