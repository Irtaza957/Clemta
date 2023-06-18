import api from "~/api/index.js";

const state = () => ({
	pendingOrder: null,
	awaitingOrders: null,
});

const getters = {
	GET_PENDING_ORDER_ID(state) {
		return state.pendingOrder
	},
	GET_PENDING_ORDERS(state) {
		return state.awaitingOrders
	}
};

const mutations = {
	SET_PENDING_ORDER_ID(state, data) {
		state.pendingOrder = data
	},
	SET_PENDING_ORDERS(state, data) {
		state.awaitingOrders = data
	},
};

const actions = {
	FETCH_ORDER(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(api.FETCH_ORDER + data)
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

	CREATE_ORDER(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(api.CREATE_ORDER, data)
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

	UPDATE_ORDER(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.patch(api.UPDATE_ORDER + "/" + data.order_id, data.form)
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

	GET_PACKAGES(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(api.GET_PACKAGES + data)
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

	GET_ORDER_BY_STATUS({ commit }) {
		return new Promise((resolve, reject) => {
			this.$axios
				.get(api.GET_ORDER_BY_STATUS)
				.then((response) => {
					if (response.data.success) {
						resolve(response);
						commit('SET_PENDING_ORDERS', response.data.data)
					} else {
						reject(new Error(response.data.message));
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	ORDER_DISCOUNT(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(api.ORDER_DISCOUNT, data)
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

	ORDER_CHECKOUT(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(api.ORDER_CHECKOUT + `/${data}/checkout`)
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

	CHOOSE_COMPANY_TYPE({rootGetters}, data) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post(api.CHOOSE_COMPANY_TYPE  + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/help-to-choose` , data)
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
