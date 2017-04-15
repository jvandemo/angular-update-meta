(function(){

  /**
  * Service to update attribute
  *
  * @constructor
  */
  function UpdateAttributeService($log) {
    function update(selector, attributeName, attributeValue) {
      if(!document) {
        $log.error('updateMeta: document is not available!');
        return;
      }

      if(!selector) {
        $log.error('updateMeta: please provide a selector');
        return;
      }

      var el = document.querySelector(selector);
      if (el && el.setAttribute) {
        el.setAttribute(attributeName, attributeValue);
      }
    }

    return {
      update: update
    }
  }

  // Inject dependencies
  UpdateAttributeService.$inject = ['$log'];

  angular
    .module('updateMeta')
    .factory('updateAttribute', UpdateAttributeService);
})();
