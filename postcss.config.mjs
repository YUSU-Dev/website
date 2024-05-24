import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

import tailwindConfig from "./tailwind.config.js";

export default {
  plugins: [tailwindcss(tailwindConfig), autoprefixer, cssnano],
};
