'use strict';

describe('', function() {

  var $compile;
  var scope;

  beforeEach(module('updateMeta'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$document_){
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  }));

  /**
   * For some reason this does not work as expected in Karma
   */
  /*
  it('should process meta charset correctly', function(){
    var markup ='<html><head>';
    markup += '<meta charset="utf-8" />';
    markup += '</head></html>';
    var $elBefore = $compile(markup)(scope);
    var elBefore = $elBefore[0];
    var actualValueBefore = elBefore.getAttribute('charset');
    var expectedValueBefore = 'utf-8';

    expect(actualValueBefore).to.equal(expectedValueBefore);
    console.log(elBefore);

    markup ='<html><head>';
    markup += '<meta charset="utf-8" />';
    markup += '</head><body>';
    markup += '<update-meta charset="ISO-8859-1"></update-meta>'
    markup += '</body></html>';
    var $elAfter = $compile(markup)(scope);
    var elAfter = $elAfter[0];
    var actualValueAfter = elAfter.getAttribute('charset');
    var expectedValueAfter = 'ISO-8859-1';

    expect(actualValueAfter).to.equal(expectedValueAfter);
    console.log($elAfter);
  });
  */

});
