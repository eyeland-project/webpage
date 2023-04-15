import { useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

// components
import Menu from './components/Menu';
import Home from './components/Home';
import Course from './Course';
import useAuthStorage from '@hooks/useAuthStorage';
import { TeacherSections } from '@enums/Pages.enum';
import { TeacherProvider } from '@contexts/TeacherContext';
import { validToken } from '@utils/auth';

function Teacher() {
	const authStorage = useAuthStorage();
	if (!validToken(authStorage.getAccessToken())) {
		return <Navigate to={'/login'}></Navigate>;
	}

	const { pathname } = useLocation();
	const selectedKey = getMenuSelectedKeyFromPath(pathname);

	const [menuSelectedKey, setMenuSelectedKey] = useState(selectedKey);
	const [isSubmenuCollapsed, setSubmenuCollapsed] = useState(
		selectedKey === TeacherSections.HOME ? true : false
	);

	return (
		<TeacherProvider>
			<div className="flex h-screen">
				<div className="h-full fixed">
					<Menu
						isSubmenuCollapsed={isSubmenuCollapsed}
						setSubmenuCollapsed={setSubmenuCollapsed}
						selectedKey={menuSelectedKey}
						setSelectedKey={setMenuSelectedKey}
					></Menu>
				</div>
				<div
					className={`h-full grow transition-all duration-300 ${
						isSubmenuCollapsed ? 'ml-16' : 'ml-72'
					}`}
				>
					<Routes>
						<Route
							path="/"
							element={<Navigate to="/teacher/home" />}
						/>
						<Route path="/home" element={<Home />} />
						<Route path="/courses" element={<Course />} />
						<Route path="/*" element={<Navigate to="/404" />} />
					</Routes>
				</div>
			</div>
		</TeacherProvider>
	);
}

const getMenuSelectedKeyFromPath = (pathname: string): string =>
	String(pathname.split('/teacher').at(-1)).split('/')[1];

export default Teacher;
