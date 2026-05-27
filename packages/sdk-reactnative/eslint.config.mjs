import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
	{
		ignores: ["node_modules/", "lib/", "eslint.config.mjs"],
	},
	js.configs.recommended,
	{
		files: ["**/*.{js,mjs,cjs,ts,tsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			parser: typescriptParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				sourceType: "module",
			},
			sourceType: "module",
		},
		plugins: {
			"@typescript-eslint": typescriptPlugin,
			prettier,
		},
		rules: {
			...typescriptPlugin.configs.recommended.rules,
			"no-undef": "off",
			"prettier/prettier": "error",
		},
	},
];
