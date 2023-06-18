<template>
    <DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
        <ValidationObserver v-slot="{ handleSubmit }">
            <form class="max-w-xs w-full mx-auto" @submit.prevent="handleSubmit(onUpdateFolder)">
                <h1 class="sm:text-2xl text-xl text-center font-semibold mb-6">
                    Update folder
                </h1>
                <ValidationProvider v-slot="{ errors }" name="folder name" rules="required">
                    <input v-model="form.name" type="text" placeholder="Folder title"
                        :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                        class="w-full py-3 px-4 text-sm bg-white rounded-lg outline-none border" />
                    <span class="text-xs text-red-600">{{ errors[0] }}</span>
                </ValidationProvider>
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <button @click="$emit('close')" type="button"
                        class="text-xs p-3 w-full rounded-full bg-normalBlue text-white uppercase">
                        Cancel
                    </button>
                    <button type="submit" class="text-xs p-3 w-full rounded-full bg-blackish text-white uppercase">
                        Update
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </DashboardModal>
</template>

<script>
import { mapActions } from "vuex"

export default {
    props: {
        selectedFolder: {
            type: Object,
            default: () => { },
            required: true
        }
    },
    data: () => ({
        form: {
            name: ''
        },
        folderid: ''
    }),
    mounted() {
        this.form['name'] = this.selectedFolder['name']
        this.setFolderId()
    },
    methods: {
        ...mapActions({
            UPDATE_FOLDER: "fileManager/UPDATE_FOLDER"
        }),
        setFolderId() {
            this.folderid = this.$route.params.folderid
            if (this.folderid === undefined) {
                this.folderid = '0'
            }
        },
        async onUpdateFolder() {
            const formData = new FormData()
            formData.append('name', this.form.name)
            this.UPDATE_FOLDER({ form: formData, folderid: this.selectedFolder.id, id: this.folderid })
                .then((response) => {
                    this.$toast.success({
                        title: "Folder updated! ",
                        message: "Your folder has been updated successfully",
                    })
                    this.$emit('close')
                })
                .catch((error) => {
                    this.$toast.error({
                        title: "Update Folder Error!",
                        message: error.message,
                    })
                })
        }
    }
}
</script>
