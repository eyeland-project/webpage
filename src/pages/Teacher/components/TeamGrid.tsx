import { MouseEventHandler } from 'react';

import { TeamDetail } from '@interfaces/teacher/Team.interface';
import { Power } from '@enums/Team.enum';

import { parseStudentName } from '@utils/general.utils';

import Add from '@icons/Add.svg';
import MemoryPro from '@icons/MemoryPro.svg';
import SuperHearing from '@icons/SuperHearing.svg';
import SuperRadar from '@icons/SuperRadar.svg';

function TeamGrid({
	teams,
	handleGenerateTeams
}: {
	teams: TeamDetail[];
	handleGenerateTeams: MouseEventHandler<HTMLDivElement>;
}) {
	return (
		<div className="grid gap-x-6 gap-y-8 mt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
			{teams.map((team, i) => (
				<TeamCard key={i} team={team} />
			))}
			<div
				className="shadow-md rounded-lg p-4 cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out bg-gray-100 flex flex-col justify-center items-center border border-gray-400"
				onClick={handleGenerateTeams}
			>
				<img
					src={Add}
					alt="Generar equipos"
					className="invert w-2/5 h-2/5 opacity-70"
				/>
			</div>
		</div>
	);
}

function TeamCard({ team: { name, students, playing } }: { team: TeamDetail }) {
	return (
		<div
			className={`shadow-md rounded-lg p-4 cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out bg-whitish ${
				playing ? 'animate-playing' : ''
			}`}
		>
			<div className="font-bold text-xl">{name}</div>
			<hr className="border-t-gray-600 mt-2" />
			<div className="flex flex-col gap-2 mt-4">
				{students.length ? (
					students.map(({ firstName, lastName, power, id }) => (
						<div key={id} className="flex gap-4 items-center">
							<span className="rounded-md shadow-sm p-1 w-10 h-10 bg-yellow-primary">
								{power && (
									<img
										className="w-full h-full"
										src={
											power === Power.MEMORY_PRO
												? MemoryPro
												: power === Power.SUPER_RADAR
												? SuperRadar
												: SuperHearing
										}
										alt={power}
									/>
								)}
							</span>
							<span>{parseStudentName(firstName, lastName)}</span>
						</div>
					))
				) : (
					<div className="text-center text-lg text-gray-300 font-semibold px-8 pb-6 pt-4">
						No hay estudiantes en este equipo
					</div>
				)}
			</div>
		</div>
	);
}

export default TeamGrid;
