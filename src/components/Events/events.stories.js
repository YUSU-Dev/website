import "./events.component.js";
import { userEvent } from "@storybook/test";
import { within as shadowWithin } from "shadow-dom-testing-library";

export default {
  title: "Components/Events",
  component: "events",
};

export const Default = {
  args: {},
};

export const EventFiltering = {
  play: async ({ canvasElement }) => {
    const canvas = shadowWithin(canvasElement);

    await userEvent.click(canvas.getByShadowTestId("activity-select"));
  },
};

export const ShortView = {
  args: {
    typeid: "19",
  },
};

export const GroupView = {
  args: {
    groupid: "23",
  },
};

export const GroupViewNoResults = {
  args: {
    groupid: "1",
    title: "Events",
    icon: true,
  },
};
