import api from '~/api/index.js'

const state = () => ({
    companies: [],
    currentCompany: null
})

const getters = {
    GET_USER_COMPANIES(state) {
        return state.companies
    },
    GET_CURRENT_COMPANY(state) {
        return state.currentCompany
    }
}

const mutations = {
    SET_USER_COMPANIES(state, data) {
        state.companies = data
    },
    SET_CURRENT_COMPANY(state, data) {
        state.currentCompany = data
    }
}

const actions = {
    LOGIN({ dispatch }, data) {
        return new Promise((resolve, reject) => {
            this.$auth.loginWith('local', { data })
                .then((response) => {
                    if (response.data.success) {
                        this.$auth.setUser(response.data.data.user)
                        dispatch('FETCH_USER_COMPANIES')
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
    REGISTER(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post(api.REGISTER, data)
                .then((response) => {
                    if (response.data.success) {
                        this.$auth.strategy.token.set(response.data.data.token)
                        this.$auth.setUser(response.data.data.user)
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
    SEND_PHONE_VERIFICATION_CODE(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post(api.SEND_PHONE_VERIFICATION_CODE, data)
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
    VERIFY_USER_PHONE(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get(api.VERIFY_USER_PHONE + data)
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
    UPDATE_USER(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios.patch(api.UPDATE_USER, data)
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
    CHANGE_PASSWORD(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios.patch(api.CHANGE_PASSWORD, data)
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
    FETCH_USER(ctx) {
        return new Promise((resolve, reject) => {
            this.$axios.get(api.USER_ME)
                .then((response) => {
                    if (response.data.success) {
                        this.$auth.setUser(response.data.data)
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
    FETCH_USER_COMPANIES({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get(api.USER_COMPANIES)
                .then((response) => {
                    if (response.data.success) {
                        if (response.data.data.companies.length) {
                            commit('SET_USER_COMPANIES', response.data.data.companies)
                            commit('SET_CURRENT_COMPANY', response.data.data.companies[0])
                        } else {
                            commit('SET_USER_COMPANIES', [])
                            commit('SET_CURRENT_COMPANY', null)
                        }
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
    LOGOUT({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            this.$auth.logout()
                .then((response) => {
                    localStorage.removeItem('vuex')
                    dispatch('CLEAR_STATE', null, { root: true })
                    this.$router.push('/login')
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    RESET_PASSWORD(ctx, data) {
        return new Promise((resolve, reject) => {
            this.$axios.patch(api.RESET_PASSWORD+ `/forgot-password`, data)
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
    RESTORE_PASSWORD(ctx,data) {
        return new Promise((resolve, reject) => {
            this.$axios.patch(api.RESTORE_PASSWORD + `/reset-password`, data)
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}