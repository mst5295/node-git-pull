var shell = require('shelljs');

module.exports = function(link){
    if(shell.exec('git pull ' + link).code !== 0){
        shell.echo('Error: Git pull failed');
        shell.exit(1);
    }
}