import { useState, useCallback } from 'react';

import * as releaseApi from '@api/release';

import { ReleaseDetail } from '@interfaces/Release.interface';

const useRelease = () => {
	const [loading, setLoading] = useState(false);
	const [release, setRelease] = useState<ReleaseDetail | null>(null);

	const getLatestRelease: () => Promise<ReleaseDetail> =
		useCallback(async () => {
			setLoading(true);
			try {
				const release = await releaseApi.getLatestRelease();
				setLoading(false);
				setRelease(release);
				return release;
			} catch (err) {
				setLoading(false);
				throw err;
			}
		}, []);

	return {
		loading,
		getLatestRelease,
		release,
		setRelease
	};
};

export default useRelease;
