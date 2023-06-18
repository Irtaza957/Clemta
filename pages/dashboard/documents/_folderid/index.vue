<template>
	<div>
		<div class="relative rounded-xl my-6 noselect">
			<DocumentModuleHeader @search="(val) => searching = val" @showSearch="showSearch"
				@load="(val) => loadingDocuments = val" />
			<DashboardCard>
				<div class="text-xs font-black uppercase flex gap-4 mb-5">
					<div class="underline cursor-pointer">
						<nuxt-link :to="'/dashboard/documents'">
							<p>Documents</p>
						</nuxt-link>
					</div>
					<div class="flex justify-center items-center gap-4 ">
						<div v-if="exceedBreadCrumb">
							<img src="@/assets/img/pages/dashboard/documents/vertical-dots.svg" class="rotate-90">
						</div>
						<div class="flex justify-center items-center gap-4 ">
							<div v-for="(folder, index) in showFolders" :key="index" @click="moveAndSetTo(folder)"
								class="flex justify-center items-center gap-2 mb-2">
								<div>
									<img src="@/assets/img/pages/dashboard/documents/arrow-right.svg" />
								</div>
								<div class="underline cursor-pointer break-all text-center sm:text-left" >
										<p>{{ folder.name }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div v-if="!loadingDocuments && displayDocuments.length"
						class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						<div v-for="(document, index) in displayDocuments" :key="index" @dblclick="move(document)"
							class="flex justify-between cursor-pointer items-center gap-4 bg-lighterBlue rounded-lg pl-4 pr-1.5 py-4">
							<div class="flex items-center gap-3">
								<img :src="getIcon(document)" />
								<p class="text-sm font-semibold leading-4 break-normal">
									{{ document.name }}
								</p>
							</div>
							<DocumentOptions :document="document" @openFile='openFile'/>
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
				</div>
			</DashboardCard>
		</div>
		<div v-if="previewDocument">
		<filePreviewModalVue :isDoc='isDoc' :docName='docName' :docId="docId" @close='previewDocument=false'/>
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
import getIconMixin from "../../../../mixins/get_file_or_folder_icon";
import DocumentModuleHeader from "../../../../components/pages/dashboard/documents/document-module-header.vue";
import DocumentOptions from "../../../../components/pages/dashboard/documents/document-options.vue";
import filePreviewModalVue from "../../../../components/ui/file-preview-modal.vue";
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import Vue from 'vue'
Vue.use(VueViewer)
export default {
	layout: 'dashboard-layout',
	components: {
		DocumentModuleHeader,
		DocumentOptions,
		filePreviewModalVue
	},
	mixins: [getIconMixin],
	data() {
		return {
			//File Preview
		    previewDocument: false,
		    isDoc: true,
		    docName: '',
		    docId: null,

			searching: false,
			loadingDocuments: false,
			queryResult: [],
			exceedBreadCrumb: false,
			image:["https://picsum.photos/450/450"]
		}
	},

	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
			GET_OPEN_DOCUMENTS: "fileManager/GET_OPEN_DOCUMENTS",
			GET_OPENED_FOLDERS: "fileManager/GET_OPENED_FOLDERS"
		}),
		displayDocuments() {
			if (this.searching) {
				return this.queryResult
			} else {
				return this.GET_OPEN_DOCUMENTS
			}
		},
		showFolders() {
			if (this.GET_OPENED_FOLDERS.length <= 3) {
				this.exceedBreadCrumb = false
				return this.GET_OPENED_FOLDERS
			} else {
				this.exceedBreadCrumb = true
				return this.GET_OPENED_FOLDERS.slice(-3);
			}
		},
	},

	mounted() {
		this.getDocuments()
	},

	methods: {
		...mapActions({
			GET_DOCUMENTS_BY_FOLDER_ID: "fileManager/GET_DOCUMENTS_BY_FOLDER_ID"
		}),
		...mapMutations({
			SET_OPENED_FOLDERS: "fileManager/SET_OPENED_FOLDERS",
			SET_OPENED_FOLDERS_TO: "fileManager/SET_OPENED_FOLDERS_TO",
		}),
		openFile(file){								
			if(file.extension==='.png' || file.extension==='.jpeg' || file.extension==='.jpg' || file.extension==='.webp' || file.extension==='.tiff'){
				this.$viewerApi({
				images: this.image,
				})
			}
			else{
			if(file.extension==='.pdf' || file.extension==='.docx' || file.extension==='.img'){
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
		async getDocuments() {
			this.loadingDocuments = true
			this.GET_DOCUMENTS_BY_FOLDER_ID({ company_id: this.GET_CURRENT_COMPANY.id, folder_id: this.$route.params.folderid })
				.then((response) => {
					this.loadingDocuments = false
				})
				.catch((error) => {
					this.loadingDocuments = false
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
		},
		moveAndSetTo(document){
				this.SET_OPENED_FOLDERS_TO(document)
				this.$router.push(`/dashboard/documents/${document.id}`)
		}
	},
}
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