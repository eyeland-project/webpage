class AuthStorage {
	namespace;

	constructor(namespace = 'teacherAuth') {
		this.namespace = namespace;
	}

	getAccessToken(): string | null {
		const accessToken = localStorage.getItem(
			`${this.namespace}:accessToken`
		);
		return accessToken && JSON.parse(accessToken);
	}

	setAccessToken(accessToken: string) {
		localStorage.setItem(
			`${this.namespace}:accessToken`,
			JSON.stringify(accessToken)
		);
	}

	removeAccessToken() {
		localStorage.removeItem(`${this.namespace}:accessToken`);
	}
}

export default AuthStorage;
