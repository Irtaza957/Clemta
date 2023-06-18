import Vuex from "vuex";

import fileManager from "./file_manager";
import authentication from './authentication';
import createOrder from './create_order';
import settings from './settings';
import stateTaxation from './state_taxation';
import federalTaxation from './federal_taxation';
import bookKeeping from './book_keeping';
import customers from './customers'
import invoice from './invoice';
import myCompany from './my_company'
import serviceProgress from './service_progress'
const state = () => ({
	dashboard_title: ''
})

const getters = {
	GET_DASHBOARD_TITLE(state) {
		return state.dashboard_title
	}
}

const mutations = {
	CHANGE_DASHBOARD_TITLE(state, payload) {
		state.dashboard_title = payload;
	},
}

const actions = {
	CLEAR_STATE({ commit }) {
		// File Manager Module
		commit("fileManager/SET_ROOT_DOCUMENTS", [])
		commit("fileManager/SET_OPEN_DOCUMENTS", [])
		// Authentication
		commit('authentication/SET_USER_COMPANIES', [])
        commit('authentication/SET_CURRENT_COMPANY', null)
		//Service Progress
		commit('serviceProgress/SET_SERVICES', [])
	},
}

export default () =>
	new Vuex.Store({
		state,
		getters,
		mutations,
		actions,
		modules: { authentication, fileManager, createOrder, settings, invoice, customers, stateTaxation, federalTaxation, bookKeeping, myCompany, serviceProgress },
	});
