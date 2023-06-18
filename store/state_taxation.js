import api from "~/api/index.js";

const state = () => ({
	stateTax: {},
});

const getters = {
	GET_STATE_ID(state) {
		return state.stateTax.id;
	},
	GET_STATE_STAKEHOLDERS(state) {
		return state.stateTax.partners;
	},
	GET_STATE_PARTNER(state) {
		let arr = [];
		if (state.stateTax.partners) {
			arr = state.stateTax.partners.filter(function (partner) {
				return partner.role == "partner";
			});
		}
		return arr;
	},
	GET_STATE_DIRECTOR(state) {
		let arr = [];
		if (state.stateTax.partners) {
			arr = state.stateTax.partners.filter(function (partner) {
				return partner.role == "director";
			});
		}
		return arr;
	},
};

const mutations = {
	SET_STATE_TAX(state, data) {
		state.stateTax = data;
	},
	SET_STATE_PARTNERS(state, data) {
		state.stateTax.partners = data;
	},
};

const actions = {
	STATE_TAXATION_HISTORY(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(
					api.STATE_TAXATION_HISTORY + `/${data.company_id}/state-taxes/history`
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
	CREATE_STATE_TAX(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(
					api.CREATE_STATE_TAX + `/${data.company_id}/state-taxes`,
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
	GET_STATE_TAX({ commit, rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(
					api.GET_STATE_TAX +
					`/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/state-taxes/fiscal-year/${data.fiscal_year}`
				)
				.then((response) => {
					if (response.data.success) {
						if (response.data["state-tax"]) {
							commit("SET_STATE_TAX", response.data["state-tax"]);
						} else {
							commit("SET_STATE_TAX", {});
						}
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
	UPDATE_STATE_TAX(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.patch(
					api.UPDATE_STATE_TAX +
					`/${data.company_id}/state-taxes/${data.stateTaxID}`,
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
	ADD_PARTNER_DIRECTOR({ getters, rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(
					api.ADD_PARTNER_DIRECTOR +
					`/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/state-taxes/${getters['GET_STATE_ID']}/partners`,
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
	UPDATE_PARTNER_DIRECTOR(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.patch(
					api.UPDATE_STATE_TAX +
					`/${data.company_id}/state-taxes/${data.stateTaxID}/partners/${data.partnerID}`,
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
	DELETE_PARTNER_DIRECTOR(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.delete(
					api.DELETE_PARTNER_DIRECTOR +
					`/${data.company_id}/state-taxes/${data.stateTaxID}/partners/${data.partnerID}`
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
	FINISH_STATE_TAX(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.patch(
					api.FINISH_STATE_TAX +
					`/${data.company_id}/state-taxes/${data.statetaxID}/finish`,
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
};
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
