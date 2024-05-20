// @ts-check
/// <reference path="./globals.d.ts" />

import { defineCustomElement } from "vue";

export function register(name, component) {
    const el = defineCustomElement(component);
    customElements.define(`yorksu-${name}`, el);
}
