<template>
	<DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
		<div class="max-w-xs w-full mx-auto">
			<h1 class="sm:text-2xl text-xl text-center font-semibold mb-6">
				Pending Orders
			</h1>
			<div class="overflow-y-auto h-40">
				<div class="flex justify-between items-center text-xs uppercase font-semibold px-2">
					<div class="flex items-center">
						<h2 class="w-28">Date</h2>
						<h2 class="w-28">Company Type</h2>
						<h2 class="w-28">Company State</h2>
					</div>
				</div>
				<div v-for="(order, index) in pendingOrders" :key="index"
					class="flex justify-between items-center bg-lighterBlue bg-opacity-60 rounded-md px-2 py-2.5 text-xs my-2">
					<div class="flex items-center cursor-pointer" @click="pendingOrderHandler(order.id)">
						<p class="w-28">
							{{ $moment((new Date(order.updated_at * 1000))).format("DD-MM-YYYY") }}
						</p>
						<p class="w-28">
							{{ order.company_type }}
						</p>
						<p class="w-28">
							{{ order.company_state }}
						</p>
					</div>
				</div>
			</div>
			<div class="gap-4 mt-5">
				<button type="button" class="text-sm p-4 w-full rounded-full bg-normalBlue text-white uppercase"
					@click="$emit('close')">
					Close
				</button>
			</div>
		</div>
	</DashboardModal>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	props: {
		pendingOrders: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		...mapMutations({
			SET_PENDING_ORDER_ID: 'createOrder/SET_PENDING_ORDER_ID'
		}),
		pendingOrderHandler(id) {
			this.SET_PENDING_ORDER_ID(id)
			this.$router.push('/create-order')
		}
	}
}
</script>
