const vscode = require('vscode');
const axios = require("axios");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	
	console.log('Congratulations, your extension "bigo" is now active!');

	
	let disposable = vscode.commands.registerCommand('bigo.BigO', function () {
		
		vscode.window.showInformationMessage('Hello World from BigO!');
		
	});

	let copyTextCommand = vscode.commands.registerCommand("bigo.copyText", function () {
		
		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
			const highlighted = editor.document.getText(selectionRange);
			//const promptCode = highlighted.replace(/\n/g, ' ')
			console.log(highlighted.replaceAll(' ', ''));
			
			const url = "http://localhost:8080/time-complexity";

			const options = {
				url: url,
				method: 'POST',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8'
				},
				data: {
				"prompt": `${highlighted.replaceAll(' ', '')}`
				}
			};
			
			axios(options)
				.then(response => {
				console.log(response.data);
				vscode.window.showInformationMessage(`Time Complexity => ${response.data.data}`);
				});
			}
	})

	context.subscriptions.push(disposable, copyTextCommand);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}