import { Aurelia } from 'aurelia-framework';
import { ConfigBuilder } from 'aurelia-mdc-bridge';
import environment from './environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-animator-css')
    .plugin('aurelia-mdc-bridge', (b: ConfigBuilder) => b
      .useToolbars()
      .useButtons()
    )
    .feature('resources')
    .feature('./aurelia-mdc-pages-animator/index');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  aurelia.start().then(() => aurelia.setRoot());
}
