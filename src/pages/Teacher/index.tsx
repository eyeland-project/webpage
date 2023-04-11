import { useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

// components
import Menu from './components/Menu';
import Home from './components/Home';
import Course from './Course';
import NotFound from './NotFound';
import useAuthStorage from '@hooks/useAuthStorage';
import { Sections } from '@enums/Teacher';

function Teacher() {
	const authStorage = useAuthStorage();
	if (!authStorage.getAccessToken()) {
		return <Navigate to={'/login'}></Navigate>;
	}

	const { pathname } = useLocation();
	const selectedKey = getMenuSelectedKeyFromPath(pathname);

	const [menuSelectedKey, setMenuSelectedKey] = useState(selectedKey);
	const [isSubmenuCollapsed, setSubmenuCollapsed] = useState(
		selectedKey === Sections.HOME ? true : false
	);

	return (
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
				className="h-full grow transition-all duration-300"
				style={{
					marginLeft: isSubmenuCollapsed ? '4rem' : '18rem'
				}}
			>
				<Routes>
					<Route path="/" element={<Navigate to="/teacher/home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/courses" element={<Course />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}

const getMenuSelectedKeyFromPath = (pathname: string): string =>
	String(pathname.split('/teacher').at(-1)).split('/')[1];

export default Teacher;
