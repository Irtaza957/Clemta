<template>
    <DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
        <div v-if="getFolders.length">
            <ValidationObserver v-slot="{ handleSubmit }">
                <form class="max-w-xs w-full mx-auto relative" @submit.prevent="handleSubmit(onSubmit)">
                    <h1 class="sm:text-2xl text-xl text-center font-semibold mb-6">
                        Select Folder
                    </h1>
                    <div class="w-full relative rounded-lg">
                        <ValidationProvider v-slot="{ errors }" name="selection" rules="required">
                            <div :class="
                                errors[0] ? 'border border-red-600 ' : 'border'
                            " class="px-3 py-2.5 rounded-lg flex justify-between items-center" @click="showFolderList = !showFolderList">
                                <span v-if="selectedFolder.name">
                                    {{ selectedFolder.name }}
                                </span>
                                <span v-else> Choose a Folder </span>
                                <img src="@/assets/img/pages/dashboard/invoice/create-invoice/arrow-head.png"
                                    alt="down-arrow" class="w-2" />
                                <input type="hidden" v-model="selectedFolder" />
                            </div>
                        </ValidationProvider>
                        <div v-if="showFolderList"
                            class="absolute top-full left-0 w-full transform translate-y-2 bg-white rounded-md border border-blackish py-1 pr-1 z-10">
                            <div class="folder-list max-h-24 overflow-y-scroll">
                                <div v-for="(folder, index) in getFolders" :key="index"
                                    class="flex items-center gap-3 cursor-pointer hover:bg-lightestGray transition-all duration-200 ease-linear px-3 p-2.5"
                                    @click="
                                        (selectedFolder = folder),
                                        (showFolderList = false)
                                    ">
                                    {{ folder.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-5">
                        <button type="button" class="text-sm p-4 w-full rounded-full bg-normalBlue text-white uppercase"
                            @click="$emit('close')">
                            Cancel
                        </button>
                        <button type="submit" class="text-sm p-4 w-full rounded-full bg-blackish text-white uppercase">
                            Move
                        </button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
        <div v-else class="max-w-xs w-full mx-auto">
            <h1 class="sm:text-2xl text-xl text-center font-bold">
                No Folder Found in this Folder
            </h1>
        </div>
    </DashboardModal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props: {
        selectedFile: {
            type: Object,
            default: () => { },
            required: true
        },
    },
    data: () => ({
        selectedFolder: {},
        showFolderList: false

    }),
    computed: {
        ...mapGetters({
            GET_OPEN_FOLDERS: "fileManager/GET_OPEN_FOLDERS",
            GET_ROOT_FOLDERS: "fileManager/GET_ROOT_FOLDERS"
        }),
        getFolders() {
            if (this.$route.params.folderid === undefined) {
                return this.GET_ROOT_FOLDERS
            } else {
                return this.GET_OPEN_FOLDERS
            }
        }
    },
    methods: {
        ...mapActions({
            MOVE_FILE: "fileManager/MOVE_FILE",
        }),
        async onSubmit() {
            let folder_id = this.$route.params.folderid
            if (folder_id === undefined) {
                folder_id = '0'
            }
            if (this.selectedFolder.id) {
                this.MOVE_FILE({ fileid: this.selectedFile.id, folderid: this.selectedFolder.id , folder_id: folder_id})
                    .then((response) => {
                        this.$toast.success({
                            title: "File Successfully Moved",
                            message: "Your file has been successfully moved",
                        });
                        this.$emit('close');
                    })
                    .catch((error) => {
                        this.$emit('close');
                        this.$toast.error({
                            title: "Error",
                            message: error.message,
                        });
                    });

            }
        }
    }

}
</script>
<style scoped lang="scss">
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
/* width */
.folder-list::-webkit-scrollbar {
	width: 6px;
}

/* Handle */
.folder-list::-webkit-scrollbar-thumb {
	background: #cbe7e8;
}
</style>