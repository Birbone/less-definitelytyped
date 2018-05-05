import * as vscode from 'vscode';

class MessagingService{
    info(message: string, displayTime: number = 3000) {
        vscode.window.setStatusBarMessage(message, displayTime);
    }

    error(message: string, displayTime: number = 10000) {
        vscode.window.setStatusBarMessage("Error: " + message, displayTime);
    }
}

const messagingService = new MessagingService();

export default messagingService;