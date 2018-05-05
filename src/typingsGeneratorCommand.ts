import * as path from "path";
import * as vscode from 'vscode';
import lessParser from './lessParser';
import typingsFormatter from './typingsFormatter';
import typingsOutput from './typingsOutput';
import messagingService from './messagingService';

class TypingsGeneratorCommand {
    public async execute(document: vscode.TextDocument) {
        let classNames;
        try {
            classNames = await lessParser
                .getUsedClasses(document.getText(), document.fileName);
        } catch (error) {
            this.handleLessParsingError(error, document);
            return;
        }
        const typings = typingsFormatter.format(classNames);
        const typingsFileName = document.fileName + ".d.ts";
        try {
            await typingsOutput.file(typingsFileName)
                .save(typings); 
        } catch (error) {
            this.handleSavingFileError(error);
        }
        messagingService.info(`Typings have been generated for ${path.basename(document.fileName)}`);
    }

    private handleLessParsingError(error: any, document: vscode.TextDocument) {
        messagingService.error(`An error occured while parsing less file ${path.basename(document.fileName)}. ${error.message}`)
    }

    private handleSavingFileError(error: any) {
        if (error.code && error.path) {
            switch (error.code)
            {
                case 'EACCES':
                case 'ENOENT':
                    messagingService.error(`Cannot open file '${error.path}'`);
            }
        }
    }
}

const typingsGeneratorCommand = new TypingsGeneratorCommand();

export default typingsGeneratorCommand;