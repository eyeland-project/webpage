import PersonCard from '@pages/OurTeam/components/PersonCard';

interface Props {
	title: string;
	people: {
		name: string;
		img: string;
		link: string;
	}[];
}

function Section({ title, people }: Props) {
	return (
		<div className="mt-10 flex flex-col items-center justify-center xl:px-44">
			<div className="flex items-center justify-center gap-7">
				<h2 className="text-lg text-black md:text-2xl xl:text-2xl">
					{title}
				</h2>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-5">
				{people.map((person, index) => {
					return (
						<PersonCard
							key={index}
							name={person.name}
							img={person.img}
							link={person.link}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Section;
