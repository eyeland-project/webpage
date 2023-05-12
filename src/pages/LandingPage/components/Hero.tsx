import useRelease from '@hooks/useRelease';
import EyeLandHero from '@images/EyeLandHero.svg';
import { useRef } from 'react';

function Hero() {
	const downloadRef = useRef<HTMLAnchorElement>(null);
	const { release, getLatestRelease } = useRelease();

	const handleDownload = async () => {
		if (!release) {
			try {
				await getLatestRelease();
			} catch (error) {
				console.log(error);
			}
		}
		downloadRef.current?.click();
	};

	return (
		<div className="flex h-auto w-screen flex-col-reverse items-center justify-center gap-3 px-20 md:flex-row xl:gap-20 mt-20">
			<div className="flex flex-col items-start xl:w-[550px]">
				<h1 className="to animate-entrance-1 bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-7xl font-bold text-transparent xl:text-9xl">
					EYELAND
				</h1>
				<h2 className="animate-entrance-2 text-xl font-medium opacity-70 xl:text-2xl">
					App para la enseñanza del inglés y el trabajo en equipo
				</h2>
				<div
					className="button mt-5 animate-entrance-3 cursor-default bg-green-tertiary text-xl text-white xl:text-4xl flex items-center gap-2"
					onClick={handleDownload}
				>
					¡Descargar aquí!
					<a
						className="hidden"
						ref={downloadRef}
						download={`EyeLand-${release?.version}.apk`}
						href={release?.url}
					/>
				</div>
				<div className='my-3 ml-5 w-10 h-0.5 bg-black opacity-25' />
				<div
					className="button animate-entrance-4 cursor-default bg-white border border-green-tertiary text-xl text-green-tertiary xl:text-4xl flex items-center gap-2"
				>
					<a href="https://proyecto-final-epics.github.io/EyelandApp/">
						Usar online
					</a>
				</div>
			</div>
			<div className="w-[400px] xl:w-auto">
				<img
					src={EyeLandHero}
					alt=""
					className="relative -right-10 w-[400px] xl:block xl:w-auto"
				/>
			</div>
		</div>
	);
}

export default Hero;
