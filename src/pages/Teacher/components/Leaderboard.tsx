import { useMemo } from 'react';
import { TeamLeaderboardDetail } from '@interfaces/teacher/Team.interface';

function Leaderboard({
	teamsLeaderboard
}: {
	teamsLeaderboard: TeamLeaderboardDetail[];
}) {
	const teams = useMemo(
		() => [...teamsLeaderboard].sort((a, b) => a.id - b.id),
		[teamsLeaderboard]
	);

	return (
		<div className="flex flex-col gap-8 text-lg">
			{(teams.length &&
				teams.map(({ name, position }, index) => (
					<div key={index} className="flex items-center gap-1">
						<div className="font-semibold">{`${position}°`}</div>
						<div
							className={`h-8 transition-all duration-500 ease-in-out rounded-sm ${
								index % 3 === 0
									? 'bg-red-secondary'
									: index % 3 === 1
									? 'bg-blue-secondary'
									: 'bg-pink-primary'
							}`}
							style={{
								width: `${(
									((teams.length - (position - 1)) /
										teams.length) *
									80
								).toFixed(0)}%`
							}}
							// className={`h-8 transition-all duration-500 ease-in-out rounded-sm
							//     bg-${COLORS[index % COLORS.length]}
							//     w-[${(
							// 		((teams.length - (position - 1)) /
							// 			teams.length) *
							// 		80
							// 	).toFixed(0)}%]
							// `}
							// className={`h-8 transition-all duration-500 ease-in-out rounded-sm
							//             bg-pink-primary
							//             w-[60%]
							// `}
						/>
						<div>{name}</div>
					</div>
				))) || <div>No hay equipos</div>}
		</div>
	);
}

// const COLORS = ['red-secondary', 'blue-secondary', 'pink-primary'];

export default Leaderboard;
