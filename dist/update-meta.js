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
  function UpdateMetaDirective(){
    return {
      restrict: 'E',
      scope: {
        charset: '@',
        name: '@',
        content: '@',
        httpEquiv: '@',
        scheme: '@',
        title: '@'
      },
      link: function(scope, iElem, iAttrs){

        if(scope.name && scope.content){
          angular.element('meta[name=' + scope.name + ']').attr('content', scope.content);
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

        if(scope.title){
          angular.element('title').text(scope.title);
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
