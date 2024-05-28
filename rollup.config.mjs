//@ts-check
import { globSync } from "glob";
import vue from "@vitejs/plugin-vue";
import replace from "@rollup/plugin-replace";
import { minify } from "rollup-plugin-esbuild";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";

import postcssConfig from "./postcss.config.mjs";

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
  external: [/^https:\/\//],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV ?? "production",
      ),
      __VUE_OPTIONS_API__: "false",
      preventAssignment: true,
    }),
    alias({
      entries: [
        {
          find: /^vue$/,
          replacement:
            "https://unpkg.com/vue@3.4.21/dist/vue.runtime.esm-browser.prod.js",
        },
      ],
    }),
    vue({}),
    minify(),
    postcss({
      ...postcssConfig,
    }),
  ],
};
