<template>
    <div>
        <div class="relative">
            <div class="w-5">
                <img src="@/assets/img/pages/dashboard/documents/vertical-dots.svg" class="w-full cursor-pointer"
                    @click="showOptions = !showOptions" />
            </div>
            <div v-if="showOptions && document.type === 'folder'"
                class="w-28 absolute top-full right-0 flex flex-col gap-1 transform translate-y-2 bg-lighterBlue border border-darkBlue border-opacity-75 rounded-lg py-3 z-10">
                <nuxt-link :to="'/dashboard/documents/' + document.id">
                    <p class="text-sm cursor-pointer pl-5 py-1 hover:bg-gray-200">Open</p>
                </nuxt-link>
                <p class="text-sm cursor-pointer pl-5 py-1 hover:bg-gray-200" @click="modifyFolder(document, 'edit')">
                    Rename</p>
                <p class="text-sm cursor-pointer pl-5 py-1 hover:bg-gray-200" @click="modifyFolder(document, 'delete')">
                    Delete</p>
            </div>
            <div v-else-if="showOptions && document.type === 'file'"
                class="w-28 absolute top-full right-0 flex flex-col gap-1 transform translate-y-2 bg-lighterBlue border border-darkBlue border-opacity-75 rounded-lg py-3 z-10">
                <p @click="showOptions = false" class="text-sm cursor-pointer pl-5 py-1 hover:bg-gray-200">Open</p>
                <p @click="modifyFile(document, 'edit')" class="text-sm cursor-pointer pl-5 py-1 hover:bg-gray-200">
                    Rename</p>
                <p @click="modifyFile(document, 'move')" class="text-sm cursor-pointer pl-5 py-1 hover:bg-gray-200">Move to</p>
                <p class="text-sm cursor-pointer pl-5 py-1 hover:bg-gray-200">Share</p>
                <p @click="downloadFile(document)" class="text-sm cursor-pointer pl-5 py-1 hover:bg-gray-200">
                    Download</p>
                <p @click="modifyFile(document, 'delete')" class="text-sm cursor-pointer pl-5 py-1 hover:bg-gray-200">
                    Delete</p>
            </div>
        </div>
        <!-- UPDATE FOLDER MODAL -->
        <template v-if="showUpdateFolderModal">
            <UpdateFolderModal :selectedFolder="selectedFolder" @close="showUpdateFolderModal = false" />
        </template>
        <!-- DELETE FOLDER MODAL -->
        <template v-if="showDeleteFolderModal">
            <DeleteFolderModal :selectedFolder="selectedFolder" @close="showDeleteFolderModal = false" />
        </template>
        <!-- UPDATE FILE MODAL -->
        <template v-if="showUpdateFileModal">
            <UpdateFileModal :selectedFile="selectedFile" @close="showUpdateFileModal = false"
                @getRecentFiles="getRecentFiles" />
        </template>
        <!-- Delete FILE MODAL -->
        <template v-if="showDeleteFileModal">
            <DeleteFileModal :selectedFile="selectedFile" @close="showDeleteFileModal = false"
                @getRecentFiles="getRecentFiles" />
        </template>
         <!-- Move FILE MODAL -->
        <template v-if="showMoveFileModel">
            <MoveFileTo :selectedFile="selectedFile" @close="showMoveFileModel = false" />
        </template>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import UpdateFolderModal from './folder-modals/update-folder-modal.vue'
import DeleteFolderModal from './folder-modals/delete-folder-modal.vue'
import UpdateFileModal from "./file-modals/update-file-modal.vue";
import DeleteFileModal from "./file-modals/delete-file-modal.vue";
import MoveFileTo from "./file-modals/move-file-to.vue";
export default {
    props: {
        document: {
            type: Object,
            default: () => { }
        },
    },
    components: {
        UpdateFolderModal,
        DeleteFolderModal,
        UpdateFileModal,
        DeleteFileModal,
        MoveFileTo
    },
    data() {
        return {
            showOptions: false,
            // Folders
            showUpdateFolderModal: false,
            showDeleteFolderModal: false,
            selectedFolder: {},
            // Files
            showUpdateFileModal: false,
            showDeleteFileModal: false,
            showMoveFileModel: false,
            selectedFile: {}
        }
    },
    methods: {
        ...mapActions({
            DOWNLOAD_FILE: "fileManager/DOWNLOAD_FILE",
            GET_FILE_INFO: "fileManager/GET_FILE_INFO",
        }),
        getRecentFiles() {
            this.$emit('getRecentFiles');
        },
        modifyFolder(folder, operation) {
            this.selectedFolder = { ...folder }
            this.showOptions = false
            switch (operation) {
                case 'edit':
                    this.showUpdateFolderModal = true
                    break;
                case 'delete':
                    this.showDeleteFolderModal = true
                    break;
                default:
                    break;
            }
        },

        modifyFile(file, operation) {
            this.selectedFile = { ...file }
            this.showOptions = false
            switch (operation) {
                case 'edit':
                    this.showUpdateFileModal = true
                    break;
                case 'delete':
                    this.showDeleteFileModal = true
                    break;
                    case 'move':
                    this.showMoveFileModel = true
                    break;
                default:
                    break;
            }
        },
        downloadFile(file) {
            this.showOptions = false
            if (file.extension) {
                this.DOWNLOAD_FILE({ file_id: file.id })
                   .then(response => {
					fetch(`${process.env.FILE_MANAGER_URL}${response.data.data}`)
						.then(response => response.blob())
						.then(blob => {
							const link = document.createElement("a");
							link.href = URL.createObjectURL(blob);
							link.download = `document${file.extension}`;
							link.click();
						})
                        .catch(console.error);
					this.$toast.success({
                            title: "File Downloaded ",
                            message: "Your file has been downloaded successfully",
                        });
				})
                    .catch((error) => {
                        this.$toast.error({
                            title: "Something went wrong!",
                            message: 'The file could not be downloaded',
                        });
                    });
            }
        }
    }
}
</script>