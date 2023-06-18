const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: [
		"./components/**/*.{vue,js}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Lato', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				//  Blue shades
				lightestBlue: "#DCF4F5",
				lighterBlue: "#F1F7F8",
				lightBlue: "#CBE7E8",
				skyBlue: "#86b2ce",
				normalBlue: "#0D659D",
				darkBlue: "#2E465C",

				// Black shades
				blackish: "#2E3B3C",

				// Gray shades
				lightestGray: "#F5F5F5",

				// Brown shades
				lightBrown: "#F9C487",

				// Green shades
				lightestGreen: "#EFECD3",
				lightGreen: "#BEEFC1",
				greenish: "#70BAC9",
				darkGreen: "#155D6B",

				// Pirple shades
				pirple: "#8696CE",
				darkPirple: "#413F84",

				// Pink shades
				lightPink: "#F6E5E1",
			},
			boxShadow: {
				border: "0 0 0 2px #2E3B3C",
			},
			backgroundImage: {
				// Hero images
				homeHero: "url('@/assets/img/pages/homepage/hero.svg')",
				heroMask: "url('@/assets/img/pages/homepage/hero-mask.svg')",
				// Footer images
				footerImage: "url('@/assets/img/pages/homepage/footer-image.svg')",
				footerImageMask: "url('@/assets/img/pages/homepage/footer-mask.svg')",
			},
		},
	},
	plugins: [],
};
