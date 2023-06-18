import api from "~/api/index.js";

const state = () => ({
    Customers: [],
});

const getters = {
    GET_ALL_CUSTOMERS(state) {
        return state.Customers;
    },
};

const mutations = {
    SET_CUSTOMERS(state, data) {
        state.Customers = data;
    },
    ADD_CUSTOMER(state, data) {
        state.Customers.push(data);
    },
};

const actions = {

    CREATE_CUSTOMER({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios
                .post(api.CREATE_CUSTOMER + `/${data.company_id}/customers`, data.form)
                .then((response) => {
                    if (response.data.success) {
                        commit("ADD_CUSTOMER", response.data.customer);
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

    FILTER_CUSTOMER({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get(
                    api.BILLING_HISTORIES +
                    `/${data.company_id}/customers?${data.filters}`
                )
                .then((response) => {
                    if (response.data.success) {
                        commit("SET_CUSTOMERS", response.data.customers);

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
    DOWNLOAD_CUSTOMER_INVOICE({rootGetters}, data) {
        return new Promise((resolve, reject) => {
            this.$axios
                .post(
                    api.DOWNLOAD_CUSTOMER_INVOICE +
                    `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/invoices/customer/${data.customerId}/download`
                )
                .then((response) => {
                    if (response.data) {
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
