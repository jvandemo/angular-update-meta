# Update meta tags in AngularJS

Dynamically update meta tags and document title for SEO purposes in your AngularJS application. 

[![Build Status](https://travis-ci.org/jvandemo/angular-update-meta.svg?branch=master)](https://travis-ci.org/jvandemo/angular-update-meta)

- lightweight (< 1KB)
- uses original meta syntax
- supports prerender.io for SEO purposes
- supports [Open Graph protocol](http://ogp.me/) meta elements
- update your document title dynamically
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
    <title>Website title</title>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Language" content="en" />
    <meta name="description" content="Application wide description" />
    <meta property="og:title" content="The Rock" />
  </head>
  <body>
    ...
  </body>
</html>
```

Now you can use the following markup in your view(s):
 
```xml
<update-meta title="A new title"></update-meta>
<update-meta charset="ISO-8859-1"></update-meta>
<update-meta http-equiv="Content-Language" content="es"></update-meta>
<update-meta name="description" content="A page specific description"></update-meta>
<update-meta property="og:title" content="Minions"></update-meta>
```

So the head is updated to:

```xml
<html>
  <head>
    <title>A new title</title>
    <meta charset="ISO-8859-1" />
    <meta http-equiv="Content-Language" content="es" />
    <meta name="description" content="A page specific description" />
    <meta property="og:title" content="Minions" />
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

### Expressions

Dynamic AngularJS expressions are supported too:

```xml
<update-meta property="og:title" content="{{ title }}"></update-meta>
```

In the example above, the `og:title` is automatically updated whenever `title` changes.

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

### v1.7.1

- added new exemple
- removed update-title directive use update-meta insted
- improved code redability

### v1.7.0

- added update-title directive
- updated documentation
- updated example

### v1.6.0

- added dynamic tag support
- updated documentation
- updated example

### v1.5.1

- fixed issue with `http-equiv`
- updated documentation
- updated example

### v1.5.0

- added support for meta `property` elements to support the [Open Graph protocol](http://ogp.me/)

### v1.4.0

- switch to native `element.querySelector()` method to fix #4

### v1.3.0

- added double quotes to support #2

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
