(function(){

  /**
   * Update a meta tag dynamically
   *
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   *
   * @constructor
   */
  function UpdateMetaDirective(){
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
          angular.element('meta[name="' + scope.name + '"]').attr('content', scope.content);
          return;
        }

        if(scope.httpEquiv && scope.content){
          angular.element('meta[httpEquiv=' + scope.name + ']').attr('content', scope.content);
          return;
        }

        if(scope.charset){
          angular.element('meta[charset]').attr('charset', scope.charset);
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
