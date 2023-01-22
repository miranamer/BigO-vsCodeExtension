const vscode = require('vscode');
const axios = require("axios");
const config = require('./keys_config.json');
const apiKey = config.apiKey;

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
			//console.log(highlighted.replaceAll(' ', ''));
			
			const url = "https://vscodeextensionserver.onrender.com/time-complexity";

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
				//console.log(response.data);
				vscode.window.showInformationMessage(`Time Complexity => ${response.data.data}`);
				});
			}
	})

	let optimise = vscode.commands.registerCommand('bigo.optimizeCode', async function () {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No editor is active');
			return;
		}

		// Get the selected text
		var selection = editor.selection;
		var text = editor.document.getText(selection);

		//console.log(text)

		// Send the selected text to the OpenAI API
		await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
			prompt: `Make the following code as efficient as possible and as fast as possible.
					${text.replaceAll(' ', '')}
					###
					`,
			temperature: 0.5,
			max_tokens: 2048,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0
		}, {
			headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${apiKey}`
			}
		})
			.then(response => {
			// Get the optimized code snippet from the API response
			var optimizedCode = response.data.choices[0].text;
			//console.log(optimizedCode)

			// Create a new editor window and show it
			vscode.workspace.openTextDocument({ content: optimizedCode }).then(doc => {
				vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.Beside });
			});
		});
	})

	context.subscriptions.push(disposable, copyTextCommand, optimise);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}