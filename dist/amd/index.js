define(["require", "exports", "aurelia-pal"], function (require, exports, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.globalResources(aurelia_pal_1.PLATFORM.moduleName('./aurelia-mdc-pages-animator'));
    }
    exports.configure = configure;
});
