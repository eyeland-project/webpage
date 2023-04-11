import { useEffect, useState } from 'react';
import {
	Link,
	Route,
	Routes,
	useLocation,
	Navigate,
	redirect
} from 'react-router-dom';

import { Color } from '@enums/Styles.enum';

// components
import Menu from './components/Menu';
import Home from './components/Home';
import Courses from './Courses';
import NotFound from './NotFound';
import useAuthStorage from '@hooks/useAuthStorage';

function Teacher() {
	const authStorage = useAuthStorage();
	if (!authStorage.getAccessToken()) {
		return <Navigate to={'/login'}></Navigate>;
	}

	const { pathname } = useLocation();
	const selectedKey = getMenuSelectedKeyFromPath(pathname);

	const [menuSelectedKey, setMenuSelectedKey] = useState(selectedKey);
	const [isSubmenuCollapsed, setSubmenuCollapsed] = useState(
		selectedKey === 'home' ? true : false
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
					marginLeft: isSubmenuCollapsed ? '5rem' : '20rem'
				}}
			>
				<Routes>
					<Route path="/" element={<Navigate to="/teacher/home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}

const getMenuSelectedKeyFromPath = (pathname: string): string =>
	String(pathname.split('/teacher').at(-1)).split('/')[1];

export default Teacher;
