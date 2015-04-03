# Update meta tags in AngularJS

Dynamically update meta tags for SEO purposes in your AngularJS application. 

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
    <title>Cool Title</title>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Language" content="en" />
    <meta name="description" content="Application wide description" />
  </head>
  <body>
    ...
  </body>
</html>
```

Now you can use the following markup in your view(s):
 
```xml
<update-meta title="Newer Cooler Title"></update-meta>
<update-meta charset="ISO-8859-1"></update-meta>
<update-meta http-equiv="Content-Language" content="es"></update-meta>
<update-meta name="description" content="A page specific description"></update-meta>
```

So the head is updated to:

```xml
<html>
  <head>
    <title>Newer Cooler Title</title>
    <meta charset="ISO-8859-1" />
    <meta http-equiv="Content-Language" content="es" />
    <meta name="description" content="A page specific description" />
  </head>
  <body>
    ...
  </body>
</html>
```

Only **existing** meta elements are updated.

If the meta element does not exist yet, it is **NOT** added, so make sure they exist in your original `head` element.

Whenever an `update-meta` element is processed, the original `meta` in the head is updated with the new value.

This allows you to dynamically set the `meta` element values with values from within your markup and child states.

### Prerender.io

Prerender.io will grab the updated values and store them in your page snapshots so they are optimized for SEO purposes.

This allows you to conveniently update the `meta` elements for each individual page in your AngularJS single page application and store them correctly in your Prerender page snapshots.

You can preview the prerender output by using the `_escaped_fragment_=` parameter as described [in the prerender.io documentation](https://prerender.io/documentation).

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
