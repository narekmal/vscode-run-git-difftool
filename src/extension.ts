'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function runShellCommand(command) {
    var exec = require('child_process').exec;

    exec(command, function(error, stdout, stderr) {
        // command output is in stdout
        console.log(JSON.stringify(error));
        console.log(JSON.stringify(stdout));
        console.log(JSON.stringify(stderr));
    });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vs-code-ext-hello-world" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.runGitDifftool', (param) => {
        
        if(param == undefined) {
            // If param is undefined, the command is run through command console, 
            // so run git difftool on the project root directory
            var projectDirName = vscode.workspace.rootPath;
            var cmd = 'cd /d ' + projectDirName + ' & ' + 'git difftool';
            runShellCommand(cmd);
            return;
        }

        // Command is run on a file through context menu, run git difftool on the file
        var path = require('path');
        var fileFullPath = param._resourceUri._path;

        // Remove leading / or \
        if (fileFullPath.charAt(0) === '/' || fileFullPath.charAt(0) === '\\')
            fileFullPath = fileFullPath.substr(1);

        var dirName = path.normalize(path.dirname(fileFullPath));
        var fileName = path.basename(fileFullPath);

        var cmd = 'cd /d ' + dirName + ' & ' + 'git difftool ' + fileName;

        runShellCommand(cmd);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}