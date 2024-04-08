// @ts-check
/// <reference path="./globals.d.ts" />

import Vue from "vue";

window._vueApp ||= Vue.createApp({});

export function register(component) {
    window._vueApp.component(component);
}

document.addEventListener("DOMContentLoaded", function() {
    if (window._didMountVue) {
        return;
    }
    window._vueApp.mount("#main");
    window._didMountVue = true;
});
