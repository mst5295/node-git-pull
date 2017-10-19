var pull = require('../git-pull.js'),
    shell = require('shelljs'),
    path = require('path'),
    link_rigth = "https://github.com/mst5295/testrepo_gitPull",
    link_false = "https://github.com/mst5295/testrepogitPull",
    branch = "",
    local= "./spec/test_environment/assists/testrepo_gitPull/",
    localAbsPath,
    local_pull = "./spec/test_environment/assists/testrepo_gitPull_pull",
    localAbsPath_pull,
    local_clone = "./spec/test_environment/assists/testrepo_gitPull_clone",
    localAbsPath_clone;

function pathIsAbsolute(local){
    var localAbsPath;
    if(path.isAbsolute(local)){
        localAbsPath = local;
    }else{
        localAbsPath = path.resolve(local);
    }
    return localAbsPath;
}

describe('Git Pull', function(){
    beforeAll(function(done){
        localAbsPath = pathIsAbsolute(local);
        localAbsPath_pull = pathIsAbsolute(local_pull);
        localAbsPath_clone = pathIsAbsolute(local_clone);
        shell.cp('-Rf',localAbsPath, localAbsPath_pull);
        done();
    })
    describe('clone a repo on Github',function(){
        it("returns a code = 0 on success", function(done){
            expect(pull(link_rigth, branch, localAbsPath_clone)).toBe(0);
            done();
        });
    })


    describe('pulls a repo on Github', function(){
        it("returns a code = 0 on success", function(done){
            expect(pull(link_rigth, branch, localAbsPath_pull)).toBe(0);
            done();
        });
    })
    afterAll(function(done){
        shell.cd(localAbsPath);
        shell.rm('-rf', localAbsPath_pull);
        shell.rm('-Rf', localAbsPath_clone);
        done();
    })
});