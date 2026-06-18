module.exports = {
    "extends": ['@commitlint/config-conventional'],
        "rules": {
        "scope-enum": [2, "always", [
            "*",
            "eslint-config",
            "typescript-config",
            "screeb-template-lib",
            "sdk-browser",
            "example-browser",
            "sdk-react",
            "example-react",
            "sdk-angular",
            "example-angular",
            "sdk-vue",
            "example-vue",
            "sdk-svelte",
            "example-svelte",
            "sdk-maui",
            "example-maui",
            "sdk-flutter",
            "example-flutter",
            "sdk-kmp",
            "example-kmp",
            "sdk-react-native",
            "sdk-reactnative",
            "example-react-native",
            "example-reactnative",
            "example-android",
            "example-ios",
            "example-ionic",
            "example-expo"
        ]],
        "scope-empty": [2, "never"],
        "scope-min-length": [2, "always", 1],
    }
}










