import { environment } from '@environments/environment';
import { ReleaseDetail } from '@interfaces/Release.interface';
import axios from 'axios';

const { apiUrl } = environment;

export async function getLatestRelease(): Promise<ReleaseDetail> {
	const response = await axios.get(`${apiUrl}/releases/latest`, {
		timeout: 10000
	});
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}
