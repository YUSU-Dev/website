import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import globals from "globals";


export default [
    {
        ...js.configs.recommended,
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            }
        },
        ignores: [
            "dist/**",
            ".dev/**",
            "*.config.js"
        ]
    },
    ...vue.configs['flat/essential'],
    {
        rules: {
            "vue/multi-word-component-names": 0, //  we use web components
            "vue/html-indent": 0, // Prettier
        }
    }
];
