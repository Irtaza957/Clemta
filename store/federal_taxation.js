import api from "~/api/index.js";

const state = () => ({
	federalTax: {},
});

const getters = {
	GET_FEDERAL_ID(state) {
		return state.federalTax.id;
	},
	GET_FEDERAL_PARTNER(state) {
		return state.federalTax.partners
	},
	GET_FEDERAL_COST_SALES(state) {
		return state.federalTax.revenue
	},
	GET_FEDERAL_EXPENSE(state) {
		return state.federalTax.expenses
	},
};

const mutations = {
	SET_FEDERAL_TAX(state, data) {
		state.federalTax = data;
	},
	SET_FEDERAL_PARTNERS(state, data) {
		state.federalTax.partners = data;
	},
	INCREMENT_FEDERAL_EXPENSE(state, data) {
		state.federalTax.expenses.push(data);
	},
};

const actions = {
	async FEDERAL_TAXATION_HISTORY(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(
					api.FEDERAL_TAXATION_HISTORY + `/${data.company_id}/federal-taxes/history`
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

	async CREATE_FEDERAL_TAX(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(
					api.CREATE_FEDERAL_TAX + `/${data.company_id}/federal-taxes`,
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
	async GET_FEDERAL_TAX({ commit }, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(
					api.GET_FEDERAL_TAX +
					`/${data.company_id}/federal-taxes/fiscal-year/${data.fiscal_year}`
				)
				.then((response) => {
					if (response.data.success) {
						commit("SET_FEDERAL_TAX", response.data["federal-tax"]);
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
	async UPDATE_FEDERAL_TAX(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.patch(
					api.UPDATE_FEDERAL_TAX +
					`/${data.company_id}/federal-taxes/${data.federalTaxID}`,
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
	async ADD_PARTNER(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(
					api.ADD_PARTNER_DIRECTOR +
					`/${data.company_id}/federal-taxes/${data.federalTaxID}/partners`,
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

	async UPDATE_PARTNER(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.patch(
					api.UPDATE_STATE_TAX +
					`/${data.company_id}/federal-taxes/${data.federalTaxID}/partners/${data.partnerID}`,
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
	async DELETE_PARTNER(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.delete(
					api.DELETE_PARTNER_DIRECTOR +
					`/${data.company_id}/federal-taxes/${data.federalTaxID}/partners/${data.partnerID}`
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
	async ADD_EXPENSE(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(
					api.ADD_EXPENSE + `/${data.company_id}/federal-taxes/${data.federalTaxID}/expenses`,
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
	async FINISH_FEDERAL_TAX(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(
					api.FINISH_FEDERAL_TAX +
					`/${data.company_id}/federal-taxes/${data.federalTaxID}/fixed-asset`,
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
