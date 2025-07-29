//@ts-check
import { globSync } from "glob";
import vue from "@vitejs/plugin-vue";
import replace from "@rollup/plugin-replace";
import { minify } from "rollup-plugin-esbuild";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import postcssConfig from "./postcss.config.mjs";
import path from "node:path";

const entrypoints = globSync("*/**/**/*.component.js", {
  ignore: [
    "dist/**",
    "src/components/elections-nominate/elections-nominate.component.js",
  ],
});

function inlineCSSPlugin() {
  return {
    name: "inline-css",
    resolveId(source, importer) {
      if (source.includes("?inline")) {
        // return source.replace('?inline', '');
        const importerDir = path.dirname(importer);
        const cssPath = source.split("?")[0]; // Remove ?inline part
        return path.resolve(importerDir, cssPath);
      }
      return null;
    },
    load() {
      return null;
    },
  };
}

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
            "https://unpkg.com/vue@3.5.18/dist/vue.runtime.esm-browser.prod.js",
        },
      ],
    }),
    nodeResolve(),
    vue({}),
    minify(),
    inlineCSSPlugin(),
    postcss({
      ...postcssConfig,
    }),
  ],
};
