import React from 'react';

import { Color } from '@enums/Styles.enum';
import { Link } from 'react-router-dom';
import useAuthStorage from '@hooks/useAuthStorage';

function Menu({
	selectedKey,
	setSelectedKey
}: {
	selectedKey: string;
	setSelectedKey: Function;
}) {
	const authStorage = useAuthStorage();

	const onSelectSection = (sectionName: string) => {
		setSelectedKey(sectionName);
	};

	const onClickLogout = () => {
		authStorage.removeAccessToken();
	};

	return (
		<div
			className="h-full flex flex-col justify-between items-center py-3 relative"
			style={{
				backgroundColor: Color.GREEN_PRIMARY
			}}
		>
			<div className="flex flex-col justify-between items-center gap-8">
				<Link to=".">
					<img
						src="src/assets/icons/Logo.svg"
						alt="Logo"
						className="w-9 h-9"
						style={{
							filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.35))'
						}}
					></img>
				</Link>
				<div className="flex flex-col gap-4">
					{sectionItems.map(({ src, alt, name }, i) => (
						<Link
							to={`/teacher/${name}`}
							key={i}
							onClick={() => onSelectSection(name)}
						>
							<SectionItem
								isSelected={name === selectedKey}
								src={src}
								alt={alt}
							></SectionItem>
						</Link>
					))}
				</div>
			</div>
			<Link to="/login" onClick={onClickLogout}>
				<MenuItem
					backgroundColor={Color.RED_PRIMARY}
					src="src/assets/icons/Logout.svg"
					alt="Logout"
				></MenuItem>
			</Link>
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
					style={{ width: 6 }}
				></span>
			)}
			<MenuItem
				src={src}
				alt={alt}
				backgroundColor={Color.GREEN_SECONDARY}
			></MenuItem>
		</>
	);
}

function MenuItem({
	src,
	alt,
	backgroundColor
}: {
	src: string;
	alt: string;
	backgroundColor: string;
}) {
	return (
		<div
			className="rounded-xl w-12 h-12 cursor-pointer relative hover:scale-105 transition-all duration-300"
			style={{
				backgroundColor,
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

const sectionItems: {
	name: string;
	src: string;
	alt: string;
}[] = [
	{
		name: 'home',
		src: 'src/assets/icons/Home.svg',
		alt: 'Home'
	},
	{
		name: 'courses',
		src: 'src/assets/icons/Whiteboard.svg',
		alt: 'Courses'
	}
];

export default Menu;
