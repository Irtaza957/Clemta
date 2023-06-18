export default ({ $axios }, inject) => {
	const fileManagerAxios = $axios.create({
		headers: {
			common: {
				Accept: 'application/json, text/plain, */*'
			}
		}
	})
	fileManagerAxios.setBaseURL(process.env.FILE_MANAGER_URL);

	fileManagerAxios.onRequest((config) => {
		const token = localStorage.getItem('auth._token.local')
		if (token) {
			fileManagerAxios.setHeader('Authorization', token);
		}
		return config;
	});

	fileManagerAxios.onResponse((response) => {
		return response;
	});

	fileManagerAxios.onError((err) => {
		throw new Error(err);
	});

	// Inject to context as $api
	inject('fileManagerAxios', fileManagerAxios)
};
