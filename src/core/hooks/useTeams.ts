import { useState, useCallback } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';
import axios from 'axios';

import { environment } from '@environments/environment';

import { TeamDetail } from '@interfaces/Team.interface';

const useTeams = () => {
	const authStorage = useAuthStorage();

	const [loading, setLoading] = useState(false);
	const [teams, setTeams] = useState<TeamDetail[] | null>(null);
	const [team, setTeam] = useState<TeamDetail | null>(null);

	const getTeams: (courseId: number) => Promise<TeamDetail[]> = useCallback(
		async (courseId: number) => {
			try {
				setLoading(true);
				const response = await axios.get(
					`${environment.apiUrl}/courses/${courseId}/teams`,
					{
						headers: {
							Authorization: `Bearer ${authStorage.getAccessToken()}`
						},
						timeout: 10000
					}
				);

				setLoading(false);
				if (response.status === 200) {
					setTeams(response.data);
					return response.data;
				} else {
					throw new Error(response.data);
				}
			} catch (err) {
				setLoading(false);
				throw err;
			}
		},
		[]
	);

	const getTeam: (courseId: number, teamId: number) => Promise<TeamDetail> =
		useCallback(async (courseId: number, teamId: number) => {
			try {
				setLoading(true);
				const response = await axios.get(
					`${environment.apiUrl}/courses/${courseId}teams/${teamId}`,
					{
						headers: {
							Authorization: `Bearer ${authStorage.getAccessToken()}`
						},
						timeout: 10000
					}
				);

				setLoading(false);
				if (response.status === 200) {
					setTeam(response.data);
					return response.data;
				} else {
					throw new Error(response.data);
				}
			} catch (err) {
				setLoading(false);
				throw err;
			}
		}, []);

	const generateTeams = useCallback(async (courseId: number) => {
		try {
			setLoading(true);
			const response = await axios.post(
				`${environment.apiUrl}/courses/${courseId}/teams/init`,
				{},
				{
					headers: {
						Authorization: `Bearer ${authStorage.getAccessToken()}`
					},
					timeout: 10000
				}
			);

			setLoading(false);
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error(response.data);
			}
		} catch (err) {
			setLoading(false);
			throw err;
		}
	}, []);

	return {
		loading,
		teams,
		getTeams,
		team,
		getTeam,
		generateTeams
	};
};

export default useTeams;
