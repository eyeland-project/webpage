import NavBar from '@components/NavBar';
import Hero from './components/Hero';
import Methodology from './components/Methodology';
import TeamWork from './components/TeamWork';
import Accessibility from './components/Accessibility';
import OurTeam from './components/OurTeam';
import Footer from '@components/Footer';

function LandingPage() {
	return (
		<div>
			<NavBar />
			<Hero />
			<Methodology />
			<TeamWork />
			<Accessibility />
			<OurTeam />
			<Footer />
		</div>
	);
}

export default LandingPage;
