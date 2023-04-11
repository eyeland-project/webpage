import { Colors } from '@enums/Styles.enum';

function SubMenu({ children }: { children?: React.ReactNode }) {
	return (
		<div
			className="h-full"
			style={{
				backgroundColor: Colors.GREEN_SECONDARY,
				width: '14rem'
			}}
		>
			{children}
		</div>
	);
}

export default SubMenu;
