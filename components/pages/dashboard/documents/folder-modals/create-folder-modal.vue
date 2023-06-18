<template>
    <DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
        <ValidationObserver v-slot="{ handleSubmit }" ref="createFolderValidator">
            <form class="max-w-sm w-full mx-auto" @submit.prevent="handleSubmit(onSubmit)">
                <h1 class="sm:text-2xl text-xl text-center font-semibold mb-6">
                    New folder
                </h1>
                <ValidationProvider v-slot="{ errors }" name="folder name" rules="required">
                    <input v-model="form.name" type="text" placeholder="Folder title"
                        :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                        class="w-full py-3 px-4 text-sm bg-white placeholder-blackish rounded-lg outline-none border" />
                    <span class="text-xs text-red-600">{{ errors[0] }}</span>
                </ValidationProvider>
                <div class="grid grid-cols-2 gap-4 mt-5">
                    <button type="button" class="text-sm p-3 w-full rounded-full bg-normalBlue text-white uppercase"
                        @click="$emit('close')">
                        Cancel
                    </button>
                    <button type="submit" class="text-sm p-3 w-full rounded-full bg-blackish text-white uppercase">
                        Create
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </DashboardModal>
</template>
<script>
import { mapActions } from "vuex"
export default {
    data: () => ({
        form: {
            folderid: '',
            name: ''
        },
    }),
    mounted() {
        this.setFolderId()
    },
    methods: {
        ...mapActions({
            CREATE_FOLDER: "fileManager/CREATE_FOLDER"
        }),
        setFolderId() {
            this.form.folderid = this.$route.params.folderid
            if (this.form.folderid === undefined) {
                this.form.folderid = '0'
            }
        },
        async onSubmit() {
            this.CREATE_FOLDER({ form: this.form })
                .then((response) => {
                    this.$toast.success({
                        title: "Folder created! ",
                        message: "Your folder has been created successfully",
                    });
                })
                .catch((error) => {
                    this.$toast.error({
                        title: "Create Folder Error!",
                        message: error.message,
                    });
                })
                .finally(() => {
                    this.form.name = ''
                    this.form.folderid = ''
                    this.$refs.createFolderValidator.reset()
                    this.$emit('close')
                })
        }
    }

}
</script>
