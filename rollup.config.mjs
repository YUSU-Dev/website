//@ts-check
import { globSync } from "glob";
import vue from "rollup-plugin-vue";
import { rollupImportMapPlugin as importMap } from "rollup-plugin-import-map";
import replace from "@rollup/plugin-replace";
import { minify } from "rollup-plugin-esbuild";
import postcss from 'rollup-plugin-postcss';

const vueVersion = "3.4.21";

const entrypoints = globSync("*/**/*.component.js", {
  ignore: ["dist/**"],
});

/** @type {import("rollup").RollupOptions} */
export default {
  input: entrypoints,
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      __VUE_OPTIONS_API__: "false",
      preventAssignment: true,
    }),
    importMap([
      {
        imports: {
          vue: `https://unpkg.com/vue@${vueVersion}/dist/vue.runtime.esm-browser.prod.js`,
          axios: "https://unpkg.com/axios@1.6.8/dist/esm/axios.min.js",
        },
      },
    ]),
    vue({}),
    minify(),
    postcss(),
  ],
};
