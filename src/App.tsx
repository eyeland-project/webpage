import { Routes, Route } from 'react-router-dom';

import LandingPage from '@pages/LandingPage';
import Login from '@pages/Login';
import Teacher from '@pages/Teacher';
import NotFound from '@pages/Teacher/NotFound';

function App() {
	return (
		<div className="flex min-h-screen flex-col justify-between overflow-x-hidden font-Poppins">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/teacher/*" element={<Teacher />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
