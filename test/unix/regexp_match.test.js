const {regexpMatch} = require("pathassist/module/unix");
const assert = require("assert");
 
describe('regexpMatch method', function() {
  it('check if valid all path name', function() {
    assert.strictEqual(regexpMatch("*", "test"), true);
    assert.strictEqual(regexpMatch("test1", "test"), false);
    assert.strictEqual(regexpMatch("test1", "test1"), true);
     
  });
});
