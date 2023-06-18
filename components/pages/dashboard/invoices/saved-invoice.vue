<template>
	<div>
		<div class="relative bg-white rounded-xl my-6">
			<!-- *******************   SAVED INVOICE SECTION   ******************* -->
			<div class="relative">
				<div class="md:mt-5">
					<!-- Invoice details -->
					<div class="md:pl-2">
						<h1 class="text-lg font-semibold">{{ selectedCustomer }}</h1>
						<p class="sm:w-10/12 w-full text-sm my-4">
							Malatya Tekno Park münevver sk no:153 <br />
							Malatya / Türkiye
						</p>
					</div>
					<div class="grid md:grid-cols-3 grid-cols-1 w-full border-b pb-4 md:pl-2 md:pr-4">
						<div class="md:col-span-2">
							<div class="flex justify-between items-start md:w-8/12 w-full md:mb-0 mb-3">
								<div class="uppercase font-semibold text-sm">Bill to</div>
								<div class="uppercase font-semibold text-sm">Ship to</div>
							</div>
						</div>
						<div>
							<div class="flex flex-col gap-2">
								<div class="flex justify-between items-center">
									<h1 class="uppercase font-semibold text-sm">Invoice#</h1>
									<p class="text-sm md:w-24">{{ invoiceData.invoice_num }}</p>
								</div>
								<div class="flex justify-between items-center">
									<h1 class="uppercase font-semibold text-sm">
										INVOICE DATE
									</h1>
									<p class="text-sm md:w-24">{{ $moment((new
											Date(invoiceData.created_at))).format("DD.MM.YYYY")
									}}
									</p>
								</div>
								<div class="flex justify-between items-center">
									<h1 class="uppercase font-semibold text-sm">P.O. #</h1>
									<p class="text-sm md:w-24">{{ invoiceData.po_number }}</p>
								</div>
								<div class="flex justify-between items-center">
									<h1 class="uppercase font-semibold text-sm">Due date</h1>
									<p class="text-sm md:w-24">{{ $moment((new
											Date(invoiceData.due_on))).format("DD.MM.YYYY")
									}}</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Invoice Table -->
					<div class="w-full overflow-x-scroll scrollbar-none">
						<div class="invoice-table bg-gray-100 py-3 px-2 my-3 rounded-xl">
							<!-- Invoice list heading -->
							<div class="grid grid-cols-3">
								<div class="col-span-2">
									<div class="flex items-start">
										<h2 class="uppercase font-semibold text-sm w-20 md:w-24">
											QTY
										</h2>
										<h2 class="uppercase font-semibold text-sm">
											Description
										</h2>
									</div>
								</div>
								<div>
									<div class="flex justify-between items-start">
										<h2 class="uppercase font-semibold text-sm">
											Unit price
										</h2>
										<h2 class="uppercase font-semibold text-sm w-24">
											Amount
										</h2>
									</div>
								</div>
							</div>

							<!-- Invoice list records -->
							<div class="mt-5">
								<div v-for="(invoice, index) in invoiceData.items" :key="index"
									class="grid grid-cols-3 py-2">
									<div class="col-span-2">
										<div class="flex items-start">
											<p class="uppercase text-sm w-20 md:w-24 pl-1">
												{{ invoice.qty }}
											</p>
											<p class="uppercase text-sm">
												{{ invoice.name }}
											</p>
										</div>
									</div>
									<div>
										<div class="flex justify-between items-start">
											<h2 class="uppercase text-sm">${{ invoice.price }}</h2>
											<h2 class="uppercase text-sm w-24 overflow-y-scroll scrollbar-none">
												${{ invoice.price * invoice.qty }}
											</h2>
										</div>
									</div>
								</div>
							</div>

							<!-- Invoice Total -->
							<div class="w-1/3 ml-auto mt-16">
								<div class="flex justify-between">
									<p class="text-sm">Subtotal</p>
									<p class="text-sm w-24 overflow-y-scroll scrollbar-none">
										${{ subTotal }}
									</p>
								</div>
								<div class="flex justify-between mt-2">
									<p class="text-sm">Salex tax {{ invoiceData.tax_percent }}%</p>
									<p class="text-sm w-24 overflow-y-scroll scrollbar-none">
										${{ Math.floor(taxAmount) }}
									</p>
								</div>
								<div class="flex justify-between mt-4 uppercase">
									<h2 class="text-lg">Total</h2>
									<h2 class="text-lg w-24">${{ invoiceData.amount }}</h2>
								</div>
							</div>
						</div>
					</div>

					<!-- Send or Download Document -->
					<div class="flex items-center justify-end flex-wrap gap-2 mt-4">
						<div class="text-xs sm:text-sm py-2.5 2xl:py-3 px-4 2xl:px-6 bg-normalBlue text-white rounded-full cursor-pointer"
							@click="sendDocument = true">
							Send Document
						</div>
						<a @click="downloadInvoice"
							class="flex items-center sm:gap-3 gap-2 text-xs sm:text-sm py-2.5 2xl:py-3 px-4 2xl:px-6 bg-blackish text-white rounded-full cursor-pointer">
							<img src="@/assets/img/pages/dashboard/invoice/create-invoice/download.svg" alt="" />
							Download Document
						</a>
					</div>

					<!-- Terms & Conditions -->
					<div class="mt-7">
						<h1 class="text-lg">Terms & Conditions</h1>
						<div class="flex flex-col sm:flex-row items-start sm:gap-9 gap-2 mt-2 text-sm">
							<p>Payment is due within 30 days</p>
							<div>
								<p>Name of Bank: Mercury</p>
								<p>Account Number: 12345678910</p>
								<p>Routing: 426347582</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="sendDocument" class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
			<SendInvoice :invoiceData='invoiceData' @close='sendDocument = false' />
		</div>
	</div>

</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SendInvoice from "./send-invoice.vue";

export default {
	layout: 'dashboard-layout',
	components: {
		SendInvoice
	},
	props: ['invoiceData', 'selectedCustomer', 'taxAmount', 'subTotal'],
	data: () => ({
		sendDocument: false
	}),
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
		}),
	},

	methods: {
		...mapActions({
			DOWNLOAD_INVOICE: 'invoice/DOWNLOAD_INVOICE',
		}),

		downloadInvoice() {
			this.DOWNLOAD_INVOICE({ company_id: this.GET_CURRENT_COMPANY.id, invoice_id: this.invoiceData.id })
				.then(response => {
					fetch(`${process.env.BASE_URL}/api${response.data.file}`)
						.then(response => response.blob())
						.then(blob => {
							const link = document.createElement("a");
							link.href = URL.createObjectURL(blob);
							link.download = 'invoice.pdf';
							link.click();
						})
					this.$toast.success({
						title: "Invoice Download",
						message: "Invoice Downloaded successfully",
					});
				})
				.catch(error => {
					this.$toast.error({
						title: "Error",
						message: error.message,
					});
				})
		},
	},
};
</script>

<style scoped>
.invoice-table {
	min-width: 850px;
}

/* SCROLLBAR STYLING */

/* width */
::-webkit-scrollbar {
	width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #CCCCCC;
	border-radius: 10em;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #2E465C;
	border-radius: 10em;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>
