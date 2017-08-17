# aurelia-mdc-pages-animator

[Project/demo page](https://ullfis.github.io/aurelia-mdc-pages-animator)

_This plugin is in active development and your feedback is welcome_

## What is this?

Simple attribute to use on `router-view` to add `back` and `forward` classes during navigation in [Aurelia](http://aurelia.io) projects.

The attribute will store a history and determine if router has navigated forward or back to previous route.

It will also listen to DOM events raised by [aurelia-animator-css](https://github.com/aurelia/animator-css) and hide scrollbars during animation. After animation the event `on-animation-done` is raised.

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

also remember to install and configure [aurelia-animator-css](https://github.com/aurelia/animator-css)

```js
  ...
  aurelia.use.plugin('aurelia-animator-css');
```

> **Note!** Before `aurelia-animator-css` **>** version `1.0.2` is out, ripple effect will destroy animations. Until then a version is available here: `npm install ullfis/animator-css`

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

## Classes

Decorate your pages with animation classes.

It`s included 3 animation classes:

- `pages-detail`
- `pages-fade`
- `pages-tab`

`pages-detail`:

```html
<template>
  <div class="pages pages-detail au-animate">
    ...
  </div>
</template>
```


`pages-fade`:

```html
<template>
  <div class="pages pages-fade au-animate">
    ...
  </div>
</template>
```

`pages-tab`:

```html
<template>
  <div class="pages pages-tab au-animate">
    ...
  </div>
</template>
```

## Stop animation when enter first page

To stop `enter` animation just add `pages-first` class:

```html
<template>
  <div class="pages pages-first pages-detail au-animate">
    ...
  </div>
</template>
```

## Transparent pages during animation?

You need a background color on pages class. Put this somewhere:

```css
.pages {
  background: #fff;

  // other optional stylings.
  padding-left: 0;
  padding-right: 0;
}
```

Default *forward* class is `go-forward`. Default *back* class is `go-back`.

## SASS

```css
@import "aurelia-mdc-pages-animator/pages.scss";
```

You need these projects installed:

```bash
npm install @material/elevation
npm install @material/animation
```

You can change some variables before importing:

```css
// elevation is for detail and tab animations
$elevation--enter: 1;
$elevation--leave: 0;

$tablet-width: 480px;
$desktop-width: 840px;          

$animate-speed-detail--phone: 0.375s;
$animate-speed-detail--tablet: 0.487s;
$animate-speed-detail--desktop: 0.15s;

$animate-speed-fade--phone: 0.487s;
$animate-speed-fade--tablet: 0.599s;
$animate-speed-fade--desktop: 0.375s;

$animate-speed-tab--phone: 0.375s;
$animate-speed-tab--tablet: 0.487s;
$animate-speed-tab--desktop: 0.15s;

@import "aurelia-mdc-pages-animator/pages.scss";
```

Mixins for different screen size:

```css
section {
  /* PHONE */
  padding: 2px;
  ...
  
  /* TABLET */
  @include tablet {
    padding: 8px;
    ...
  }
  
  /* DESKTOP */
  @include desktop {
    padding: 16px;
    ...
  }
}
```

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
