import api from "~/api/index.js";

const state = () => ({
	services: []
});

const getters = {
	All_SERVICES(state) {
		return state.services;
	},
};

const mutations = {
	SET_SERVICES(state, data) {
		state.services = data;
	},
};

const actions = {
	GET_SERVICES({rootGetters, commit}) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(api.GET_SERVICES  + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/services`)
				.then((response) => {
					if (response.data.success) {
						commit("SET_SERVICES", response.data["services"]);
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
