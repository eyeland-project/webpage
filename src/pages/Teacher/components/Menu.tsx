import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

import useAuthStorage from '@hooks/useAuthStorage';

import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import SubMenuCourses from './SubMenuCourses';
import SubMenuTasks from './SubMenuTasks';

import Logo from '@icons/Logo.svg';
import Logout from '@icons/Logout.svg';
import Home from '@icons/Home.svg';
import Whiteboard from '@icons/Whiteboard.svg';
import TasksIcon from '@icons/Tasks.svg';

function Menu({
	isSubmenuCollapsed,
	setSubmenuCollapsed,
	selectedKey,
	setSelectedKey
}: {
	isSubmenuCollapsed: boolean;
	setSubmenuCollapsed: Function;
	selectedKey: string;
	setSelectedKey: Function;
}) {
	const authStorage = useAuthStorage();

	const onSelectSection = (sectionName: string) => {
		setSelectedKey(sectionName);
		if (sectionName !== 'home' && isSubmenuCollapsed) {
			setSubmenuCollapsed(false);
		} else if (sectionName === 'home' && !isSubmenuCollapsed) {
			setSubmenuCollapsed(true);
		}
	};

	const onClickLogout = () => {
		authStorage.removeAccessToken();
	};

	const getSubMenuElement = (): ReactNode => {
		const section = sections.find(
			(section) => section.name === selectedKey
		);
		if (!section) return null;
		return (
			<div
				className={`h-full transition-all duration-300 ${
					isSubmenuCollapsed
						? '-ml-60 none'
						: 'ml-0 shadow-lateralNavbar'
				}`}
			>
				<SubMenu>{section.submenu}</SubMenu>
			</div>
		);
	};

	return (
		<div className="h-full flex">
			<div className="h-full flex flex-col justify-between items-center py-3 relative z-20 bg-green-tertiary w-16 shadow-lateralNavbar">
				<div className="flex flex-col justify-between items-center gap-8">
					<Link
						to="/teacher/home"
						onClick={() => onSelectSection('home')}
					>
						<img
							src={Logo}
							alt="Logo"
							className="w-9 h-9 drop-shadow-logoDropShadow"
						></img>
					</Link>
					<div className="flex flex-col gap-4">
						{sections.map(({ name, alt, src, tooltip }) => (
							<Link
								to={`/teacher/${name}`}
								key={name}
								onClick={() => onSelectSection(name)}
							>
								<>
									{name == selectedKey && (
										<span className="h-12 bg-white rounded-r-lg absolute left-0 w-1"></span>
									)}
									<div id={`teacher-menu-${name}`}>
										<MenuItem
											src={src}
											alt={alt}
											bgColor="green-primary"
										></MenuItem>
									</div>
									<Tooltip
										anchorSelect={`#teacher-menu-${name}`}
										place="right"
										content={tooltip}
										className="bg-gray-primary text-white shadow-tooltipMenu opacity-100 ml-2 font-semibold px-6"
									/>
								</>
							</Link>
						))}
					</div>
				</div>
				<Link to="/login" onClick={onClickLogout}>
					<MenuItem
						bgColor="red-primary"
						src={Logout}
						alt="Logout"
					></MenuItem>
				</Link>
			</div>
			{getSubMenuElement()}
		</div>
	);
}

const sections: {
	name: string;
	src: string;
	alt: string;
	tooltip: string;
	submenu?: ReactNode;
}[] = [
	{
		name: 'home',
		src: Home,
		alt: 'Home',
		tooltip: 'Home'
	},
	{
		name: 'courses',
		src: Whiteboard,
		alt: 'Cursos',
		tooltip: 'Cursos',
		submenu: <SubMenuCourses />
	},
	{
		name: 'tasks',
		src: TasksIcon,
		alt: 'Tasks',
		tooltip: 'Tasks',
		submenu: <SubMenuTasks />
	}
];

export default Menu;
