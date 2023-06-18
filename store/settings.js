import api from "~/api/index.js";
const state = () => ({});

const getters = {};

const mutations = {};

const actions = {
    GET_COMPANY_DETAILS(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get(api.GET_COMPANY_DETAILS + `/${data.company_id}`)
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
    UPDATE_BILLING_ADDRESS({ dispatch }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.patch(api.UPDATE_BILLING_ADDRESS + `/${data.company_id}/billing-address`, data.form)
                .then((response) => {
                    if (response.data.success) {
                        resolve(response);
                    } else {
                        reject(new Error(response.data.message))
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    GET_COMPANY_PAYMENT_METHOD(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get(api.GET_COMPANY_PAYMENT_METHOD + `/${data.company_id}/payment-method`)
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
    GET_COMPANY_RECENT_BILLING_HISTORY(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get(api.GET_COMPANY_RECENT_BILLING_HISTORY + `/${data.company_id}/recent-billing-history`)
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

    FILTER_BILLING_HISTORY(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get(api.BILLING_HISTORIES + `/${data.company_id}/billing-history?${data.filters}`)
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

    UPLOAD_PROFILE_AVATAR(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios
                .post(
                    api.UPLOAD_PROFILE_AVATAR + `/user/upload-avatar`,
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

    GET_PACKAGE_FROM_PACKAGE_ID(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get(api.SUBSCRIPTION + `/${data.package_id}`)
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
    GET_COMPANY_CUSTOMER_PORTAL({ rootGetters }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(api.CHANGE_PLAN + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/customer-portal`)
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
    GET_EMAIL_NOTIFICATION({ rootGetters }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(api.GET_EMAIL_NOTIFICATION + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/email-notification`)
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
    UPDATE_EMAIL_NOTIFICATION({ rootGetters }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.patch(api.UPDATE_EMAIL_NOTIFICATION + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/email-notification`, data)
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
