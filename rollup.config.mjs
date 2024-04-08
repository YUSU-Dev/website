//@ts-check
import { globSync } from "glob";
import vue from "rollup-plugin-vue";
import { minify } from "rollup-plugin-esbuild";

const entrypoints = globSync("*/*.component.js", {
    ignore: ["dist/**"],
});

/** @type {import("rollup").RollupOptions} */
export default {
    input: entrypoints,
    output: {
        dir: "dist",
        format: "es"
    },
    plugins: [vue({}), minify()],
    external: ["vue"],
};
