"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_pal_1 = require("aurelia-pal");
function configure(aurelia) {
    aurelia.globalResources(aurelia_pal_1.PLATFORM.moduleName('./aurelia-mdc-pages-animator'));
}
exports.configure = configure;
