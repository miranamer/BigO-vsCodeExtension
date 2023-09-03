const vscode = require("vscode");
const axios = require("axios");
const { Configuration, OpenAIApi, OpenAI } = require("openai");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  console.log('Congratulations, your extension "bigo" is now active!');

  // Function to set the API key
  async function setApiKey() {
    const apiKey1 = await vscode.window.showInputBox({
      prompt: "Please enter your API key",
      placeHolder: "API key",
      ignoreFocusOut: true,
    });
  
    if (apiKey1) {
      const configuration = vscode.workspace.getConfiguration('bigo');
      const storedApiKey = configuration.get('apiKey');
  
      // Update the apiKey property with the entered value
      storedApiKey.apiKey = apiKey1;
  
      // Update the configuration with the modified object
      configuration.update('apiKey', storedApiKey, vscode.ConfigurationTarget.Global).then(() => {
        vscode.window.showInformationMessage("API key saved successfully!");
        const apiKey = configuration.get("apiKey");
        console.log("Stored: ", apiKey, "Entered: ", apiKey1);
      });
    }
  }

  // Register the "bigo.setApiKey" command
  let setApiKeyCommand = vscode.commands.registerCommand(
    "bigo.setApiKey",
    setApiKey
  );

  // Event listener for changes in the extension configuration
  vscode.extensions.onDidChange(() => {
    const configuration = vscode.workspace.getConfiguration();
    const apiKey = configuration.get("apiKey");
  });

  // Set the API key initially
  setApiKey();

  function getApiKey() {
    const configuration = vscode.workspace.getConfiguration('bigo');
    const apiKeyObject = configuration.get('apiKey');
  
    // Retrieve the API key string from the 'apiKey' property
    return apiKeyObject.apiKey;
  }
  
  let displayApiKey = vscode.commands.registerCommand("bigo.displayApiKey", function () {
    const apiKey = getApiKey();
    
    if (apiKey) {
      vscode.window.showInformationMessage(`Stored API Key: ${apiKey}`);
    } else {
      vscode.window.showErrorMessage("No API Key stored.");
    }
  });

  const generateOpenAIResponse = async (prompt) => {
    //const openai_config = new OpenAI({
      //apiKey: getApiKey(),
    //});

    //const openai_instance = new OpenAI.OpenAIApi(openai_config);

    const OAI = new OpenAI({
      apiKey: getApiKey(),
    });
    
    const completion = await OAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2048,
    });

    console.log(completion);

    return completion.choices[0].message.content
  }


  let copyTextCommand = vscode.commands.registerCommand(
    "bigo.copyText",
    async function () {
      const editor = vscode.window.activeTextEditor;
      const selection = editor.selection;
      if (selection && !selection.isEmpty) {
        const selectionRange = new vscode.Range(
          selection.start.line,
          selection.start.character,
          selection.end.line,
          selection.end.character
        );
        const highlighted = editor.document.getText(selectionRange);

        const prompt = 'whats the Big O complexity of this code: ' + highlighted.replaceAll(" ", "");
        
        const response = await generateOpenAIResponse(prompt);

        vscode.window.showInformationMessage(
          `Time Complexity => ${response}`
        );

      }
    }
  );

  let optimise = vscode.commands.registerCommand(
    "bigo.optimizeCode",
    async function () {
      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No editor is active");
        return;
      }

      // Get the selected text
      var selection = editor.selection;
      var text = editor.document.getText(selection);
  
      const prompt = 'Make the following code as efficient as possible and as fast as possible: ' + text.replaceAll(" ", "");
        
      const response = await generateOpenAIResponse(prompt);

      // Send the selected text to the OpenAI API
      vscode.workspace
            .openTextDocument({ content: response })
            .then((doc) => {
              vscode.window.showTextDocument(doc, {
                viewColumn: vscode.ViewColumn.Beside,
              });
      });
    }
  );

  let readability = vscode.commands.registerCommand(
    "bigo.readableCode",
    async function () {
      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No editor is active");
        return;
      }

      // Get the selected text
      var selection = editor.selection;
      var text = editor.document.getText(selection);

      const prompt = 'Make the following code as readable as possible and add any necessary comments to explain it: ' + text.replaceAll(" ", "");
        
      const response = await generateOpenAIResponse(prompt);

      vscode.workspace
        .openTextDocument({ content: response })
        .then((doc) => {
          vscode.window.showTextDocument(doc, {
            viewColumn: vscode.ViewColumn.Beside,
          });
        });
    }
  );

  let debugging = vscode.commands.registerCommand(
    "bigo.debugCode",
    async function () {
      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No editor is active");
        return;
      }

      // Get the selected text
      var selection = editor.selection;
      var text = editor.document.getText(selection);

      const prompt = 'Debug the following code by fixing the errors: ' + text.replaceAll(" ", "");
        
      const response = await generateOpenAIResponse(prompt);
      
      vscode.workspace
        .openTextDocument({ content: response })
        .then((doc) => {
          vscode.window.showTextDocument(doc, {
            viewColumn: vscode.ViewColumn.Beside,
          });
        })
    }
  );

  let converter = vscode.commands.registerCommand(
    "bigo.convertCode",
    async function () {
      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No editor is active");
        return;
      }

      // Get the selected text
      var selection = editor.selection;
      var text = editor.document.getText(selection);

      const prompt = 'Convert the following code into the commented programming language placed on top of the code: ' + text.replaceAll(" ", "");
        
      const response = await generateOpenAIResponse(prompt);

      vscode.workspace
        .openTextDocument({ content: response })
        .then((doc) => {
          vscode.window.showTextDocument(doc, {
            viewColumn: vscode.ViewColumn.Beside,
          });
        })
    }
  );

  let solver = vscode.commands.registerCommand(
    "bigo.solveCode",
    async function () {
      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No editor is active");
        return;
      }

      // Get the selected text
      var selection = editor.selection;
      var text = editor.document.getText(selection);

      const prompt = 'Write code to solve the following problem: ' + text.replaceAll(" ", "");
        
      const response = await generateOpenAIResponse(prompt);

      vscode.workspace.openTextDocument({ content: response }).then((doc) => {
        vscode.window.showTextDocument(doc, {
          viewColumn: vscode.ViewColumn.Beside,
        });
      })
    }
  );

  context.subscriptions.push(
    copyTextCommand,
    optimise,
    readability,
    debugging,
    converter,
    solver,
    setApiKeyCommand,
    displayApiKey
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
