import { PLATFORM } from 'aurelia-pal';

export function configure(aurelia) {
  aurelia.globalResources(PLATFORM.moduleName('./aurelia-mdc-pages-animator'));
}
