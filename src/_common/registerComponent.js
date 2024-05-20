import { defineCustomElement } from "https://unpkg.com/vue@3.4.21/dist/vue.runtime.esm-browser.prod.js";

export function register(name, component) {
    const el = defineCustomElement(component);
    customElements.define(`yorksu-${name}`, el);
}
