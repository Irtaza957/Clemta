import api from "~/api/index.js";

const state = () => ({});

const getters = {
};

const mutations = {
};

const actions = {
	FILTLER_TRANSACTIONS({ commit }, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(api.FILTLER_TRANSACTIONS + `/${data.company_id}/bk-transactions?${data.filter}`)
				.then((response) => {
					if (response.data.success) {
						resolve(response);
					} else {
						reject(new Error(response.data.message));
					}
				})
				.catch((error) => {
					reject(error);
				});
		})
	},

	AUTOCOMPLETE_LABELS(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(api.AUTOCOMPLETE_LABELS + `?${data.filter}`)
				.then((response) => {
					if (response.data.success) {
						resolve(response);
					} else {
						reject(new Error(response.data.message));
					}
				})
				.catch((error) => {
					reject(error);
				});
		})
	},

	CREATE_TRANSACTION(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(
					api.CREATE_TRANSACTION + `/${data.company_id}/bk-transactions`,
					data.form
				)
				.then((response) => {
					if (response.data.success) {
						resolve(response);
					} else {
						reject(new Error(response.data.message));
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	BATCH_LABEL_TRANSACTION(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.delete(
					api.BATCH_LABEL + `/${data.company_id}/bk-transactions`,
					{
						data: data.obj
					}
				)
				.then((response) => {
					if (response.data.success) {
						resolve(response);
					} else {
						reject(new Error(response.data.message));
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	BATCH_REMOVE_TRANSACTION(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.delete(
					api.BATCH_REMOVE + `/${data.company_id}/bk-transactions`,
					{
						data: data.obj
					}
				)
				.then((response) => {
					if (response.data.success) {
						resolve(response);
					} else {
						reject(new Error(response.data.message));
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	GET_CATEGORIES(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(
					api.GET_CATEGORIES +
					`/bk-categories`
				)
				.then((response) => {
					if (response.data.success) {
						resolve(response);
					} else {
						reject(new Error(response.data.message));
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
};
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};