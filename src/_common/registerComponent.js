import { defineCustomElement } from "vue"; // gets resolved in rollup.config.mjs

export function register(name, component) {
  const el = defineCustomElement(component);
  customElements.define(`yorksu-${name}`, el);

  document.querySelectorAll(component).forEach((element) => {
    if (!element.shadowRoot) return;
    const styleLink = document.createElement("link");
    styleLink.setAttribute("rel", "stylesheet");
    styleLink.setAttribute(
      "href",
      "https://assets.yorksu.org/components/components.css",
    );
    element.shadowRoot.appendChild(styleLink);
  });
}
