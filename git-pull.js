var shell = require('shelljs');

module.exports = function(link, branch, local){
    if(shell.exec('git --work-tree='+ local +' pull '+ link + ' ' + branch + ' --allow-unrelated-histories').code !== 0){
        shell.echo('Error: Git pull failed');
        shell.exit(1);
    }
}