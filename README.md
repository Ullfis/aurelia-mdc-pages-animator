# aurelia-mdc-pages-animator

[Project/demo page](https://ullfis.github.io/aurelia-mdc-pages-animator)

_This plugin is in active development and your feedback is welcome_

### What is this?

Simple attribute to use on `router-view` to add `back` and `forward` classes during navigation in [Aurelia](http://aurelia.io) projects.

The attribute will store a history and determine if router has navigated forward or back to previous route.

It will also listen to DOM events raised by aurelia-animator-css and hide scrollbars during animation. After animation the event `on-animation-done` is raised.

Included is 3 animation classes to use for page transactions.

## Install

aurelia-cli

```bash
au install aurelia-mdc-pages-animator
```

main.js:

```js
export function configure(aurelia) {
  ...
  aurelia.use.plugin('aurelia-mdc-pages-animator');
  ...
}
```

also remember to install and configure `aurelia-animator-css`

app.html:

```html
...
<require from="aurelia-mdc-pages-animator/pages.css"></require>
...
<router-view 
  swap-order="with"
  aurelia-mdc-pages-animator
  on-animation-done.delegate="onAnimationDone()">
</router-view>
...
```

somewhere (to prevent transparent page animation):

```css
.pages {
  background: #fff;
}
```

Decorate your pages with animation classes:

```html
<template>
  <div class="pages pages-detail au-animate">
    ...
  </div>
</template>
```

or:

```html
<template>
  <div class="pages pages-fade au-animate">
    ...
  </div>
</template>
```

or:

```html
<template>
  <div class="pages pages-tab au-animate">
    ...
  </div>
</template>
```

To stop `enter` animation just add `pages-first` class:

```html
<template>
  <div class="pages pages-first pages-detail au-animate">
    ...
  </div>
</template>
```

Default *forward* class is `go-forward`. Default *back* class is `go-back`.


## Build from source

Install dependencies:

```bash
npm install
```

Build and watch

```bash
npm start
```

Lint

```bash
npm run lint
```

Build dist (production)

```bash
npm run build
```

Build docs (production)

```bash
npm run docs
```

Build, add changelog, git add and tag (production)

```bash
npm run release
```

## Tests

Visual and console. No tests has been created yet. Contribute?

# Pull Requests

Yes, please!
