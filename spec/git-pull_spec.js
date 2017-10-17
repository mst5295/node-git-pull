var pull = require('../git-pull.js'),
    link_rigth = "",
    link_false = "",
    local = "./";

describe('Git Pull', function(){
    describe('pulls a repo on Github', function(){
        it("returns a code = 0", function(done){
            expect(pull(link_rigth, local)).toBe(0);
            done;
        });
        it("returns a code != 0" , function(done){
            expect(pull(link_false, local)).isNot(0);
            done;
        });
    })
});