import api from "~/api/index.js";

const state = () => ({});

const getters = {};
const mutations = {};
const actions = {
	GET_ISSUE({ rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(api.GET_ISSUE + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/issues?month=${data.form.currentMonth}&year=${data.form.currentYear}`)
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
	ADD_ISSUE({ rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(api.ADD_ISSUE + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/issues`, data.form)
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

	GET_ALL_SHAREHOLDERS() {
        return new Promise((resolve, reject) => {
            this.$axios.get(api.GET_ALL_SHAREHOLDERS)
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
	ORDER_SPECIFIC_COMPANY({ rootGetters }) {
		return new Promise((resolve, reject) => {
			this.$axios.get(api.ORDER_SPECIFIC_COMPANY + `?id=${rootGetters["authentication/GET_CURRENT_COMPANY"].id}`)
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
