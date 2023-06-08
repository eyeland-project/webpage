import Loading from 'react-loading';

function LoadingScreen({ loading }: { loading: boolean }) {
	return (
		<div className="flex flex-col grow justify-center items-center h-full">
			{loading ? (
				<Loading type="spin" color="#0D9748" />
			) : (
				<div className="italic w-3/5 text-center text-lg">
					No se pudo obtener la información
				</div>
			)}
		</div>
	);
}

export default LoadingScreen;
