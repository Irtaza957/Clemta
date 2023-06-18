<template>
	<div class="grid md:grid-cols-12 grid-cols-1 gap-6 md:mt-16 mt-7">
		<div class="md:col-span-5 col-span-1 rounded-lg bg-white px-6 py-10">
			<div
				class="flex justify-center items-center h-20 2xl:h-24 w-20 2xl:w-24 rounded-full bg-blackish mx-auto p-6 2xl:p-7">
				<img src="@/assets/img/pages/logo-white.svg" alt="" class="w-full" />
			</div>

			<h1 v-if="GET_CURRENT_COMPANY" class="text-lg font-extrabold text-center mt-6">
				{{ GET_CURRENT_COMPANY.name }}, {{ GET_CURRENT_COMPANY.type }}.
			</h1>
			<p class="text-sm text-center mt-1 mb-8">
				{{ $auth.user.name && $auth.user.surname ? $auth.user.name + ' ' + $auth.user.surname : '' }}
			</p>

			<h2 class="font-extrabold text-sm">My Documents</h2>
			<div class="relative text-sm flex items-center justify-between border border-gray-300 rounded-lg mt-3">
				<div class="w-full py-3 px-4 cursor-default select-none" @click="showDocuments = !showDocuments">
					<p v-if="selectedDocument">
						{{ selectedDocument.name }}
					</p>
					<p v-else class="text-gray-300">Select</p>
				</div>
				<img src="@/assets/img/pages/login/arrow-down.svg" alt=""
					:class="showDocuments ? 'rotate-180' : 'rotate-0'"
					class="absolute top-1/2 right-4 transform -translate-y-1/2" />

				<!--  SELECT DOCUMENT  -->
				<div v-if="showDocuments"
					class="absolute bottom-full left-0 w-full transform bg-gray-50 -translate-y-1 border border-gray-500 rounded-lg py-2">
					<div v-if="documentList.length && !loading">
						<p v-for="(document, index) in documentList" :key="index" :class="
							selectedDocument &&
								selectedDocument.name.toLowerCase() === document.name.toLowerCase()
								? 'bg-gray-100'
								: 'bg-white'
						" class="text-sm py-2 px-4 hover:bg-gray-100 transition-all duration-20 ease-linear cursor-pointer"
							@click="(selectedDocument = document), (showDocuments = false)">
							{{ document.name }}
						</p>
					</div>
					<div v-else-if="loading" class="bg-white p-3">
						<IssueSkeleton />
					</div>
					<div v-else>
						<NotFound heading="No File Found" />
					</div>
				</div>
			</div>
			<div class="flex justify-center items-center flex-wrap gap-2 mt-6">
				<button class="text-xs bg-normalBlue text-white py-2 2xl:py-3 px-4 xl:px-6 rounded-full"
					@click="openFile">
					Preview Document
				</button>
				<button
					class="flex items-center gap-2 text-xs bg-blackish text-white py-2 2xl:py-3 px-4 xl:px-6 rounded-full"
					@click="downloadFile">
					<img src="@/assets/img/pages/dashboard/invoice/create-invoice/download.svg" alt="" class="w-3" />
					Download Statement
				</button>
			</div>
		</div>
		<div v-if="GET_CURRENT_COMPANY"
			class="md:col-span-7 col-span-1 flex flex-col gap-6 rounded-lg bg-white px-6 py-8">
			<div>
				<h2 class="font-extrabold text-sm mb-1">Date of Formation</h2>
				{{ GET_CURRENT_COMPANY.date_of_formation ? $moment(new Date(GET_CURRENT_COMPANY.date_of_formation *
						1000)).format("DD MMM YYYY") : 'Not Assigned Yet'
				}}
			</div>
			<div>
				<h2 class="font-extrabold text-sm mb-1">
					Employer Identification Number (EIN)
				</h2>
				{{ GET_CURRENT_COMPANY.ein ? GET_CURRENT_COMPANY.ein : 'Not Assigned Yet' }}
			</div>
			<div>
				<h2 class="font-extrabold text-sm mb-1">EIN Issue Date</h2>
				{{ GET_CURRENT_COMPANY.ein_issue_date ? $moment(new Date(GET_CURRENT_COMPANY.ein_issue_date *
						1000)).format("DD MMM YYYY") : 'Not Assigned Yet'
				}}
			</div>
			<div>
				<h2 class="font-extrabold text-sm mb-1">Mailing Address</h2>
				{{ GET_CURRENT_COMPANY.mailing_address ? GET_CURRENT_COMPANY.mailing_address : 'Not Assigned Yet' }}

			</div>
			<div>
				<h2 class="font-extrabold text-sm mb-1">Registered Office Address</h2>
				{{ GET_CURRENT_COMPANY.registered_office_address ? GET_CURRENT_COMPANY.registered_office_address : 'Not Assigned Yet'}}
			</div>
		</div>
		<!-- PREVIEW DOCUMENT MODAL -->
		<div v-if="previewDocument">
			<FilePreviewModal :isDoc='isDoc' :docName='docName' :docId="docId" @close='previewDocument = false' />
		</div>
		<div>
			<div v-viewer>
				<img>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import Vue from 'vue'
Vue.use(VueViewer)
export default {
	data: () => ({
		//File Preview		
		isDoc: true,
		docName: '',
		docId: null,

		showDocuments: false,
		selectedDocument: null,
		previewDocument: false,
		loading: false,
		documentList: [],
		image: ["https://picsum.photos/450/450"]
	}),
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
		}),
	},
	mounted() {
		this.documents()
	},
	methods: {
		...mapActions({
			GET_DOCUMENTS_BY_FOLDER_ID: "fileManager/GET_DOCUMENTS_BY_FOLDER_ID",
			DOWNLOAD_FILE: "fileManager/DOWNLOAD_FILE",
		}),
		documents() {
			this.loading = true;
			this.GET_DOCUMENTS_BY_FOLDER_ID({ folder_id: '0' })
				.then((response) => {
					this.loading = false;
					if (response.data.data && response.data.data.length) {
						this.documentList = response.data.data
						this.documentList = this.documentList.filter(function (doc) {
							return doc.type == "file";
						});
					} else {
						this.documentList = []
					}
				})
		},
		openFile() {
			if(this.selectedDocument === null){
				this.$toast.error({
					title: "Please Select a File!",
					message: 'The File Is Not Selected',
				});
			}
			else{
			if (this.selectedDocument.extension === '.png' || this.selectedDocument.extension === '.jpeg' || this.selectedDocument.extension === '.jpg' || this.selectedDocument.extension === '.webp' || this.selectedDocument.extension === '.tiff') {
				this.$viewerApi({
					images: this.image,
				})
			}else {
				if (this.selectedDocument) {
					if (this.selectedDocument.extension === '.pdf' || this.selectedDocument.extension === '.docx') {
						this.isDoc = true
					}
					else {
						this.isDoc = false
					}
					this.previewDocument = !this.previewDocument
					this.docName = this.selectedDocument.name
					this.docId = this.selectedDocument.id
				}
				else {
					this.$toast.error({
						title: "Select Document",
						message: 'Please Select a Document',
					});
				}
			}
			}
		},
		downloadFile() {
			if (this.selectedDocument === null) {
				this.$toast.error({
					title: "Please Select a File!",
					message: 'The File Is Not Selected',
				});
			} else {
				this.DOWNLOAD_FILE({ file_id: this.selectedDocument.id })
					.then((response) => {
						this.$toast.success({
							title: "File Downloaded ",
							message: "Your file has been downloaded successfully",
						});
						let fileURL = window.URL.createObjectURL(new Blob([response.data]));
						let fileLink = document.createElement('a');
						fileLink.href = fileURL;
						fileLink.setAttribute('download', 'download.pdf');
						document.body.appendChild(fileLink);
						fileLink.click();
						this.selectedDocument = null
					})
					.catch((error) => {
						this.$toast.error({
							title: "Something went wrong!",
							message: 'The file could not be downloaded',
						});
					});
			}
		}
	},
};
</script>
<style scoped>
.document-section {
	max-height: 80vh;
}
</style>
