# Update meta tags in AngularJS

Dynamically update meta tags from within your markup in your AngularJS application.

[![Build Status](https://travis-ci.org/jvandemo/angular-update-meta.svg?branch=master)](https://travis-ci.org/jvandemo/angular-update-meta)

- lightweight (< 1KB)
- uses original meta syntax
- supports prerender.io for SEO purposes
- update your meta tags depending on the state your application is in
- no additional scripting required, works out-of-the-box!

## Usage

First install the module using bower:
 
```bash
$ bower install angular-update-meta
```

then add the `updateMeta` module to the dependencies of your AngularJS application module:

```javascript
angular.module('yourApp', ['updateMeta']);
```

Suppose you have the following markup in your template:

```xml
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Language" content="en" />
    <meta name="description" content="Some description" />
  </head>
  <body>
    ...
  </body>
</html>
```

Now you can use the following markup in your view(s):
 
```xml
<update-meta charset="some-other-charset"></update-meta>
<update-meta name="description" content="A difference description"></update-meta>
<update-meta http-equiv="Content-Language" content="es"></update-meta>
```

Only **existing** meta elements are updated.

If the meta element does not exist yet, it is **NOT** added, so make sure they exist in your original `head` element.

Whenever an `update-meta` element is processed, the original `meta` in the head is updated.

This allows you to dynamically set the `meta` element values with values from within your markup and child states.

> Prerender.io will then grab the updated values and store them in your page snapshots so they are optimized for SEO purposes.

## Contribute

To update the build in the `dist` directory:

```bash
$ gulp
```

To run the unit tests (for both concatenated and minified version):

```bash
$ gulp test
```

## Change log

### v1.2.1

- fix bower ignore files

### v1.2.0

- update bower ignore files

### v1.1.0

- add travis support
- update documentation

### v1.0.0

- refactor to support original markup
- add unit tests
- update documentation

### v0.1.0

- Initial version
