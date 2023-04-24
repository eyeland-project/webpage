import { Link, useNavigate } from 'react-router-dom';
import MiniLogo from '@icons/MiniLogo.svg';
import Login from '@images/Login.svg';

function NavBar({ showTeacherButton = true }) {
	const navigate = useNavigate();

	return (
		<div className="fixed mx-5 my-5 flex items-center justify-center md:justify-start z-50 w-full">
			<div className={`flex px-5 h-16 shadow-2xl rounded-lg w-full justify-between items-center bg-white bg-opacity-90 ${!showTeacherButton && 'mr-10'}`}>
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
				<div className='flex gap-10 mr-5'>
					<Link to={'/ourteam'}>
						<p className="text-large font-bold text-center hover:underline">Nuestro equipo</p>
					</Link>
					<Link to={'/learnmore'}>
						<p className="text-large font-bold text-center hover:underline" >Aprende más</p>
					</Link>
				</div>
			</div>
			{showTeacherButton && (
				<div className='ml-4 mr-10 w-52 h-16'>
					<Link
						className="h-16 flex items-center justify-center rounded-lg bg-green-primary px-2 py-2 text-base font-bold text-white shadow-lg hover:opacity-80 active:opacity-70 md:px-5 md:py-3"
						to={'/login'}
					>
						<img src={Login} alt="" className="md:hidden" />
						<p className="hidden md:block">Soy profesor</p>
					</Link>
				</div>
			)}
		</div>
	);
}

export default NavBar;
