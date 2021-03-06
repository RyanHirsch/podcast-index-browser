/* eslint-env node */
module.exports = {
	preset: "ts-jest/presets/js-with-ts",
	moduleFileExtensions: ["ts", "tsx", "js"],
	moduleNameMapper: {},
	transform: {
		"^.+.(ts|tsx)$": "ts-jest",
	},
	testMatch: ["**/__tests__/*.(ts|tsx)"],
	setupFilesAfterEnv: ["./jest.setup.ts"],
	testPathIgnorePatterns: ["./.next/", "./node_modules/"],
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.jest.json",
		},
	},
};
