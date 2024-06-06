import { defineCustomElement } from "vue"; // gets resolved in rollup.config.mjs
import * as MainCSS from "../main.css?inline";

export function register(name, component, forceExcludeMainCSS = false) {
  if (!forceExcludeMainCSS) {
    component.styles = [...(component.styles ?? []), MainCSS.default];
  }
  const el = defineCustomElement(component);
  customElements.define(`yorksu-${name}`, el);
}
