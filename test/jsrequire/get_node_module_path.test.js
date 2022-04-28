const {getNodeModulePath} = require("path-assist/module/jsrequire");
const assert = require("assert");
 
describe('getNodeModulePath method', function() {
  it('Check if module is existing', function() {
      console.log(getNodeModulePath('structkit','structkit')['isValid'],true);
      console.log(getNodeModulePath('none','structkit')['isValid'],false);
     
  });
});
