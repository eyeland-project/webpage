import NavBar from '@components/NavBar';
import Hero from '@pages/LandingPage/components/Hero';
import Methodology from '@pages/LandingPage/components/Methodology';
import TeamWork from '@pages/LandingPage/components/TeamWork';
import Accessibility from '@pages/LandingPage/components/Accessibility';
import Footer from '@components/Footer';

function LandingPage() {
	return (
		<div>
			<NavBar />
			<Hero />
			<Methodology />
			<TeamWork />
			<Accessibility />
			<Footer />
		</div>
	);
}

export default LandingPage;
