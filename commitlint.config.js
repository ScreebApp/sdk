module.exports = {
    "extends": ['@commitlint/config-conventional'],
        "rules": {
        "scope-enum": [2, "always", [
            "*",
            "screeb-eslint-config",
            "screeb-typescript-config",
            "screeb-template-lib",
            "screeb-sdk-browser",
            "screeb-sdk-browser-example"
        ]],
        "scope-empty": [2, "never"],
        "scope-min-length": [2, "always", 1],
    }
}










