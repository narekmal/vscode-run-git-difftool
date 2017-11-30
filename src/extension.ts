'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

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
        // Enable command only when run from context menu
        if(param == undefined) {
            vscode.window.showWarningMessage('Command should be run from source control context menu');
            return
        }

        var path = require('path');
        var fileFullPath = param._resourceUri._path;

        // Remove leading / or \
        if (fileFullPath.charAt(0) === '/' || fileFullPath.charAt(0) === '\\')
            fileFullPath = fileFullPath.substr(1);

        var dirName = path.normalize(path.dirname(fileFullPath));
        var fileName = path.basename(fileFullPath);

        var exec = require('child_process').exec;
        var cmd = 'cd /d ' + dirName + ' & ' + 'git difftool ' + fileName;

        exec(cmd, function(error, stdout, stderr) {
            // command output is in stdout
            console.log(JSON.stringify(error));
            console.log(JSON.stringify(stdout));
            console.log(JSON.stringify(stderr));
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}