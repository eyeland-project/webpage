import { environment } from '@environments/environment';
import { ReleaseDetail } from '@interfaces/teacher/Release.interface';
import axios from 'axios';

const { apiTeacherUrl } = environment;

export async function getLatestRelease(): Promise<ReleaseDetail> {
	const response = await axios.get(`${apiTeacherUrl}/releases/latest`, {
		timeout: 10000
	});
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(response.data);
	}
}
