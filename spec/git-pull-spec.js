var pull = require('../git-pull.js'),
link_rigth = "https://github.com/mst5295/testrepo_gitPull.git",
link_false = "https://github.com/mst5295/testrepogitPull.git",
branch = "",
local = "../testrepo_gitPull/";

describe('Git Pull', function(){
describe('pulls a repo on Github', function(){
    it("returns a code = 0", function(done){
        expect(pull(link_rigth, branch, local).code).toBe(0);
        done;
    });
    it("returns a code != 0" , function(done){
        expect(pull(link_false, branch, local).code).isNot(0);
        done;
    });
})
});