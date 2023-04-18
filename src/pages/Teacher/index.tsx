import { useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import useAuthStorage from '@hooks/useAuthStorage';
import { TeacherProvider } from '@contexts/TeacherContext';

import Menu from '@pages/Teacher/components/Menu';
import Home from '@pages/Teacher/Home';
import Course from '@pages/Teacher/Course';
import Courses from '@pages/Teacher/Courses';
import Student from '@pages/Teacher/Student';
import Students from '@pages/Teacher/Students';
import Session from '@pages/Teacher/Session';
import Task from '@pages/Teacher/Task';
import Tasks from '@pages/Teacher/Tasks';

import { validToken } from '@utils/auth';
import { getMenuSelectedKeyFromPath } from '@utils/routing.utils';

function Teacher() {
	const authStorage = useAuthStorage();
	if (!validToken(authStorage.getAccessToken())) {
		return <Navigate to={'/login'}></Navigate>;
	}

	const { pathname } = useLocation();
	const selectedKey = getMenuSelectedKeyFromPath(pathname);

	const [menuSelectedKey, setMenuSelectedKey] = useState(selectedKey);
	const [isSubmenuCollapsed, setSubmenuCollapsed] = useState(
		selectedKey === 'home' ? true : false
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
						<Route path="/courses" element={<Courses />} />
						<Route path="/courses/:idCourse" element={<Course />} />
						<Route
							path="/courses/:idCourse/students"
							element={<Students />}
						/>
						<Route
							path="/courses/:idCourse/students/:idStudent"
							element={<Student />}
						/>
						<Route path="/session" element={<Session />} />
						<Route path="/tasks" element={<Tasks />} />
						<Route path="/tasks/:idTask" element={<Task />} />
						<Route path="/*" element={<Navigate to="/404" />} />
					</Routes>
				</div>
			</div>
		</TeacherProvider>
	);
}

export default Teacher;
