import { injectAxe, checkA11y } from "axe-playwright";
import { getStoryContext } from "@storybook/test-runner";

export async function preVisit(page) {
  await injectAxe(page);
}
export async function postVisit(page, context) {
  // Get the entire context of a story, including parameters, args, argTypes, etc.
  const storyContext = await getStoryContext(page, context);

  // Do not run a11y tests on disabled stories.
  if (storyContext.parameters?.a11y?.disable) {
    return;
  }

  await checkA11y(page, "#storybook-root", {
    detailedReport: true,
    detailedReportOptions: {
      html: true,
    },
  });
}
