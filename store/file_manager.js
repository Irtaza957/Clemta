import api from "~/api/index.js";

const state = () => ({
	rootDocuments: [],
	openDocuments: [],
	folders: [],
});

const getters = {
	GET_ROOT_DOCUMENTS(state) {
		return state.rootDocuments;
	},
	GET_ROOT_FOLDERS(state) {
		return state.rootDocuments.filter((folder) => {
			return folder.type == 'folder'
		});
	},
	GET_OPEN_DOCUMENTS(state) {
		return state.openDocuments;
	},
	GET_OPEN_FOLDERS(state) {
		return state.openDocuments.filter((folder) => {
			return folder.type == 'folder'
		});
	},
	GET_OPENED_FOLDERS(state) {
		return state.folders;
	},
};

const mutations = {
	// ROOT DOCUMENTS
	SET_ROOT_DOCUMENTS(state, data) {
		state.rootDocuments = data;
	},
	ADD_DOCUMENT_IN_ROOT(state, data) {
		state.rootDocuments.push(data);
	},
	SET_DOCUMENT_IN_ROOT(state, data) {
		state.rootDocuments.splice(data.startIndex, data.removeCount, data.document);
	},
	REMOVE_DOCUMENT_FROM_ROOT(state, data) {
		state.rootDocuments.splice(data.startIndex, data.removeCount);
	},
	// OPEN DOCUMENTS
	SET_OPEN_DOCUMENTS(state, data) {
		state.openDocuments = data;
	},
	ADD_DOCUMENT_IN_OPEN(state, data) {
		state.openDocuments.push(data);
	},
	SET_DOCUMENT_IN_OPEN(state, data) {
		state.openDocuments.splice(data.startIndex, data.removeCount, data.document);
	},
	REMOVE_DOCUMENT_FROM_OPEN(state, data) {
		state.openDocuments.splice(data.startIndex, data.removeCount);
	},
	//BreadCrumb Folders
	SET_OPENED_FOLDERS_TO(state, data) {
		state.folders.forEach((folder, index) => {
			if (folder.folderid === data.folderid) {
				state.folders.length = index + 1
			}
		});
	},
	SET_OPENED_FOLDERS(state, data) {
		if (data.id) {
			state.folders.push(data);
		} else {
			state.folders = []
		}
	},

};

const actions = {
	GET_DOCUMENTS_BY_FOLDER_ID({ commit, rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios.get(api.GET_DOCUMENTS + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/${data.folder_id}/items`)
				.then((response) => {
					if (response.data.status) {
						if (data.folder_id === '0') {
							commit("SET_ROOT_DOCUMENTS", response.data.data);
						} else {
							commit("SET_OPEN_DOCUMENTS", response.data.data);
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
	// RECENT FILES
	GET_COMPANY_RECENT_FILES({ rootGetters }) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios
				.get(api.GET_RECENT_FILES + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/recent-files`)
				.then((response) => {
					if (response.data.status) {
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

	// FOLDERS
	CREATE_FOLDER({ commit, rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios.post(api.CREATE_FOLDER + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}`, data.form)
				.then((response) => {
					if (response.data.status) {
						if (data.form.folderid === '0') {
							commit('ADD_DOCUMENT_IN_ROOT', response.data.data)
						} else {
							commit('ADD_DOCUMENT_IN_OPEN', response.data.data)
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
	UPDATE_FOLDER({ commit, getters, rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios
				.put(api.UPDATE_FOLDER + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/${data.folderid}`, data.form)
				.then((response) => {
					if (response.data.status) {
						let index = -1
						if (data.id === '0') {
							getters.GET_ROOT_FOLDERS.forEach((document, documentIndex) => {
								if (data.id === document.id) {
									index = documentIndex
								}
							})
							commit('SET_DOCUMENT_IN_ROOT', { startIndex: index, removeCount: 1, document: response.data.data })
						} else {
							getters.GET_OPEN_FOLDERS.forEach((document, documentIndex) => {
								if (data.id === document.id) {
									index = documentIndex
								}
							})
							commit('SET_DOCUMENT_IN_OPEN', { startIndex: index, removeCount: 1, document: response.data.data })
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
	DELETE_FOLDER({ commit, getters, rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios
				.delete(api.DELETE_FOLDER + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/${data.id}`)
				.then((response) => {
					if (response.data.status) {
						let index = -1
						if (data.folder_id === '0') {
							getters.GET_ROOT_FOLDERS.forEach((document, documentIndex) => {
								if (data.id === document.id) {
									index = documentIndex
								}
							})
							commit('REMOVE_DOCUMENT_FROM_ROOT', { startIndex: index, removeCount: 1 })
						} else {
							getters.GET_OPEN_FOLDERS.forEach((document, documentIndex) => {
								if (data.id === document.id) {
									index = documentIndex
								}
							})
							commit('REMOVE_DOCUMENT_FROM_OPEN', { startIndex: index, removeCount: 1 })
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

	// FILES
	UPLOAD_FILE({ commit, rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios.post(api.UPLOAD_FILE + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/content`, data.form)
				.then((response) => {
					if (response.data.status) {
						if (data.folderid === '0') {
							commit('ADD_DOCUMENT_IN_ROOT', response.data.data)
						} else {
							commit('ADD_DOCUMENT_IN_OPEN', response.data.data)
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

	UPDATE_FILE({ commit, getters, rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios
				.put(api.UPDATE_FILE + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/${data.id}`, data.form)
				.then((response) => {
					if (response.data.status) {
						let index = -1
						if (data.folder_id === '0') {
							getters.GET_ROOT_DOCUMENTS.forEach((document, documentIndex) => {
								if (data.id === document.id) {
									index = documentIndex
								}
							})
							commit('SET_DOCUMENT_IN_ROOT', { startIndex: index, removeCount: 1, document: response.data.data })
						} else {
							getters.GET_OPEN_DOCUMENTS.forEach((document, documentIndex) => {
								if (data.id === document.id) {
									index = documentIndex
								}
							})
							commit('SET_DOCUMENT_IN_OPEN', { startIndex: index, removeCount: 1, document: response.data.data })
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


	MOVE_FILE({ commit,getters, rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios.post(api.MOVE_FILE + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/move/${data.fileid}/${data.folderid}`)
				.then((response) => {
					if (response.data.status) {
						let index = -1
						if (data.folder_id === '0') {
							getters.GET_ROOT_DOCUMENTS.forEach((document, documentIndex) => {
								if (data.fileid === document.id) {
									index = documentIndex
								}
							})
							commit('REMOVE_DOCUMENT_FROM_ROOT', { startIndex: index, removeCount: 1 })
						} else {
							getters.GET_OPEN_DOCUMENTS.forEach((document, documentIndex) => {
								if (data.fileid === document.id) {
									index = documentIndex
								}
							})
							commit('REMOVE_DOCUMENT_FROM_OPEN', { startIndex: index, removeCount: 1 })
						}
						resolve(response);
					}
					else {
						reject(new Error(response.data.message));
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	}, 
	
	DELETE_FILE({ commit, getters, rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios.delete(api.DELETE_FILE + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/${data.file_id}`)
				.then((response) => {
					if (response.data.status) {
						let index = -1
						if (data.folder_id === '0') {
							getters.GET_ROOT_DOCUMENTS.forEach((document, documentIndex) => {
								if (data.file_id === document.id) {
									index = documentIndex
								}
							})
							commit('REMOVE_DOCUMENT_FROM_ROOT', { startIndex: index, removeCount: 1 })
						} else {
							getters.GET_OPEN_DOCUMENTS.forEach((document, documentIndex) => {
								if (data.file_id === document.id) {
									index = documentIndex
								}
							})
							commit('REMOVE_DOCUMENT_FROM_OPEN', { startIndex: index, removeCount: 1 })
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

	DOWNLOAD_FILE({ rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios
				.get(api.DOWNLOAD_FILE + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/${data.file_id}/content`)
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

	GET_FILE_INFO({ rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios
				.get(api.GET_FILE_INFO + `/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/${data.file_id}`)
				.then((response) => {
					if (response.data.status) {
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


	SEARCH_FILE({ rootGetters }, data) {
		return new Promise((resolve, reject) => {
			this.$fileManagerAxios
				.get(
					api.SEARCH_FILE + `/folders/${rootGetters["authentication/GET_CURRENT_COMPANY"].id}/${data.folderid}/items?search=${data.search}`
				)
				.then((response) => {
					if (response.data.status) {
						resolve(response);
					} else {
						reject(new Error(response.data.message));
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
