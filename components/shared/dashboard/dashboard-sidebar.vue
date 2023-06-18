<template>
	<div :class="
		openSidebar ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
	" class="fixed xl:relative z-20 transition-all duration-200 ease-in-out">
		<div
			class="relative flex flex-col items-center h-screen 2xl:w-80 w-64 flex-shrink-0 bg-white overflow-y-scroll scrollbar-none px-5 pt-10 pb-5">
			<div class="w-full flex flex-col items-center">
				<!-- Close sidebar on mobile screen -->
				<div v-if="openSidebar"
					class="absolute top-2 right-4 h-6 w-6 bg-white rounded-full flex justify-center items-center p-1.5 border"
					@click="$emit('hideSidebar', false)">
					<div class="h-3 w-px bg-blackish transform rotate-45"></div>
					<div class="h-3 w-px bg-blackish transform -rotate-45 -ml-px"></div>
				</div>

				<!-- Logo -->
				<div @click="$router.push('/dashboard')" class="cursor-pointer">
					<img src="@/assets/img/pages/dashboard/settings/logo-dark.svg" class="w-8" />
				</div>

				<!-- Sidebar menu -->
				<div class="w-full flex flex-col gap-1 my-10">
					<div v-for="(menu, index) in sidebarMenu" :key="index" :class="
						'dashboard-' + menu.slug === $route.name ||
							menu.slug.split('-')[0] === $route.name.split('-')[1] ||
							menu.slug.split('/')[0] === $route.name.split('-')[1]
							? 'bg-lightestBlue bg-opacity-70'
							: 'bg-white'
					" class="w-full flex items-start gap-3 px-3 py-5 rounded-lg">
						<img :src="
							require('@/assets/img/pages/dashboard/homepage/' + menu.icon)
						" :class="menu.id == 5 && 'w-4'" class="w-5 flex-grow-0 flex-shrink-0" />
						<div>
							<h2 class="text-xs font-semibold uppercase cursor-pointer mt-1" @click="switchRoute(menu)">
								{{ menu.name }}
							</h2>
							<div v-if="
								menu.subMenu &&
								('dashboard-' + menu.slug === $route.name ||
									menu.slug.split('-')[0] === $route.name.split('-')[1] ||
									menu.slug.split('/')[0] === $route.name.split('-')[1])
							" class="mt-4 transform -translate-x-2">
								<div v-for="(childMenu, idx) in menu.subMenu" :key="idx" :class="
									childMenu.slug === $route.path.split('/')[3]
										? 'bg-lightBlue'
										: 'bg-transparent'
								" class="rounded-full cursor-pointer">
									<nuxt-link :to="'/dashboard/' + menu.slug + '/' + childMenu.slug">
										<p class="text-xs py-2 px-4">{{ childMenu.name }}</p>
									</nuxt-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Bottom profile option -->
			<div class="w-full bg-lightestBlue bg-opacity-50 rounded-full flex justify-between items-center cursor-pointer pl-2 pr-4 py-1.5"
				@click="showProfileMenu">
				<div class="flex items-center gap-3">
					<div class="w-9 h-9 rounded-full">
						<div v-if="$auth.user.avatar_url">
							<img :src="$auth.user.avatar_url" class="w-full h-full rounded-full bg-gray-300" />
						</div>
						<div v-else>
							<img src="@/assets/img/pages/dashboard/profile.png"
								class="w-full h-full rounded-full bg-gray-300" />
						</div>
					</div>
					<div>
						<p class="text-xs font-semibold">{{ $auth.user.name + ' ' + $auth.user.surname }}</p>
					</div>
				</div>
				<div>
					<img src="@/assets/img/pages/login/arrow-down.svg" class="w-3" />
				</div>
			</div>
			<!-- *******************   PROFILE MENU   ******************* -->
			<div v-if="isProfileMenu || $route.name === 'dashboard-settings'"
				class="w-full flex flex-col gap-2 bg-lightestBlue bg-opacity-50 rounded-2xl p-3 mt-1" id="profileMenu">
				<div :class="
					selectedMenu === 'settings' ||
					($route.name === 'dashboard-settings' && 'bg-lightBlue')
				" class="flex items-center gap-4 text-xs font-semibold uppercase p-2 hover:bg-lightBlue transition-all duration-150 ease-linear rounded-full">
					<img src="@/assets/img/pages/dashboard/invoice/setting.svg" class="w-5" />
					<nuxt-link to="/settings">
						<p class="cursor-pointer" @click="selectedMenu = 'settings'">
							Settings
						</p>
					</nuxt-link>
				</div>
				<div
					class="flex items-center gap-4 text-xs font-semibold uppercase p-2 hover:bg-lightBlue transition-all duration-150 ease-linear cursor-pointer rounded-full">
					<img src="@/assets/img/pages/dashboard/info.png" class="w-5" />
					<p>Resources</p>
				</div>
				<div class="flex items-center gap-4 text-xs font-semibold uppercase p-2 hover:bg-lightBlue transition-all duration-150 ease-linear cursor-pointer rounded-full"
					@click="showSwitchCompanyModal = true">
					<img src="@/assets/img/pages/dashboard/settings/switch.svg" class="w-5" />
					<p>Switch Company</p>
				</div>
				<div class="flex items-center gap-4 text-red-600 text-xs font-semibold uppercase p-2 hover:bg-lightBlue transition-all duration-150 ease-linear cursor-pointer rounded-full"
					@click="LOGOUT">
					<img src="@/assets/img/pages/dashboard/log-out.png" class="w-5" />
					<p>Sign out</p>
				</div>
			</div>

			<!-- ****************** SWITCH COMPANY MODAL ****************** -->
			<template v-if="showSwitchCompanyModal">
				<SwitchCompanyModal @close="showSwitchCompanyModal = false" />
			</template>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";

import SwitchCompanyModal from '../../pages/dashboard/switch-company-modal.vue';
export default {
	components: {
		SwitchCompanyModal
	},

	props: {
		openSidebar: {
			type: Boolean,
			default: false,
		},
	},

	data: () => ({
		sidebarMenu: [
			{
				id: 1,
				name: "My company",
				icon: "company.svg",
				slug: "my-company",
				subMenu: null,
			},
			{
				id: 2,
				name: "Taxation & Accounting",
				icon: "taxation.svg",
				slug: "taxation-accounting",
				subMenu: [
					{
						id: 1,
						name: "Federal Tax Filing",
						slug: "federal-tax-filing",
					},
					{
						id: 2,
						name: "State Tax Filing",
						slug: "state-tax-filing",
					},
					{
						id: 3,
						name: "Bookkeeping",
						slug: "bookkeeping",
					},
				],
			},
			{
				id: 3,
				name: "Service progress",
				icon: "service.svg",
				slug: "service-progress",
				subMenu: null,
			},
			// {
			//   id: 4,
			//   name: "Billing",
			//   icon: "billing.svg",
			//   slug: "billing",
			//   subMenu: null,
			// },
			{
				id: 4,
				name: "Invoice",
				icon: "invoice.svg",
				slug: "invoices",
				subMenu: null
			},
			{
				id: 5,
				name: "Customers",
				icon: "user.png",
				slug: "customers",
				subMenu: null,
			},
			{
				id: 6,
				name: "Documents",
				icon: "document.svg",
				slug: "documents",
				subMenu: null,
			},
		],
		selectedMenu: "",
		isProfileMenu: false,
		showSwitchCompanyModal: false,
	}),
	methods: {
		...mapActions({
			LOGOUT: "authentication/LOGOUT",
		}),
		switchRoute(route) {
			this.selectedMenu = route.name;
			this.$router.push("/dashboard/" + route.slug);
		},
		showProfileMenu() {
			this.isProfileMenu = !this.isProfileMenu
			setTimeout(function () { document.querySelector('#profileMenu').scrollIntoView(false); }, 200);
		}
	},
};
</script>

