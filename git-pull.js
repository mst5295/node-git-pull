var shell = require('shelljs'),
    path = require('path'),
    fs = require('fs');
const NEEDS_PULL=0, NEEDS_CLONE=1;
module.exports = function(link, branch, local){
    var localAbsPath,
        gitEvent;

        localAbsPath = generateAbsPath(local);
        gitEvent = checkPath(localAbsPath);
        if(gitEvent == NEEDS_PULL){
            gitPull(localAbsPath, branch);
        }else if(gitEvent == NEEDS_CLONE){
            gitClone(localAbsPath, branch, link);
        } else{
            throw(new Error('not a known git-event'));
        }


    function generateAbsPath(local){
        var localAbsPath;
        if(path.isAbsolute(local)){
            localAbsPath = local;
        }else{
            localAbsPath = path.resolve(local);
        }
        return localAbsPath;
    }
    function checkPath(localAbsPath){
        var localAbsPathGit = path.join(localAbsPath, '.git');
        if(!fs.existsSync(localAbsPath)){
            shell.mkdir(localAbsPath);
            return NEEDS_CLONE;
        }else if(!fs.statSync(localAbsPath).isDirectory()){
            throw(new Error ('Error: Absolute path is not a directory'));
        }else if(!fs.statSync(localAbsPathGit).isDirectory()){
            throw(new Error('Error: Absolute path is no git-repo'))
        }
        return NEEDS_PULL;
    }

    function gitPull(localAbsPath, branch){
        shell.cd(localAbsPath);
        if(shell.exec('git pull ' + branch + ' --allow-unrelated-histories').code !== 0){
            shell.exit(1);
            throw(new Error('Error: Git pull failed'));
        }
    }
    function gitClone(localAbsPath, branch, link){
        shell.cd(localAbsPath);
        if(shell.exec('git clone '+link+ ' ' + branch).code !== 0){
            shell.exit(1);
            throw(new Error('Error: Git clone failed'));
        }
    }

}