<template>
<div>
    <div class="fixed top-0 left-0 h-full w-full p-6 z-30">
			<div class="fixed top-0 left-0 h-full w-full bg-darkBlue bg-opacity-60" @click="$emit('close')">
			</div>
			<!--   MAIN   -->
			<div class="relative">
				<div class="flex justify-between items-center flex-wrap gap-5">
					<div class="flex items-center gap-4">
						<div class="bg-white flex-shrink-0 h-8 w-8 rounded-full flex justify-center items-center p-2.5 cursor-pointer"
							@click="$emit('close')">
							<img src="@/assets/img/pages/homepage/arrow-right.svg" alt=""
								class="transform -rotate-180 w-full" />
						</div>
						<div
							class="bg-white text-xs uppercase hidden sm:flex items-center font-semibold rounded-full py-2 px-4">
							{{docName}}
						</div>
					</div>
					<!--  -->
					<div class="hidden sm:flex items-center gap-4">
						<div @click="downloadFile" class="bg-white h-8 text-xs uppercase flex items-center font-semibold rounded-full px-4 cursor-pointer">
							Download as pdf
						</div>
						<div class="bg-white flex-shrink-0 h-6 w-6 rounded-full flex justify-center items-center p-4 cursor-pointer"
							@click="$emit('close')">
							&#9587;
						</div>
					</div>	
					<div class="sm:hidden bg-white flex-shrink-0 h-8 w-8 rounded-full flex justify-center items-center p-2.5 cursor-pointer"
						@click="downloadFile">
						<img src="@/assets/img/pages/dashboard/invoice/create-invoice/download.svg"
							class="w-3 transform filter invert" />
					</div>				
				</div>
				<div v-if="isDoc" id="app">
					<docPreviewVue url="https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf"/>
				</div>
				<div class="flex flex-col justify-center items-center bg-blackish rounded-2xl max-w-sm mx-auto py-5 px-7 mt-40">
					<div>
					<p class="text-white text-lg">No preview avaiable</p>
					</div>
					<div>
						<button @click="downloadFile"
						class="flex items-center gap-2 text-xs sm:text-sm bg-normalBlue text-white rounded-full py-2 2xl:py-3 px-4 xl:px-5 mt-4">
						<img src="@/assets/img/pages/dashboard/invoice/create-invoice/download.svg" alt="" class="w-4" />
						Download
						</button>											
					</div>
				</div>
			</div>
		</div>
        </div>
</template>

<script>
import { mapActions } from "vuex";
import docPreviewVue from "./doc-preview.vue";
export default {
    components: {	
		docPreviewVue
	},
    props:{
        isDoc:{
            type: Boolean,
            default: () => true
        },
        docName:{
            type: String,
            default: () => ''
        },
        docId:{
            type: String,
            default: () => ''
        },        
    },
    data:()=>({
       
    }),
    methods:{
        ...mapActions({		
			DOWNLOAD_FILE: "fileManager/DOWNLOAD_FILE",
		}),        
        	downloadFile() {
            this.DOWNLOAD_FILE({ file_id: this.docId })
                .then((response) => {
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
        },
    }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
  height: 100vh;
}
</style>