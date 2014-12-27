var shell = {
    execute: function(data) {
        data = JSON.parse(data);
        console.log('data mila', data.appName);
        var sys = require('sys')
        var exec = require('child_process').exec;

        function puts(error, stdout, stderr) {
            sys.puts(stdout)
        }

        var compileCommand = "sh ./compile.sh " + data.appFile.name + " " + data.path + " " + data.appWebsite + " " + data.size + " " + data.appName + " " + data.appEmail;
        exec(compileCommand, puts);
    }
};

module.exports = shell;
