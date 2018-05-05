'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import typingsGeneratorCommand from './typingsGeneratorCommand';

const LESS_EXT = ".less";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // compile less on save when file is dirty
    const didSaveEvent = vscode.workspace.onDidSaveTextDocument(document =>
    {
        if (document.fileName.endsWith(LESS_EXT))
        {
            typingsGeneratorCommand.execute(document);
        }
    });

    // compile less on save when file is clean (clean saves don't trigger onDidSaveTextDocument, so use this as fallback)
    const willSaveEvent = vscode.workspace.onWillSaveTextDocument(e =>
    {
        if (e.document.fileName.endsWith(LESS_EXT) && !e.document.isDirty)
        {
            typingsGeneratorCommand.execute(e.document);
        }
    });

    context.subscriptions.push(willSaveEvent);
    context.subscriptions.push(didSaveEvent);
}

// this method is called when your extension is deactivated
export function deactivate() {
}