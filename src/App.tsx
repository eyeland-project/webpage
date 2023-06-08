import { Routes, Route } from 'react-router-dom';

import LandingPage from '@pages/LandingPage';
import Login from '@pages/Login';
import Teacher from '@pages/Teacher';
import OurTeam from '@pages/OurTeam';
import LearnMore from '@pages/LearnMore';
import InAction from '@pages/InAction';
import NotFound from '@pages/NotFound';

function App() {
	return (
		<div className="flex min-h-screen flex-col justify-between overflow-x-hidden font-Poppins">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/teacher/*" element={<Teacher />} />
				<Route path="/ourteam" element={<OurTeam />} />
				<Route path="/learnmore" element={<LearnMore />} />
				<Route path="/inaction" element={<InAction />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
