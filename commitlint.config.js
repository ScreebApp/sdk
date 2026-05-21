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
            "example-vue"
        ]],
        "scope-empty": [2, "never"],
        "scope-min-length": [2, "always", 1],
    }
}










