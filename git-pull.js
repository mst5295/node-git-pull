var shell = require('shelljs');

module.exports = function(link, local){
    if(shell.exec('git pull ' + link + ' '+ local).code !== 0){
        shell.echo('Error: Git pull failed');
        shell.exit(1);
    }
}