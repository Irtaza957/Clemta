<template>
    <DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
        <ValidationObserver v-slot="{ handleSubmit }">
            <form class="max-w-xs w-full mx-auto" @submit.prevent="handleSubmit(onUpdateFile)">
                <h1 class="sm:text-2xl text-xl text-center font-semibold mb-6">
                    Update file
                </h1>
                <ValidationProvider v-slot="{ errors }" name="File name" rules="required">
                    <input v-model="form.name" type="text" placeholder="File title"
                        :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                        class="w-full py-3 px-4 text-sm bg-white placeholder-blackish rounded-lg outline-none border" />
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
import { mapActions } from "vuex";
export default {
    props: {
        selectedFile: {
            type: Object,
            default: () => { },
            required: true
        },
    },

    data: () => ({
        form: {
            name: ''
        },
    }),
    mounted() {
        this.form.name = this.selectedFile['name']
    },
    methods: {
        ...mapActions({
            UPDATE_FILE: "fileManager/UPDATE_FILE"
        }),
        async onUpdateFile() {
            const formData = new FormData()
            formData.append('name', this.form.name)
            let folder_id = this.$route.params.folderid
            if (folder_id === undefined) {
                folder_id = '0'
            }
            this.UPDATE_FILE({ form: formData, folder_id: folder_id, id: this.selectedFile.id })
                .then((response) => {
                    this.$emit('getRecentFiles')
                    this.$toast.success({
                        title: "File updated! ",
                        message: "Your file has been updated successfully",
                    })
                    this.$emit('close');
                })
                .catch((error) => {
                    this.$toast.error({
                        title: "Update File Error!",
                        message: error.message,
                    })
                })
        },

    }
}
</script>
