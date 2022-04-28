const {getRequireScriptFile} = require("path-assist/module/jsrequire");
const assert = require("assert");
 
describe('getRequireScriptFile method', function() {
  it('Check if module is existing', function() {
      console.log(getRequireScriptFile('structkit')['isValid'],true);
      console.log(getRequireScriptFile('none')['isValid'],false);
     
  });
});
