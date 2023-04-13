function SubMenu({ children }: { children?: React.ReactNode }) {
	return (
		<div
			className="h-full bg-green-primary"
			style={{
				width: '14rem'
			}}
		>
			{children}
		</div>
	);
}

export default SubMenu;
