import { useState, useCallback } from 'react';

import { TeamDetail } from '@interfaces/Team.interface';

import { teams as teamsMock } from '@mocks/team.mock';

const useTeamsMock = () => {
	const [teams, setTeams] = useState<TeamDetail[] | null>(null);
	const [team, setTeam] = useState<TeamDetail | null>(null);

	const getTeams: (courseId: number) => Promise<TeamDetail[]> = useCallback(
		async (courseId: number) => {
			const teams = [...teamsMock];
			setTeams(teams);
			return teams;
		},
		[]
	);

	const getTeam: (courseId: number, teamId: number) => Promise<TeamDetail> =
		useCallback(async (courseId: number, teamId: number) => {
			const team = teamsMock.find((team) => team.id === teamId);
			if (!team) {
				throw new Error('Team not found');
			}
			setTeam(team);
			return team;
		}, []);

	return {
		teams,
		getTeams,
		team,
		getTeam
	};
};

export default useTeamsMock;
