import { Link } from 'react-router-dom';
import BrokenLink from '@icons/BrokenLink.svg';

function NotFound({
	backTo = '/',
	backMessage = 'Regresar al inicio'
}: {
	backTo?: string;
	backMessage?: string;
}) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="text-center p-8 bg-white rounded-xl shadow-md">
				<div className="mb-4">
					<img
						src={BrokenLink}
						alt=""
						className="w-20 h-20 mx-auto"
					/>
				</div>
				<h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
				<h2 className="text-4xl text-green-600 mb-8">
					Página No Encontrada
				</h2>
				<p className="text-xl text-green-500 mb-8">
					La página que estás buscando no existe o ha sido movida de
					sitio.
				</p>
				<Link
					to={backTo}
					className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white"
				>
					{backMessage}
				</Link>
			</div>
		</div>
	);
}

export default NotFound;