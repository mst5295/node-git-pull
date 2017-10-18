var shell = require('shelljs');

module.exports = function(link, branch, local){
    shell.exec('cd ' + local);
    //+ ' --allow-unrelated-histories'
    if(shell.exec('git --work-tree='+ local +' pull '+ link + ' ' + branch ).code !== 0){
        shell.echo('Error: Git pull failed');
        shell.exit(1);
    }
}