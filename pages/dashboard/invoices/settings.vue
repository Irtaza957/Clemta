<template>
	<div>
		<!-- Back button on View History Section -->
		<div @click="back" class="flex items-center gap-1.5 md:ml-0 ml-5 mt-4 text-sm uppercase cursor-pointer">
			<div class="h-4 w-4 rounded-full flex justify-center items-center border border-blackish p-0.5">
				<img src="@/assets/img/pages/login/arrow-down.svg" class="transform rotate-90" />
			</div>
			Back
		</div>

		<!-- Dashboard Main Section -->
		<div class="bg-white rounded-xl lg:p-10 p-5 mt-6">
			<div v-if="!isEdit" class="flex flex-col gap-5">
				<div v-for="(setting, index) in invoiceSettings" :key="index"
					:class="setting.status && 'cursor-pointer'" class="bg-lighterBlue px-6 py-5 rounded-2xl shadow"
					@click="editSetings(setting.status, setting.id)">
					<div class="flex items-center gap-4">
						<h2 class="text-sm font-semibold">{{ setting.title }}</h2>
						<img v-if="!setting.status" src="@/assets/img/pages/dashboard/invoice/settings/lock.svg"
							class="w-4" />
					</div>
					<div class="flex justify-between items-end gap-2 mt-2">
						<p class="text-sm text-gray-500">{{ setting.detail }}</p>
						<img v-if="setting.icon" :src="
							require(`@/assets/img/pages/dashboard/invoice/settings/${setting.icon}`)
						" class="w-4 cursor-pointer" />
						<p v-else class="text-sm">Soon</p>
					</div>
				</div>
			</div>
			<div v-else-if="isEdit === 1">
				<p>Set up Your Brand</p>
				<ValidationObserver v-slot="{ handleSubmit }" ref="brandForm">
					<form @submit.prevent="handleSubmit(onBrandFormSubmit)"
						class="flex md:items-center items-end flex-wrap gap-7 my-8">
						<div class="flex flex-col md:flex-row items-start md:gap-7 gap-3">
							<div
								class="flex-shrink-0 relative flex md:items-center justify-center gap-x-4 flex-wrap w-44 md:mb-0 mb-7">
								<div class="flex items-center gap-3">
									<span class="text-sm">Logo</span>
									<div class="realtive info-img">
										<img src="@/assets/img/pages/dashboard/invoice/settings/info.svg" alt="" />
										<div class="info-box">
											<div
												class="absolute bottom-full left-0 w-max bg-gray-200 text-xs rounded-full px-4 py-1.5 z-10">
												A smaller representation of your logo
											</div>
											<div
												class="absolute bottom-full left-1/4 bg-gray-200 h-5 w-5 transform rotate-45 -translate-x-1/4 translate-y-1/4 z-0">
											</div>
										</div>
									</div>
								</div>
								<label class="relative h-10 w-10 rounded-full bg-lightestBlue p-1.5 shadow">
									<img src="@/assets/img/pages/dashboard/invoice/settings/upload.svg" alt=""
										class="cursor-pointer p-2" />
									<input type="file" class="hidden"
										accept="image/png, image/jpg, image/gif, image/jpeg, image/ai, image/eps, image/svg"
										@change="uploadImage" />
								</label>
								<div v-if="brandForm.logo"
									class="md:block hidden absolute left-0 right-0 top-full text-center text-sm bg-lighterBlue rounded-md py-1 px-3 transform translate-y-1/4">
									{{ brandForm.logo.name }}
								</div>
							</div>
							<div v-if="brandForm.logo"
								class="md:hidden block text-sm bg-lighterBlue rounded-md py-1 px-3 mb-2">
								{{ brandForm.logo.name }}
							</div>
							<div class="flex md:flex-row flex-col flex-wrap gap-7">
								<div class="flex items-center">
									<div class="flex-shrink-0 w-32 flex items-center gap-3">
										<span class="text-sm">Brand Color</span>
										<div class="relative info-img">
											<img src="@/assets/img/pages/dashboard/invoice/settings/info.svg" alt="" />
											<div class="info-box">
												<div
													class="absolute bottom-full left-0 transform -translate-x-1/4 -translate-y-1/3 w-max bg-gray-200 text-xs rounded-full px-4 py-1.5 z-10">
													Change/add a color to your branded pages
												</div>
												<div
													class="absolute bottom-full left-1/4 bg-gray-200 h-5 w-5 transform rotate-45 -translate-x-1/4 -translate-y-1/4 z-0">
												</div>
											</div>
										</div>
									</div>
									<div :style="{ 'background-color': colorMatch ? brandForm.color : '#0D659D' }"
										class="py-0.5 pl-8 pr-0.5 rounded-lg">
										<ValidationProvider v-slot="{ errors }" name="Brand Color" rules="required">
											<input v-model="brandForm.color" type="text" placeholder="XXXXXX" :class="
										errors[0]
											? 'border border-red-600 placeholder-red-600'
											: 'border'" class="text-sm py-1 px-3 outline-none sm:w-36 w-full rounded-tr-md rounded-br-md" />
										</ValidationProvider>
									</div>
								</div>

								<div class="flex items-center">
									<div class="flex-shrink-0 flex items-center gap-3 w-32">
										<span class="text-sm">Invoice Name</span>
										<div class="relative info-img">
											<img src="@/assets/img/pages/dashboard/invoice/settings/info.svg" alt="" />
											<div class="info-box">
												<div
													class="absolute bottom-full left-0 transform -translate-x-1/4 -translate-y-1/3 w-max bg-gray-200 text-xs rounded-full px-4 py-1.5 z-10">
													Set-up your invoice naming
												</div>
												<div
													class="absolute bottom-full left-1/4 bg-gray-200 h-5 w-5 transform rotate-45 -translate-x-1/4 -translate-y-1/4 z-0">
												</div>
											</div>
										</div>
									</div>
									<ValidationProvider v-slot="{ errors }" name="Invoice Name" rules="required">
										<input v-model="brandForm.name" type="text" name="invoice-name"
											placeholder="NAME-XXXXXX" :class="
										errors[0]
											? 'border border-red-600 placeholder-red-600'
											: 'border'" class="sm:w-auto w-full text-sm py-1.5 px-3 border rounded-lg outline-none" />
									</ValidationProvider>
								</div>
							</div>
						</div>
						<button type="submit"
							class="bg-normalBlue text-sm text-white w-max block ml-auto py-1.5 px-10 rounded-full uppercase">
							Save
						</button>
					</form>
				</ValidationObserver>
				<!-- Review Section -->
				<div class="mt-5">
					<div class="text-sm pb-2 border-b">Preview</div>
					<div
						class="grid md:grid-cols-2 grid-cols-1 md:gap-28 gap-10 md:px-10 px-5 py-14 my-6 shadow-lg md:w-11/12 w-full mx-auto">
						<div>
							<h1 class="text-lg font-semibold">Furkan Lahmacun</h1>
							<p class="sm:w-10/12 w-full text-sm my-4">
								Malatya Tekno Park münevver sk no:153 Malatya / Türkiye
							</p>
							<div class="flex justify-between items-center">
								<div class="uppercase font-semibold text-sm">Bill to:</div>
								<div class="uppercase font-semibold text-sm">Ship to:</div>
							</div>
						</div>
						<div>
							<div class="flex justify-center items-center">
								<div class="w-24 h-24">
									<div v-if="brandData.logo_url">
										<img :src="brandData.logo_url" class="w-full h-full" />
									</div>
									<div v-else>
										<img src="@/assets/img/pages/dashboard/settings/logo-dark.svg"
											class="w-full h-full" />
									</div>
								</div>
							</div>
							<div class="flex flex-col gap-2 md:mt-16 mt-7">
								<div class="flex justify-between items-center">
									<h1 class="uppercase font-semibold text-sm">Invoice#</h1>
									<p class="text-sm">{{ brandData.name }}</p>
								</div>
								<div class="flex justify-between items-center">
									<h1 class="uppercase font-semibold text-sm">
										INVOICE DATE
									</h1>
									<p class="text-sm">{{ $moment((new Date(brandData.updated_at * 1000))).format("DD-MM-YYYY") }}</p>
								</div>
								<div class="flex justify-between items-center">
									<h1 class="uppercase font-semibold text-sm">P.O. #</h1>
									<p class="text-sm">{{ brandData.po_number }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	layout: 'dashboard-layout',
	data: () => ({
		invoiceSettings: [
			{
				id: 1,
				title: "Set up Your Brand",
				detail:
					"Customize how your invoices look by changing the logo and color.",
				status: true,
				icon: "edit.svg",
			},
			{
				id: 2,
				title: "Set up your template",
				detail: "Set your default payment methods, memo, and more.",
				status: false,
				icon: "",
			},
		],
		// Invoice form
		brandForm: {
			logo: "",
			color: "#0D659D",
			name: "",
		},
		isEdit: null,
		isLogoSelected: false,
		brandData: {}
	}),
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
		}),
		colorMatch() {
			let regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
			if (this.brandForm.color.match(regex)) {
				return true
			} else {
				return false
			}
		},
	},

	created() {
		this.getInvoiceBrand()
	},
	methods: {
		...mapActions({
			INVOICE_BRAND: 'invoice/INVOICE_BRAND',
			GET_INVOICE_BRAND: 'invoice/GET_INVOICE_BRAND'
		}),
		getInvoiceBrand() {
			if (this.GET_CURRENT_COMPANY) {
				this.GET_INVOICE_BRAND({ company_id: this.GET_CURRENT_COMPANY.id })
					.then(response => {
						this.brandData = { ...response.data.brand }
					})
					.catch(error => {
					})
			}
		},

		onBrandFormSubmit() {
			let formData = new FormData();
			if(!this.brandForm.logo){
				this.$toast.error({
					title: "Error",
					message: 'Logo is required',
				});
				return;
			}
			formData.append('logo', this.brandForm.logo)
			formData.append('name', this.brandForm.name)
			formData.append('color', this.brandForm.color)
			this.INVOICE_BRAND({ company_id: this.GET_CURRENT_COMPANY.id, form: formData })
				.then(response => {
					this.brandForm.logo = "",
						this.brandForm.color = "#0D659D",				
						this.brandData = { ...response.data.brand }
						this.$toast.success({
							title: "Invoice Brand Updated",
							message: "Invoice Brand Updated Successfully",
						});
				})
				.catch(error => {
					this.$toast.error({
						title: "Error",
						message: error.message,
					});
				})
		},
		editSetings(status, val) {
			if (status) {
				this.isEdit = val;
			}
		},
		uploadImage({ target: { files } }) {
			this.isLogoSelected = false;
			const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg', 'image/ai', 'image/eps', 'image/svg'];
			if (!(acceptedImageTypes.includes(files['0'].type))) {
				this.$toast.error({
					title: "Upload Error",
					message: "Given logo format is not accepted",
				});
			}else {
				this.isLogoSelected = true;
				this.brandForm.logo = files['0']
			}
		},
		back() {
			if (this.isEdit) {
				this.isEdit = null;
			} else {
				this.$router.push("/dashboard/invoices");
			}
		},
	},
};
</script>

<style scoped>
.info-box {
	display: none;
	animation: popup 0.5s ease-in-out;
}

.info-img:hover .info-box {
	display: block;
}

@keyframes popup {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>
