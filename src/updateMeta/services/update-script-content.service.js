(function () {

  /**
   * Service to update script content
   *
   * @constructor
   */
    function UpdateScriptContentService($log, $sce, $filter) {
    return {
      update: function (selector, content) {
          if (!document) {
              $log.error('updateMeta: document is not available!');
              return;
          }

          if (!selector) {
              $log.error('updateMeta: please provide a selector');
              return;
          }

          var element = document.querySelector(selector);
          if(element){
              var trustedContent = $sce.trustAsHtml($filter('json')(content));
              element.outerHTML = '<script type="application/ld+json">' + trustedContent + '</script>';
          }
      }
    };
  }

  // Inject dependencies
    UpdateScriptContentService.$inject = ['$log', '$sce', '$filter'];

  angular
    .module('updateMeta')
    .factory('updateScriptContent', UpdateScriptContentService);
})();
