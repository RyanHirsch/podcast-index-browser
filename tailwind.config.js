/* eslint-env node */
module.exports = {
	purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
	darkMode: false,
	theme: {
		extend: {},
	},
	variants: {
		backgroundColor: ["responsive", "hover", "focus", "active"],
	},
	plugins: [],
};
