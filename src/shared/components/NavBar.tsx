import { Link, useNavigate } from 'react-router-dom';
import MiniLogo from '@icons/MiniLogo.svg';

function NavBar({ showTeacherButton = true }) {
	const navigate = useNavigate();

	return (
		<div className="relative mx-5 my-5 flex items-center justify-center md:justify-start">
			<div className=" cursor-pointer">
				<img
					src={MiniLogo}
					alt=""
					className="w-32"
					onClick={() => {
						navigate('/');
					}}
				/>
			</div>
			{showTeacherButton && (
				<div className="absolute right-0">
					<Link
						className="flex items-center justify-center rounded-lg bg-primary px-2 py-2 text-base font-bold text-white shadow-lg hover:opacity-80 active:opacity-70 md:px-5 md:py-3"
						to={'/login'}
					>
						<img src="Login.svg" alt="" className="md:hidden" />
						<p className="hidden md:block">Soy profesor</p>
					</Link>
				</div>
			)}
		</div>
	);
}

export default NavBar;
