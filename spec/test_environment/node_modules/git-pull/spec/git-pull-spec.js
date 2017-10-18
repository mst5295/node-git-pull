var pull = require('../git-pull.js'),
link_rigth = "git+https://github.com/mst5295/testrepo_gitPull.git",
link_false = "git+https://github.com/mst5295/testrepogitPull.git",
local = "./";

describe('Git Pull', function(){
describe('pulls a repo on Github', function(){
    it("returns a code = 0", function(done){
        expect(pull(link_rigth, local).code).toBe(0);
        done;
    });
    it("returns a code != 0" , function(done){
        expect(pull(link_false, local)).isNot(0);
        done;
    });
})
});