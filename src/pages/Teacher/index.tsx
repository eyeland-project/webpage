import { ReactNode, useState, useEffect } from 'react';
import {
	useLocation,
	Navigate,
	useRoutes,
	NonIndexRouteObject
} from 'react-router-dom';

import useAuthStorage from '@hooks/useAuthStorage';
import { TeacherProvider } from '@contexts/TeacherContext';

import Menu from '@pages/Teacher/components/Menu';
import Home from '@pages/Teacher/Home';
import Course from '@pages/Teacher/Course';
import Courses from '@pages/Teacher/Courses';
import Student from '@pages/Teacher/Student';
import Students from '@pages/Teacher/Students';
import Session from '@pages/Teacher/Session';
import Submissions from '@pages/Teacher/Submissions';
import Submission from '@pages/Teacher/Submission';
import Task from '@pages/Teacher/Task';
import Tasks from '@pages/Teacher/Tasks';
import NotFound from '@pages/NotFound';

import { validToken } from '@utils/auth';
import { getMenuSelectedKeyFromPath } from '@utils/routing.utils';
import { Role } from '@enums/Role.enum';

function Teacher() {
	const authStorage = useAuthStorage();
	const tokenPayload = validToken(authStorage.getAccessToken());
	if (tokenPayload && tokenPayload.role === Role.ADMIN) {
		return <Navigate to={'/admin/home'}></Navigate>;
	} else if (!tokenPayload || tokenPayload.role !== Role.TEACHER) {
		return <Navigate to={'/login'}></Navigate>;
	}

	const { pathname } = useLocation();
	const selectedKey = getMenuSelectedKeyFromPath(pathname);
	const [menuSelectedKey, setMenuSelectedKey] = useState(selectedKey);
	const [isSubmenuCollapsed, setSubmenuCollapsed] = useState(
		selectedKey === 'home' ? true : false
	);

	const page = useRoutes(routes);

	useEffect(() => {
		const selectedKey = getMenuSelectedKeyFromPath(pathname);
		setMenuSelectedKey(selectedKey);
		setSubmenuCollapsed(selectedKey === 'home' ? true : false);
	}, [pathname]);

	return (
		<TeacherProvider>
			{page ? (
				<Layout
					isSubmenuCollapsed={isSubmenuCollapsed}
					setSubmenuCollapsed={setSubmenuCollapsed}
					menuSelectedKey={menuSelectedKey}
					setMenuSelectedKey={setMenuSelectedKey}
				>
					{page}
				</Layout>
			) : (
				<NotFound backTo="/teacher/home" />
			)}
		</TeacherProvider>
	);
}

function Layout({
	children,
	isSubmenuCollapsed,
	setSubmenuCollapsed,
	menuSelectedKey,
	setMenuSelectedKey
}: {
	children: ReactNode;
	isSubmenuCollapsed: boolean;
	setSubmenuCollapsed: Function;
	menuSelectedKey: string;
	setMenuSelectedKey: Function;
}) {
	return (
		<div className="flex h-screen">
			<div className="h-full fixed">
				<Menu
					isSubmenuCollapsed={isSubmenuCollapsed}
					selectedKey={menuSelectedKey}
				></Menu>
			</div>
			<div
				className={`h-full grow transition-all duration-300 ${
					isSubmenuCollapsed ? 'ml-16' : 'ml-72'
				}`}
			>
				{children}
			</div>
		</div>
	);
}

interface RouteObject extends NonIndexRouteObject {
	path: string;
}

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Navigate to="/teacher/home" />
	},
	{
		path: '/home',
		element: <Home />
	},
	{
		path: '/courses',
		element: <Courses />
	},
	{
		path: '/courses/:idCourse',
		element: <Course />
	},
	{
		path: '/students',
		element: <Students />
	},
	{
		path: '/students/:idStudent',
		element: <Student />
	},
	{
		path: '/session',
		element: <Session />
	},
	{
		path: '/submissions',
		element: <Submissions />
	},
	{
		path: '/submissions/:idTaskAttempt',
		element: <Submission />
	},
	{
		path: '/tasks',
		element: <Tasks />
	},
	{
		path: '/tasks/:idTask',
		element: <Task />
	}
];

export default Teacher;
