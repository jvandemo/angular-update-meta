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
        $log.debug('updateMeta - set attribute ' + attributeName + ' of ' + selector + ' to ' + attributeValue);
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

        if(scope.name && scope.content){
          updateAttribute('meta[name="' + scope.name + '"]', 'content', scope.content);
          return;
        }

        if(scope.httpEquiv && scope.content){
          updateAttribute('meta[http-equiv="' + scope.httpEquiv + '"]', 'content', scope.content);
          return;
        }

        if(scope.property && scope.content){
          updateAttribute('meta[property="' + scope.property + '"]', 'content', scope.content);
          return;
        }

        if(scope.charset){
          updateAttribute('meta[charset]', 'charset', scope.charset);
          return;
        }

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
