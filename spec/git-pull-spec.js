var pull = require('../git-pull.js'),
link_rigth = "https://github.com/mst5295/testrepo_gitPull.git",
link_false = "https://github.com/mst5295/testrepogitPull.git",
branch = "";

describe('Git Pull', function(){
describe('pulls a repo on Github', function(){
    it("returns a code = 0", function(done){
        expect(pull(link_rigth, branch).code).toBe(0);
        done;
    });
    it("returns a code != 0" , function(done){
        expect(pull(link_false, branch)).isNot(0);
        done;
    });
})
});