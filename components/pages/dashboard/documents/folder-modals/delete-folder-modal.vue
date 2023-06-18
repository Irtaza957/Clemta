<template>
    <DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
        <div class="max-w-xs w-full mx-auto">
            <h1 class="sm:text-2xl text-xl text-center font-semibold mb-6">
                Delete folder
            </h1>
            <p class="text-center text-base">
                Are you sure you want to delete this folder?
            </p>
            <div class="grid grid-cols-2 gap-4 mt-5">
                <button type="button" class="text-sm p-4 w-full rounded-full bg-normalBlue text-white uppercase"
                    @click="$emit('close')">
                    Cancel
                </button>
                <button type="submit" class="text-sm p-4 w-full rounded-full bg-blackish text-white uppercase"
                    @click="onDeleteFolder">
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
        selectedFolder: {
            type: Object,
            default: () => { },
            required: true
        }
    },
    methods: {
        ...mapActions({
            DELETE_FOLDER: "fileManager/DELETE_FOLDER"
        }),
        async onDeleteFolder() {
            let folderid = this.$route.params.folderid
            if (folderid === undefined) {
                folderid = '0'
            }
            this.DELETE_FOLDER({ id: this.selectedFolder.id, folder_id: folderid })
                .then((response) => {
                    this.$toast.success({
                        title: "Folder deleted successfully! ",
                        message: "Your folder has been deleted",
                    });
                    this.$emit('close')
                })
                .catch((error) => {
                    this.$emit('close')
                    this.$toast.error({
                        title: "Delete Folder Error!",
                        message: error.message,
                    });
                });
        }
    }
}
</script>
