import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Button from '@components/Button';

export function CourseSectionCard({
	title,
	description,
	img,
	link
}: {
	title: ReactNode;
	description?: ReactNode;
	img: ReactNode;
	link: string;
}) {
	return (
		<div className="shadow-card rounded-md pl-8 py-6 relative hover:scale-105 transition-all duration-300">
			<div className="flex flex-col gap-1">
				<div className="text-lg font-bold">{title}</div>
				<div className="text-sm">{description}</div>
				<div className="w-4/6">{img}</div>
			</div>
			<div className="absolute bottom-4 right-8">
				<Link to={link}>
					<Button>Ir</Button>
				</Link>
			</div>
		</div>
	);
}
