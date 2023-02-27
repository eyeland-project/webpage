import EyeLandHero from "@images/EyeLandHero.svg";

function Hero() {
    return (
        <div className="flex h-auto w-screen flex-col-reverse items-center justify-center gap-3 px-20 md:flex-row xl:gap-20">
            <div className="flex flex-col items-start xl:w-[550px]">
                <h1 className="to animate-entrance-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-7xl font-bold text-transparent xl:text-9xl">
                    EYELAND
                </h1>
                <h2 className="animate-entrance-2 text-xl font-medium opacity-70 xl:text-2xl">
                    App para la enseñanza del inglés y el trabajo en equipo
                </h2>
                <div className="button mt-5 animate-entrance-3 cursor-default bg-terciary text-xl text-white xl:text-4xl">
                    ¡Muy Pronto!
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
