export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "Clemta",
		htmlAttrs: {
			lang: "en",
		},
		meta: [{
			charset: "utf-8"
		},
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		},
		{
			hid: "description",
			name: "description",
			content: ""
		},
		{
			name: "format-detection",
			content: "telephone=no"
		},
		],
		link: [{
			rel: "icon",
			type: "image/x-icon",
			href: "/favicon.ico"
		},
		{
			rel: "preconnect",
			href: "https://fonts.googleapis.com",
		},
		{
			rel: "preconnect",
			href: "https://fonts.gstatic.com",
		},
		{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
		}
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/scss/main.scss', '@/assets/css/tailwind.css'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		// When use element-ui as plugin, remember setting ssr: true
		{
			src: "~/plugins/global_components.js",
			ssr: true
		},
		{
			src: "~/plugins/vee_validate.js"
		},
		{
			src: "~/plugins/vue_apexcharts.js",
			ssr: false
		},
		{
			src: "~/plugins/vee_validate.js"
		},
		{
			src: "~/plugins/toaster.js"
		},
		{
			src: "~/plugins/v_calendar",
			ssr: false
		},
		{
			src: "~/plugins/vue_tel_input"
		},
		{
			src: "~/plugins/axios"
		},
		{
			src: "~/plugins/file_manager_axios"
		},
		{
			src: '~/plugins/vuex_persist.js',
			mode: 'client'
		},
		{
			src: "~/plugins/v_year.js"
		},
	],

	toast: {
		position: "top-center",
		register: [
			// Register custom toasts
			{
				name: "my-error",
				message: "Oops...Something went wrong",
				options: {
					type: "error",
				},
			},
		],
	},
	// Auto import components: https://go.nuxtjs.dev/config-components
	components: false,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: ['@nuxt/postcss8', '@nuxtjs/moment'],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		"@nuxtjs/axios",
		"@nuxtjs/auth-next",
		"@nuxtjs/dotenv",
		"@nuxtjs/toast",
		"nuxt-tv-toast",
	],

	auth: {
		strategies: {
			local: {
				token: {
					property: "data.token",
					required: true,
					type: "Bearer",
					maxAge: 60 * 60 * 24 * 30,
				},
				user: false,
				endpoints: {
					login: {
						url: "/api/auth/login",
						method: "post",
						propertyName: "data.token",
					},
					logout: false,
					user: {
						url: "/api/user/me",
						method: "get"
					},
				},
			},
		},
		redirect: false,
	},

	axios: {},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		extractCSS: true,
		optimization: {
			splitChunks: {
				cacheGroups: {
					styles: {
						name: 'styles',
						test: /\.(css|vue)$/,
						chunks: 'all',
						enforce: true
					}
				}
			}
		},
		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {},
			},
		},
		standalone: true,
	},
};