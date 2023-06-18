import api from "~/api/index.js";

const state = () => ({});

const getters = {};

const mutations = {};

const actions = {
	CREATE_INVOICE(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios.post(api.CREATE_INVOICE + `/${data.company_id}/invoices`, data.invoiceData)
				.then(response => {
					if (response.data.success) {
						resolve(response)
					}
					else {
						reject(new Error(response.data.message))
					}
				})
				.catch(error => {
					reject(error);
				})
		})
	},
	INVOICE_BRAND(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios.post(api.INVOICE_BRAND + `/${data.company_id}/invoice-brand`, data.form)
				.then(response => {
					if (response.data.success) {
						resolve(response)
					}
					else {
						reject(new Error(response.data.message))
					}
				})
				.catch(error => {
					reject(error);
				})
		})
	},
	GET_INVOICE_BRAND(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios.get(api.GET_INVOICE_BRAND + `/${data.company_id}/invoice-brand`)
				.then(response => {
					if (response.data.success) {
						resolve(response)
					}
					else {
						reject(new Error(response.data.message))
					}
				})
				.catch(error => {
					reject(error);
				})
		})
	},
	INVOICES_FILTER(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios.get(api.INVOICES_FILTER + `/${data.company_id}/invoices?${data.filters}`)
				.then(response => {
					if (response.data.success) {
						resolve(response)
					}
					else {
						reject(new Error(response.data.message))
					}
				})
				.catch(error => {
					reject(error);
				})
		})
	},
	DOWNLOAD_INVOICE(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios.post(api.DOWNLOAD_INVOICE + `/${data.company_id}/invoices/${data.invoice_id}/download`,{
				responseType: "blob",
			  })
				.then(response => {
					if (response) {
						resolve(response)
					}
					else {
						reject(new Error(response.data.message))
					}
				})
				.catch(error => {
					reject(error);
				})
		})
	},
	SEND_INVOICE(ctx, data) {
		return new Promise((resolve, reject) => {
			this.$axios.post(api.SEND_INVOICE + `/${data.company_id}/invoices/${data.invoice_id}/send`, data.email)
				.then(response => {
					if (response.data.success) {
						resolve(response)
					}
					else {
						reject(new Error(response.data.message))
					}
				})
				.catch(error => {
					reject(error);
				})
		})
	},
	CUSTOMER_AUTOCOMPLETE({rootGetters}, data) {
		return new Promise((resolve, reject) => {
			this.$axios.get(api.CUSTOMER_AUTOCOMPLETE + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/customers-autocomplete${data.term}`)
				.then(response => {
					if (response.data.success) {
						resolve(response)
					}
					else {
						reject(new Error(response.data.message))
					}
				})
				.catch(error => {
					reject(error);
				})
		})
	},
	EXPORT_INVOICE({ rootGetters }) {
		return new Promise((resolve, reject) => {
			this.$axios.get(api.EXPORT_INVOICE + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/invoices/export`)
				.then(response => {
					if (response.status === 200) {
						resolve(response)
					} else {
						reject(new Error(response.data.message))
					}
				})
				.catch(error => {
					reject(error);
				})
		})
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
