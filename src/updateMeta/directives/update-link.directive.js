(function(){

  /**
   * Update a link tag dynamically
   *
   * @constructor
   */
  function UpdateLinkDirective($log, updateAttribute) {

    var supportedAttributes =
      [
        'href',
        'charset',
        'crossorigin',
        'hreflang',
        'integrity',
        'media',
        'methods',
        'referrerpolicy',
        'sizes',
        'target',
        'title',
        'type'
      ];

      var queryAttributes = ['id', 'rel'];

      function buildAttributeFilter(scope, attribute) {
        return '[' + attribute + '="' + scope[attribute] + '"]';
      };

      function buildQuery(scope, attributes) {
        return attributes.filter(function(attribute) {
          return scope[attribute];
        }).map(function(attribute) {
          return buildAttributeFilter(scope, attribute);
        }).join('');
      };

    return {
      restrict: 'E',
      scope: {
        rel: '@',
        href: '@',
        id: '@?',
        charset: '@?',
        crossorigin: '@?',
        hreflang: '@?',
        integrity: '@?',
        media: '@?',
        methods: '@?',
        referrerpolicy: '@?',
        sizes: '@?',
        target: '@?',
        title: '@?',
        type: '@?'
      },
      link: function(scope, iElem, iAttrs) {

        var selector = 'link' + buildQuery(scope, queryAttributes);

        // Watch only desired attributes
        supportedAttributes.filter(function(attribute) {
          return scope[attribute];
        }).forEach(function(attribute) {
          scope.$watch(attribute, function(newValue, oldValue) {
            if (typeof newValue !== 'undefined') {
              updateAttribute.update(selector, attribute, scope[attribute])
            }
          });
        });
      }
    };
  }

  // Inject dependencies
  UpdateLinkDirective.$inject = ['$log', 'updateAttribute'];

  // Export
  angular
    .module('updateMeta')
    .directive('updateLink', UpdateLinkDirective);
})();
