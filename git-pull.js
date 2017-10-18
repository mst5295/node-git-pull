var shell = require('shelljs');

module.exports = function(link, branch){
    if(shell.exec('git pull ' + link + ' ' + branch).code !== 0){
        shell.echo('Error: Git pull failed');
        shell.exit(1);
    }
}