var pull = require('../git-pull.js'),
    shell = require('shelljs'),
    link_rigth = "https://github.com/mst5295/testrepo_gitPull",
    link_false = "https://github.com/mst5295/testrepogitPull",
    branch = "",
    local_pull = "./test_environment/assists/testrepo_gitPull_pull/",
    local_clone = "./test_environment/assists/testrepo_gitPull_clone/";

describe('Git Pull', function(){
    describe('clone a repo on Github',function(){
        it("returns a code = 0 on success", function(done){
            expect(pull(link_rigth, branch, local_clone)).toBe(0);
            done();
        });
    })


    describe('pulls a repo on Github', function(){
        it("returns a code = 0 on success", function(done){
            expect(pull(link_rigth, branch, local_pull)).toBe(0);
            done();
        });
        /*it("returns a code != 0" , function(done){
            expect(pull(link_false, branch, local)).isNot(0);
            done();
        });*/
    })
});