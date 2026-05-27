const path = require("path");
const pkg = require("../../packages/sdk-reactnative/package.json");

module.exports = {
	dependencies: {
		[pkg.name]: {
			root: path.join(__dirname, "../../packages/sdk-reactnative"),
			platforms: {
				ios: {},
				android: {},
			},
		},
	},
};
