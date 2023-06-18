<template>
	<Container>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6 lg:gap-x-8 mt-5">
			<PersonalInfo />
			<BillingAddress />
			<Subscription :changePlanRedirect="changePlanRedirect" />
			<PaymentMethod :changePlanRedirect="changePlanRedirect" />
		</div>
		<div class="mt-5">
			<EmailNotification />
		</div>
	</Container>

</template>

<script>
import { mapActions } from "vuex";
import PersonalInfo from "../../components/pages/settings/personal-info/index"
import BillingAddress from "../../components/pages/settings/billing-address/index"
import Subscription from "../../components/pages/settings/subscription/index"
import PaymentMethod from "../../components/pages/settings/payment-method/index"
import EmailNotification from "../../components/pages/settings/email-notification"

export default {
	layout: 'dashboard-layout',
	components: {
		PersonalInfo,
		BillingAddress,
		Subscription,
		PaymentMethod,
		EmailNotification
	},
	data: () => ({
		changePlanRedirect: null,
	}),
	mounted() {
		this.changePlan()
	},
	methods: {
		...mapActions({
			GET_COMPANY_CUSTOMER_PORTAL: "settings/GET_COMPANY_CUSTOMER_PORTAL"
		}),
		async changePlan() {
			this.GET_COMPANY_CUSTOMER_PORTAL()
				.then(response => {
					this.changePlanRedirect = response.data.data
				})
				.catch((error) => {
					this.$toast.error({
						title: "Error",
						message: error.message,
					});
				})
		},
	}
};
</script>

