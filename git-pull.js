var shell = require('shelljs'),
    path = require('path'),
    fs = require('fs');

const NEEDS_PULL=0, NEEDS_CLONE=1;

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

function gitFetch(localAbsPath){
    shell.cd(localAbsPath);
    var retCode = shell.exec('git fetch origin').code;
    if( retCode !== 0){
        shell.exit(1);
        throw(new Error('Error: Git fetch failed'));
    }
    return retCode;
}
function gitCheckout(localAbsPath, branch){
    shell.cd(localAbsPath);
    var retCode = shell.exec('git checkout ' +branch).code;
    if( retCode !== 0){
        shell.exit(1);
        throw(new Error('Error: Git checkout failed'));
    }
    return retCode;
}

function gitMerge(localAbsPath,branch){
    shell.cd(localAbsPath);
    var retCode = shell.exec('git merge ').code;
    if( retCode !== 0){
        shell.exit(1);
        throw(new Error('Error: Git merge failed'));
    }
    return retCode;
}

function gitPull(localAbsPath, branch){
    shell.cd(localAbsPath);
    var retCode = shell.exec('git pull ' + branch + ' --allow-unrelated-histories').code;
    if( retCode !== 0){
        shell.exit(1);
        throw(new Error('Error: Git pull failed'));
    }
    return retCode;
}

function gitInit(localAbsPath){
    shell.cd(localAbsPath);
    var retCode = shell.exec('git init').code;
    if( retCode !== 0){
        shell.exit(1);
        throw(new Error('Error: Git init failed'));
    }
    return retCode;
}

function gitRemote(localAbsPath, link){
    shell.cd(localAbsPath);
    var retCode = shell.exec('git remote add -f -t master -m master origin '+ link).code;
    if( retCode !== 0){
        shell.exit(1);
        throw(new Error('Error: Git remote failed'));
    }
    return retCode;

}

function gitClone(localAbsPath, branch, link){
    console.log("2");
    shell.cd(localAbsPath);
    var retCode = shell.exec('git clone '+link+ ' ' + branch).code;
    if( retCode !== 0){
        shell.exit(1);
        throw(new Error('Error: Git clone failed'));
    }
    return retCode;
}

module.exports = function(link, branch, local){
    var localAbsPath,
        gitEvent;

        localAbsPath = generateAbsPath(local);
        gitEvent = checkPath(localAbsPath);
        if(gitEvent == NEEDS_PULL){
            gitFetch(localAbsPath);
            gitCheckout(localAbsPath, branch);
            return gitMerge(localAbsPath);
            //return gitPull(localAbsPath, branch);
        }else if(gitEvent == NEEDS_CLONE){
            gitInit(localAbsPath);
            gitRemote(localAbsPath, link);
            gitFetch(localAbsPath);
            gitCheckout(localAbsPath, branch);
            return gitMerge(localAbsPath);
            //return gitPull(localAbsPath, branch);
        } else{
            throw(new Error('not a known git-event'));
        }

};