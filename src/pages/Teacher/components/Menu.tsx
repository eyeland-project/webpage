import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

import useAuthStorage from '@hooks/useAuthStorage';

import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import SubMenuCourses from './SubMenuCourses';

import { TeacherSections } from '@enums/Pages.enum';

import Logo from '@icons/Logo.svg';
import Logout from '@icons/Logout.svg';
import Home from '@icons/Home.svg';
import Whiteboard from '@icons/Whiteboard.svg';

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
		if (sectionName !== TeacherSections.HOME && isSubmenuCollapsed) {
			setSubmenuCollapsed(false);
		} else if (
			sectionName === TeacherSections.HOME &&
			!isSubmenuCollapsed
		) {
			setSubmenuCollapsed(true);
		}
	};

	const onClickLogout = () => {
		authStorage.removeAccessToken();
	};

	return (
		<div className="h-full flex">
			<div className="h-full flex flex-col justify-between items-center py-3 relative z-20 bg-green-tertiary w-16 shadow-lateralNavbar">
				<div className="flex flex-col justify-between items-center gap-8">
					<Link to=".">
						<img
							src={Logo}
							alt="Logo"
							className="w-9 h-9 drop-shadow-logoDropShadow"
						></img>
					</Link>
					<div className="flex flex-col gap-4">
						{Object.keys(sections).map((sectionName) => (
							<Link
								to={`/teacher/${sectionName}`}
								key={sectionName}
								onClick={() => onSelectSection(sectionName)}
							>
								<>
									{sectionName == selectedKey && (
										<span className="h-12 bg-white rounded-r-lg absolute left-0 w-1"></span>
									)}
									<div id={`teacher-menu-${sectionName}`}>
										<MenuItem
											src={sections[sectionName].src}
											alt={sections[sectionName].alt}
											bgColor="green-primary"
										></MenuItem>
									</div>
									<Tooltip
										anchorSelect={`#teacher-menu-${sectionName}`}
										place="right"
										content={sections[sectionName].tooltip}
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
			<div
				className={`h-full transition-all duration-300 ${
					isSubmenuCollapsed
						? '-ml-60 none'
						: 'ml-0 shadow-lateralNavbar'
				}`}
			>
				<SubMenu>{sections[selectedKey]?.SubMenuElement}</SubMenu>
			</div>
		</div>
	);
}

const sections: {
	[x: string]: SectionItemData;
} = {
	[TeacherSections.HOME]: {
		src: Home,
		alt: 'Home',
		tooltip: 'Home'
	},
	[TeacherSections.COURSES]: {
		src: Whiteboard,
		alt: 'Cursos',
		tooltip: 'Cursos',
		SubMenuElement: <SubMenuCourses />
	}
};

interface SectionItemData {
	src: string;
	alt: string;
	tooltip: string;
	SubMenuElement?: ReactNode;
}

export default Menu;
