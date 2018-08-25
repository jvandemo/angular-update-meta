(function () {
  function UpdateScriptDirective($log, updateScriptContent) {
    return {
      restrict: 'E',
      scope: {
        type: '@',
        content: '='
      },
      link: function (scope, iElem, iAttrs) {
          var selector = 'script[type="' + scope.type + '"]';
          scope.$watch('content', function (newValue, oldValue) {
            if (typeof newValue !== 'undefined') {
              updateScriptContent.update(selector, scope.content);
            }
          });
      }
    };
  }

  // Inject dependencies
  UpdateScriptDirective.$inject = ['$log', 'updateScriptContent'];

  // Export
  angular
    .module('updateMeta')
    .directive('updateScript', UpdateScriptDirective);
})();
