// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Gulp

// Modules
angular.module('updateMeta', []);

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

(function(){

  /**
   * Update a meta tag dynamically
   *
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   *
   * @constructor
   */
  function UpdateMetaDirective($log, updateAttribute) {

    return {
      restrict: 'E',
      scope: {
        charset: '@',
        name: '@',
        content: '@',
        httpEquiv: '@',
        scheme: '@',
        property: '@',
        itemprop: '@'
      },
      link: function(scope, iElem, iAttrs) {
        var selector;

        if(scope.name) {
          selector = 'meta[name="' + scope.name + '"]';
        }

        if(scope.httpEquiv) {
          selector = 'meta[http-equiv="' + scope.httpEquiv + '"]';
        }

        if(scope.property) {
          selector = 'meta[property="' + scope.property + '"]';
        }

        if(scope.itemprop) {
          selector = 'meta[itemprop="' + scope.itemprop + '"]';
        }

        // watch the content parameter and set the changing value as needed
        scope.$watch('content', function (newValue, oldValue) {
          if (typeof newValue !== 'undefined') {
            updateAttribute.update(selector, 'content', scope.content);
          }
        });

        // watch the charset parameter and set it as needed
        scope.$watch('charset', function (newValue, oldValue) {
          if (typeof newValue !== 'undefined') {
            updateAttribute.update('meta[charset]', 'charset', scope.charset);
          }
        });
      }
    };
  }

  // Inject dependencies
  UpdateMetaDirective.$inject = ['$log', 'updateAttribute'];

  // Export
  angular
    .module('updateMeta')
    .directive('updateMeta', UpdateMetaDirective);
})();

(function(){

  /**
   * Update a title dynamically
   *
   * @constructor
   */
  function UpdateTitleDirective($log) {

    return {
      restrict: 'E',
      scope: {
        title: '@'
      },
      link: function(scope, iElem, iAttrs) {

        // watch the value and set as needed
        // use document instead of $document as $document doesn't work here
        scope.$watch('title', function (newValue, oldValue) {
          if (typeof newValue !== 'undefined') {
            if(document){
              document.title = newValue;
            }
          }
        });
      }
    };
  }

  // Inject dependencies
  UpdateTitleDirective.$inject = ['$log'];

  // Export
  angular
    .module('updateMeta')
    .directive('updateTitle', UpdateTitleDirective);
})();

(function(){

  /**
  * Service to update attribute
  *
  * @constructor
  */
  function UpdateAttributeService($log) {
    function update(selector, attributeName, attributeValue) {
      if(!document) {
        $log.error('updateMeta: document is not available!');
        return;
      }

      if(!selector) {
        $log.error('updateMeta: please provide a selector');
        return;
      }

      var el = document.querySelector(selector);
      if (el && el.setAttribute) {
        el.setAttribute(attributeName, attributeValue);
      }
    }

    return {
      update: update
    }
  }

  // Inject dependencies
  UpdateAttributeService.$inject = ['$log'];

  angular
    .module('updateMeta')
    .factory('updateAttribute', UpdateAttributeService);
})();
