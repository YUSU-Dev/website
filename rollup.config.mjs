//@ts-check
import { globSync } from "glob";
import vue from "rollup-plugin-vue";
import replace from "@rollup/plugin-replace";
import { minify } from "rollup-plugin-esbuild";
import postcss from 'rollup-plugin-postcss';

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
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "production"),
      __VUE_OPTIONS_API__: "false",
      preventAssignment: true,
    }),
    vue({}),
    minify(),
    postcss({
      ...postcssConfig,
      extract: `components.css`,
    }),
  ],
};
