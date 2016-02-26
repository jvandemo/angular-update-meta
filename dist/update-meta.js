// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Gulp

// Modules
angular.module('updateMeta', []);

(function(){

  /**
   * Update a meta tag dynamically
   *
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   *
   * @constructor
   */
  function UpdateMetaDirective($log) {

    function updateAttribute(selector, attributeName, attributeValue) {
      if(!document) {
        $log.error('updateMeta: document is not available!');
        return;
      }

      if (!selector) {
        $log.error('updateMeta: Either of "name", "httpEquiv", "property" or "charset" must be provided!');
        return;
      }

      var el = document.querySelector(selector);
      if (el && el.setAttribute) {
        el.setAttribute(attributeName, attributeValue);
      }
    }

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
            updateAttribute(selector, 'content', scope.content);
          }
        });

        // watch the charset parameter and set it as needed
        scope.$watch('charset', function (newValue, oldValue) {
          if (typeof newValue !== 'undefined') {
            updateAttribute('meta[charset]', 'charset', scope.charset);
          }
        });
      }
    };
  }

  // Inject dependencies
  UpdateMetaDirective.$inject = ['$log'];

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
