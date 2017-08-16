import { autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

@autoinject()
export class App {
  private router: Router;

  constructor(private element: Element) { }

  private configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia Mdc Pages Animator';
    config.map([
      { route: ['', 'index'],       moduleId: 'views/index',            nav: false,   title: '' },
      { route: 'detail-page1',      moduleId: 'views/detail/page1',     nav: false,   title: '' },
      { route: 'detail-page2',      moduleId: 'views/detail/page2',     nav: false,   title: '' },
      { route: 'detail-page3',      moduleId: 'views/detail/page3',     nav: false,   title: '' },
      { route: 'detail-page4',      moduleId: 'views/detail/page4',     nav: false,   title: '' },
      { route: 'fade-page1',        moduleId: 'views/fade/page1',       nav: false,   title: '' },
      { route: 'fade-page2',        moduleId: 'views/fade/page2',       nav: false,   title: '' },
      { route: 'fade-page3',        moduleId: 'views/fade/page3',       nav: false,   title: '' },
      { route: 'fade-page4',        moduleId: 'views/fade/page4',       nav: false,   title: '' },
      { route: 'tab-page1',         moduleId: 'views/tab/page1',        nav: false,   title: '' },
      { route: 'tab-page2',         moduleId: 'views/tab/page2',        nav: false,   title: '' },
      { route: 'tab-page3',         moduleId: 'views/tab/page3',        nav: false,   title: '' },
      { route: 'tab-page4',         moduleId: 'views/tab/page4',        nav: false,   title: '' }
    ]);
    this.router = router;
  }
}
