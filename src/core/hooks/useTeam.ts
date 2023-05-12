import { useState, useCallback } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';

import * as teamApi from '@api/teacher/team.api';

import { TeamDetail } from '@interfaces/teacher/Team.interface';

const useTeam = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [teams, setTeams] = useState<TeamDetail[] | null>(null);
	const [team, setTeam] = useState<TeamDetail | null>(null);

	const getTeams: (idCourse: number) => Promise<TeamDetail[]> = useCallback(
		async (idCourse: number) => {
			setLoading(true);
			try {
				const teams = await teamApi.getTeams({
					token: authStorage.getAccessToken()!,
					idCourse
				});
				setLoading(false);
				setTeams(teams);
				return teams;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const getTeam: (idCourse: number, idTeam: number) => Promise<TeamDetail> =
		useCallback(async (idCourse: number, idTeam: number) => {
			setLoading(true);
			try {
				const team = await teamApi.getTeam({
					token: authStorage.getAccessToken()!,
					idCourse,
					idTeam
				});
				setLoading(false);
				setTeam(team);
				return team;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		}, []);

	const generateTeams = useCallback(async (idCourse: number) => {
		setLoading(true);
		try {
			const response = await teamApi.generateTeams({
				token: authStorage.getAccessToken()!,
				idCourse
			});
			setLoading(false);
			return response;
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	return {
		loading,
		teams,
		setTeams,
		getTeams,
		team,
		setTeam,
		getTeam,
		generateTeams
	};
};

export default useTeam;
