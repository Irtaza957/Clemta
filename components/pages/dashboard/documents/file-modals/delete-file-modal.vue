<template>
    <DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
        <div class="max-w-xs w-full mx-auto">
            <h1 class="sm:text-2xl text-xl text-center font-semibold mb-6">
                Delete file
            </h1>
            <p class="text-center text-base">
                Are you sure you want to delete this file?
            </p>
            <div class="grid grid-cols-2 gap-4 mt-5">
                <button type="button" class="text-sm p-4 w-full rounded-full bg-normalBlue text-white uppercase"
                    @click="$emit('close')">
                    Cancel
                </button>
                <button type="submit" class="text-sm p-4 w-full rounded-full bg-blackish text-white uppercase"
                    @click="onDeleteFile">
                    Delete
                </button>
            </div>
        </div>
    </DashboardModal>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: {
        selectedFile: {
            type: Object,
            default: () => { },
            required: true
        }
    },
    methods: {
        ...mapActions({
            DELETE_FILE: "fileManager/DELETE_FILE"
        }),
        async onDeleteFile() {
            let folder_id = this.$route.params.folderid
            if (folder_id === undefined) {
                folder_id = '0'
            }
            this.DELETE_FILE({ file_id: this.selectedFile.id, folder_id: folder_id })
                .then((response) => {
                    this.$emit('getRecentFiles')
                    this.$toast.success({
                        title: "File deleted successfully! ",
                        message: "Your file has been deleted",
                    });
                    this.$emit('close');
                })
                .catch((error) => {
                    this.$emit('close')
                    this.$toast.error({
                        title: "Delete File Error!",
                        message: error.message,
                    });
                });
        },
    }
}
</script>