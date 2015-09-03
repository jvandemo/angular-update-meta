(function(){

  /**
   * Update a meta tag dynamically
   *
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   *
   * @constructor
   */
  function UpdateMetaDirective(){

    function updateAttribute(selector, attributeName, attributeValue){
      if(!document){
        return;
      }
      var el = document.querySelector(selector);
      console.log(el);
      if(el && el.setAttribute){
        console.log('Setting attribute ' + attributeName + ' to ' + attributeValue);
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
        scheme: '@'
      },
      link: function(scope, iElem, iAttrs){

        if(scope.name && scope.content){
          updateAttribute('meta[name="' + scope.name + '"]', 'content', scope.content);
          //angular.element('meta[name="' + scope.name + '"]').attr('content', scope.content);
          return;
        }

        if(scope.httpEquiv && scope.content){
          updateAttribute('meta[httpEquiv=' + scope.name + ']', 'content', scope.content);
          // angular.element('meta[httpEquiv=' + scope.name + ']').attr('content', scope.content);
          return;
        }

        if(scope.charset){
          updateAttribute('meta[charset]', 'charset', scope.charset);
          // angular.element('meta[charset]').attr('charset', scope.charset);
          return;
        }

      }
    };
  }

  // Inject dependencies
  UpdateMetaDirective.$inject = [];

  // Export
  angular
    .module('updateMeta')
    .directive('updateMeta', UpdateMetaDirective);

})();
