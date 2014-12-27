'use strict';

describe('', function() {

  var $compile;
  var scope;
  var markup = '<update-meta http-equiv="Content-Type" content="test"></update-meta>';

  beforeEach(module('updateMeta'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  }));

  // This does not seem to work in the context of the
  // Karma test runner.
  // We should figure out a way to test this.
  // Works fine in real browser though.

  /*
  it('should handle charset correctly', function(){
    var el = $compile(markup)(scope);
    var metas = document.getElementsByTagName('meta');
    angular.forEach(metas, function(meta){
      if(meta.getAttribute('http-equiv') === "Content-Type"){
        expect(meta.getAttribute('content')).to.equal('test');
      }
    });
  });
  */

});
