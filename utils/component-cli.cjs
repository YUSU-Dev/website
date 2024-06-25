const { Command } = require("commander");
const fs = require("node:fs");

const program = new Command();

program
  .name("component-cli")
  .description("A CLI for creating components")
  .version("0.0.1");

program.option("-c, --component <component>", "Component name");
program.option("-p, --page <page>", "Page name");

program.parse(process.argv);

const options = program.opts();

if (options.component) {
  console.log("Creating component:", options.component);

  const ComponentName = options.component.split("-").map((word) => {
    return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
  });
  const PascalCaseComponentName = ComponentName.join("");

  const storiesContent =
    "import './" +
    options.component +
    ".component.js';\n\nexport default {\n  title: 'Components/" +
    ComponentName +
    "',\n  component: '" +
    options.component +
    "',\n};\n\nexport const Default = {};\n";
  const componentContent =
    "import { register } from '../../_common/registerComponent';\nimport " +
    PascalCaseComponentName +
    " from './" +
    options.component +
    ".ce.vue';\n\n register('" +
    options.component +
    "'," +
    PascalCaseComponentName +
    ");\n";
  const vueContent =
    "<template>\n  <div>Hello, World!</div>\n</template>\n\n<script>\nexport default {\n  name: '" +
    PascalCaseComponentName +
    "',\n};\n</script>\n";

  fs.mkdirSync("./src/components/" + options.component);
  fs.writeFileSync(
    "./src/components/" +
      options.component +
      "/" +
      options.component +
      ".stories.js",
    storiesContent,
  );
  fs.writeFileSync(
    "./src/components/" +
      options.component +
      "/" +
      options.component +
      ".component.js",
    componentContent,
  );
  fs.writeFileSync(
    "./src/components/" +
      options.component +
      "/" +
      options.component +
      ".ce.vue",
    vueContent,
  );
  console.log("Component created successfully!");
} else if (options.page) {
  console.log("Creating page:", options.page);
  const ComponentName = options.page.split("-").map((word) => {
    return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
  });
  const PascalCaseComponentName = ComponentName.join("");

  const storiesContent =
    "import './" +
    options.page +
    ".component.js';\n\nexport default {\n  title: 'Pages/" +
    ComponentName +
    "',\n  component: '" +
    options.page +
    "',\n};\n\nexport const Default = {};\n";
  const componentContent =
    "import { register } from '../../_common/registerComponent';\nimport " +
    PascalCaseComponentName +
    " from './" +
    options.page +
    ".ce.vue';\n\n register('" +
    options.page +
    "'," +
    PascalCaseComponentName +
    ");\n";
  const vueContent =
    "<template>\n  <div>Hello, World!</div>\n</template>\n\n<script>\nexport default {\n  name: '" +
    PascalCaseComponentName +
    "',\n};\n</script>\n";
  fs.mkdirSync("./src/pages/" + options.page);
  fs.writeFileSync(
    "./src/pages/" + options.page + "/" + options.page + ".stories.js",
    storiesContent,
  );
  fs.writeFileSync(
    "./src/pages/" + options.page + "/" + options.page + ".component.js",
    componentContent,
  );
  fs.writeFileSync(
    "./src/pages/" + options.page + "/" + options.page + ".ce.vue",
    vueContent,
  );
  console.log("Page created successfully!");
} else {
  program.help();
}
