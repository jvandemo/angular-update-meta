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
        scheme: '@',
        property: '@'
      },
      link: function(scope, iElem, iAttrs){

        if(scope.name && scope.content){
          updateAttribute('meta[name="' + scope.name + '"]', 'content', scope.content);
          return;
        }

        if(scope.httpEquiv && scope.content){
          updateAttribute('meta[httpEquiv="' + scope.name + '"]', 'content', scope.content);
          return;
        }

        if(scope.property && scope.content){
          updateAttribute('meta[property="' + scope.name + '"]', 'content', scope.content);
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
  UpdateMetaDirective.$inject = [];

  // Export
  angular
    .module('updateMeta')
    .directive('updateMeta', UpdateMetaDirective);

})();
