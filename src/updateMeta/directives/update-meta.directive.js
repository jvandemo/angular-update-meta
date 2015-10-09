(function(){

  /**
   * Update a meta tag dynamically
   *
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   *
   * @constructor
   */
  function UpdateMetaDirective($log){

    function updateAttribute(selector, attributeName, attributeValue){
      if(!document){
        return;
      }
      var el = document.querySelector(selector);
      if(el && el.setAttribute){
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
        property: '@'
      },
      link: function(scope, iElem, iAttrs){
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

        scope.$watch('content', function (newValue, oldValue) {
          if (typeof newValue !== 'undefined') {
            updateAttribute(selector, 'content', scope.content);
          }
        });

        scope.$watch('charset', function (newValue, oldValue) {
          if (typeof newValue !== 'undefined') {
            updateAttribute('meta[charset]', 'charset', scope.charset);
          }
        });
      }
    };
  }

  // Export
  angular
    .module('updateMeta')
    .directive('updateMeta', UpdateMetaDirective);
})();
