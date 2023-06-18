<template>
	<div>
		<div class="my-6 noselect">
			<DocumentModuleHeader @search="(val) => searching = val" @showSearch="showSearch"
				@load="(val) => loadingDocuments = val" @getRecentFiles="getRecentFiles" />
			<DashboardCard>
				<template v-if="displayDocuments.length || loadingDocuments">
					<div v-if="!loadingDocuments"
						class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						<div v-for="(document, index) in displayDocuments" :key="index" @dblclick="move(document)"
							class="flex justify-between items-center gap-4 cursor-pointer bg-lighterBlue rounded-lg pl-4 pr-1.5 py-4">
							<div class="flex items-center gap-3">
								<img :src="getIcon(document)" />
								<p class="text-sm font-semibold leading-4 break-normal">
									{{ document.name }}
								</p>
							</div>
							<DocumentOptions :document="document" @getRecentFiles="getRecentFiles" @openFile='openFile'/>
						</div>
					</div>
					<div v-else-if="loadingDocuments"
						class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						<div v-for="i in 12" :key="i" class="flex justify-between items-center shadow-sm border p-1">
							<div class="w-full flex items-center">
								<FolderSkeleton />
							</div>
						</div>
					</div>
					<div v-else>
						<NotFound heading="Not Found" description="Unfortunatly No Document Found." />
					</div>
				</template>
				<template v-else>
					<NotFound heading="Not Found" description="Unfortunatly No Document Found." />
				</template>
				<div v-if="recentFiles">
					<p class="text-xs font-semibold uppercase mt-10 mb-6">
						Recent files
					</p>
					<div v-if="!loadingRecentFiles" class="grid sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-2.5">
						<div v-for="(file, index) in recentFiles" :key="index"
							class="flex justify-between items-center gap-4 bg-lighterBlue rounded-lg pl-4 pr-1.5 py-4">
							<div class="flex items-center gap-3">
								<img :src="getIcon(file)" />
								<p class="text-sm font-semibold leading-4">
									{{ file.name }}
								</p>
							</div>
							<DocumentOptions :document="file" @getRecentFiles="getRecentFiles" @openFile='openFile'/>
						</div>
					</div>
					<div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						<div v-for="i in 8" :key="i" class="flex justify-between items-center shadow-sm border p-1">
							<div class="w-full flex items-center">
								<FolderSkeleton />
							</div>
						</div>
					</div>
				</div>
			</DashboardCard>
		</div>
		<div v-if="previewDocument">
		<FilePreviewModal :isDoc='isDoc' :docName='docName' :docId="docId" @close='previewDocument=false'/>
		</div>
		<div>
			<div v-viewer>
				<img>
			</div> 
		</div>
	</div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from "vuex";
import getIconMixin from '../../../mixins/get_file_or_folder_icon'
import DocumentModuleHeader from "../../../components/pages/dashboard/documents/document-module-header.vue";
import DocumentOptions from "../../../components/pages/dashboard/documents/document-options.vue";
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import Vue from 'vue'
Vue.use(VueViewer)
export default {
	layout: 'dashboard-layout',

	components: {
    DocumentModuleHeader,
    DocumentOptions,
},

	mixins: [getIconMixin],

	data: () => ({	
		//File Preview
		previewDocument: false,
		isDoc: true,
		docName: '',
		docId: null,

		searching: false,
		loadingDocuments: false,
		// Search
		queryResult: [],
		// Recent Files
		showRecentFilesOption: false,
		loadingRecentFiles: false,
		recentFiles: [],
		image:["https://picsum.photos/450/450"]
	}),

	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
			GET_ROOT_DOCUMENTS: "fileManager/GET_ROOT_DOCUMENTS"
		}),

		displayDocuments() {
			if (this.searching) {
				return this.queryResult
			} else {
				return this.GET_ROOT_DOCUMENTS
			}
		}
	},

	mounted() {
		this.getRootDocuments()
		this.getRecentFiles()
	},
	methods: {
		...mapActions({
			GET_DOCUMENTS_BY_FOLDER_ID: "fileManager/GET_DOCUMENTS_BY_FOLDER_ID",
			GET_COMPANY_RECENT_FILES: "fileManager/GET_COMPANY_RECENT_FILES",			
		}),		
		openFile(file){		 
			if(file.extension==='.png' || file.extension==='.jpeg' || file.extension==='.jpg' || file.extension==='.webp' || file.extension==='.tiff'){
				this.$viewerApi({
				images: this.image,
				})
			}
			else{
			if(file.extension==='.pdf' || file.extension==='.docx'){
				this.isDoc=true
			}
			else{
				this.isDoc=false
			}
			this.previewDocument=!this.previewDocument
			this.docName=file.name
			this.docId=file.id
			}
		},
		...mapMutations({
			SET_OPENED_FOLDERS: "fileManager/SET_OPENED_FOLDERS"
		}),
		getRootDocuments() {
			this.SET_OPENED_FOLDERS('0')
				this.loadingDocuments = true
				this.GET_DOCUMENTS_BY_FOLDER_ID({ folder_id: '0' })
					.then((response) => {
						this.loadingDocuments = false
					})
					.catch((error) => {
						this.loadingDocuments = false
					})
		},
		async getRecentFiles() {
			this.loadingRecentFiles = true
			this.GET_COMPANY_RECENT_FILES()
				.then((response) => {
					this.loadingRecentFiles = false
					this.recentFiles = response.data.data
				})
				.catch((error) => {
					this.loadingRecentFiles = false
				})
		},
		showSearch(folders) {
			this.queryResult = folders
		},
		move(document) {
			if (document.type === 'folder') {
				this.SET_OPENED_FOLDERS(document)
				this.$router.push(`/dashboard/documents/${document.id}`)
			}
		}
	}
};
</script>
<style scoped>
.noselect {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
</style>