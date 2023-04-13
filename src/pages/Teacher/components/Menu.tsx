import { ReactNode } from 'react';

import { Link } from 'react-router-dom';
import useAuthStorage from '@hooks/useAuthStorage';
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
			<div
				className="h-full flex flex-col justify-between items-center py-3 relative z-10 bg-green-tertiary"
				style={{
					width: '4rem',
					boxShadow: '4px 0 4px rgba(0, 0, 0, 0.25)'
				}}
			>
				<div className="flex flex-col justify-between items-center gap-8">
					<Link to=".">
						<img
							src={Logo}
							alt="Logo"
							className="w-9 h-9"
							style={{
								filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.35))'
							}}
						></img>
					</Link>
					<div className="flex flex-col gap-4">
						{Object.keys(sections).map((sectionName) => (
							<Link
								to={`/teacher/${sectionName}`}
								key={sectionName}
								onClick={() => onSelectSection(sectionName)}
							>
								<SectionItem
									isSelected={sectionName === selectedKey}
									src={sections[sectionName].src}
									alt={sections[sectionName].alt}
								></SectionItem>
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
				className="h-full transition-all duration-300"
				style={{
					marginLeft: isSubmenuCollapsed ? '-15rem' : 0,
					boxShadow: isSubmenuCollapsed
						? 'none'
						: '4px 0 4px rgba(0, 0, 0, 0.25)'
				}}
			>
				<SubMenu>{sections[selectedKey]?.SubMenuElement}</SubMenu>
			</div>
		</div>
	);
}

function SectionItem({
	src,
	alt,
	isSelected
}: {
	src: string;
	alt: string;
	isSelected: boolean;
}) {
	return (
		<>
			{isSelected && (
				<span
					className="h-12 bg-white rounded-r-lg absolute left-0"
					style={{ width: 4 }}
				></span>
			)}
			<MenuItem src={src} alt={alt} bgColor="green-primary"></MenuItem>
		</>
	);
}

function MenuItem({
	src,
	alt,
	bgColor
}: {
	src: string;
	alt: string;
	bgColor: string;
}) {
	return (
		<div
			className={`rounded-xl w-12 h-12 cursor-pointer relative hover:scale-105 transition-all duration-300 bg-${bgColor}`}
			style={{
				boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)'
			}}
		>
			<img
				src={src}
				alt={alt}
				className="w-3/5 h-3/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
			/>
		</div>
	);
}

const sections: {
	[x: string]: SectionItemData;
} = {
	[TeacherSections.HOME]: {
		src: Home,
		alt: 'Home'
	},
	[TeacherSections.COURSES]: {
		src: Whiteboard,
		alt: 'Courses',
		SubMenuElement: <SubMenuCourses />
	}
};

interface SectionItemData {
	src: string;
	alt: string;
	SubMenuElement?: ReactNode;
}

export default Menu;
