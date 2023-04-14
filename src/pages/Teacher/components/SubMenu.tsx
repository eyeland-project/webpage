function SubMenu({ children }: { children?: React.ReactNode }) {
	return (
		<div
			className="h-full bg-green-primary w-56"
		>
			{children}
		</div>
	);
}

export default SubMenu;
