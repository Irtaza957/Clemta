<template>
    <div class="absolute top-10 right-0 z-20">
        <ValidationObserver v-slot="{ handleSubmit }">
            <form class="max-w-xs w-full mx-auto" @submit.prevent="handleSubmit(onSubmit)">
                <div class="bg-lighterBlue border border-darkBlue border-opacity-75 rounded-lg p-6 z-10">
                    <template v-if="!$route.params.folderid">
                        <ValidationProvider v-slot="{ errors }" name="selection">
                            <select v-model="form.folderid"
                                class=" bg-white border border-gray-400 py-1.5 px-4 rounded-xl w-full outline-none"
                                :class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'">
                                <option value='0'>Select Folder</option>
                                <option v-for="(folder, idx) in GET_ROOT_FOLDERS" :key="idx" :value="folder.id">
                                    {{ folder.name }}
                                </option>
                            </select>
                            <!-- Heroicon name: solid/chevron-down -->
                            <svg class="-mr-1 ml-2 h-5 w-5 absolute right-9 top-9" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </ValidationProvider>
                    </template>
                    <ValidationProvider v-slot="{ errors }" name="choose-file">
                        <div class="mt-6 box-border ">
                            <input type="file" id="files" @change="selected"
                                class="bg-white border border-gray-400 pr-4 w-full outline-none py-1"
                                :class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'" />
                        </div>
                    </ValidationProvider>
                    <button type="submit" :disabled="!isFileSelected"
                        class="uppercase border-b border-blackish pb-px mt-5 w-max block ml-auto font-semibold text-sm cursor-pointer">
                        Submit
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data: () => ({
        form: {
            folderid: '',
            file: '',
        },
        isFileSelected: false,
    }),
    computed: {
        ...mapGetters({
            GET_ROOT_FOLDERS: "fileManager/GET_ROOT_FOLDERS"
        }),
    },
    mounted() {
        this.setFolderId()
    },
    methods: {
        ...mapActions({
            UPLOAD_FILE: "fileManager/UPLOAD_FILE",
            GET_COMPANY_RECENT_FILES: "fileManager/GET_COMPANY_RECENT_FILES",
        }),
        setFolderId() {
            this.form.folderid = this.$route.params.folderid
            if (this.form.folderid === undefined) {
                this.form.folderid = '0'
            }
        },
        selected({ target: { files } }) {
            if (files.length) {
                this.isFileSelected = true;
                this.form.file = files['0']
            } else {
                this.isFileSelected = false;
            }
        },
        async onSubmit() {
            let formData = new FormData();
            formData.append('folderid', this.form.folderid)
            formData.append('file', this.form.file)
            this.UPLOAD_FILE({ form: formData, folderid: this.form.folderid })
                .then((response) => {
                    this.$toast.success({
                        title: "File Upload Success",
                        message: "Your file has been successfully uploaded",
                    });
                    this.$emit('getRecentFiles')
                    this.$emit('close');
                })
                .catch((error) => {
                    this.$emit('close');
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                });

        },
    }

}
</script>
<style scoped lang="scss">
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
</style>