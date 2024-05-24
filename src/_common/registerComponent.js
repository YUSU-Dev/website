import { defineCustomElement } from "vue"; // gets resolved in rollup.config.mjs

export function register(name, component) {
  const el = defineCustomElement(component);
  customElements.define(`yorksu-${name}`, el);

  const componentShadowDom = document.querySelector(component)?.shadowRoot;
  if (componentShadowDom) {
    const styleLink = document.createElement("link");
    styleLink.setAttribute("rel", "stylesheet");
    styleLink.setAttribute(
      "href",
      "https://assets.yorksu.org/components/components.css",
    );
    componentShadowDom.appendChild(styleLink);
  }
}
