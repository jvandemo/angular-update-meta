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
