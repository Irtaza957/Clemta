export default (app) => {
	const $axios = app.$axios
	$axios.setBaseURL(process.env.BASE_URL)

	$axios.onRequest((config) => {
		return config
	})

	$axios.onResponse((response) => {
		return response
	})

	$axios.onError((err) => {
		throw new Error(err)
	})
}