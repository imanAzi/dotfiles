/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at

    http://www.apache.org/licenses/LICENSE-2.0

or in the "license" file accompanying this file. This file is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yamlLangaugeServerValidation = exports.activate = void 0;
const path = require("path");
const fs = require("fs");
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const yaml_schema_1 = require("./yaml-support/yaml-schema");
let previews = {};
function activate(context) {
    // The server is implemented in node
    let serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    // The debug options for the server
    let debugOptions = { execArgv: ["--nolazy", "--inspect=6010"] };
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions = {
        run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc },
        debug: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc, options: debugOptions }
    };
    // Options to control the language client
    let clientOptions = {
        // Register the server for plain text documents
        documentSelector: [
            { scheme: 'file', language: 'yaml' },
            { scheme: 'file', language: 'json' }
        ],
        synchronize: {
            // Synchronize the setting section 'languageServerExample' to the server
            configurationSection: 'cfnLint',
            // Notify the server about file changes to '.clientrc files contain in the workspace
            fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc')
        }
    };
    let enableAutocomplete = vscode_1.workspace.getConfiguration().get('cfnLint.enableAutocomplete');
    if (enableAutocomplete) {
        let currentTags = vscode_1.workspace.getConfiguration().get('yaml.customTags');
        let cloudFormationTags = [
            "!And",
            "!And sequence",
            "!If",
            "!If sequence",
            "!Not",
            "!Not sequence",
            "!Equals",
            "!Equals sequence",
            "!Or",
            "!Or sequence",
            "!FindInMap",
            "!FindInMap sequence",
            "!Base64",
            "!Join",
            "!Join sequence",
            "!Cidr",
            "!Ref",
            "!Sub",
            "!Sub sequence",
            "!GetAtt",
            "!GetAZs",
            "!ImportValue",
            "!ImportValue sequence",
            "!Select",
            "!Select sequence",
            "!Split",
            "!Split sequence"
        ];
        let updateTags = currentTags.concat(cloudFormationTags.filter((item) => currentTags.indexOf(item) < 0));
        vscode_1.workspace.getConfiguration().update('yaml.customTags', updateTags, vscode_1.ConfigurationTarget.Global);
        yamlLangaugeServerValidation();
        yaml_schema_1.registerYamlSchemaSupport();
    }
    // Create the language client and start the client.
    let languageClient = new vscode_languageclient_1.LanguageClient('cfnLint', 'CloudFormation linter Language Server', serverOptions, clientOptions);
    let clientDisposable = languageClient.start();
    languageClient.onReady().then(() => {
        languageClient.onNotification('cfn/busy', () => {
            vscode_1.window.showInformationMessage("Linter is already running. Please try again.");
        });
        languageClient.onNotification('cfn/previewIsAvailable', (uri) => {
            reloadSidePreview(uri, languageClient);
        });
        languageClient.onNotification('cfn/isPreviewable', (value) => {
            vscode_1.commands.executeCommand('setContext', 'isPreviewable', value);
        });
        languageClient.onNotification('cfn/fileclosed', (uri) => {
            // if the user closed the template itself, we close the preview
            if (previews[uri]) {
                previews[uri].dispose();
            }
        });
        let previewDisposable = vscode_1.commands.registerCommand('extension.sidePreview', () => {
            if (vscode_1.window.activeTextEditor.document) {
                let uri = vscode_1.Uri.file(vscode_1.window.activeTextEditor.document.fileName).toString();
                languageClient.sendNotification('cfn/requestPreview', uri);
            }
        });
        context.subscriptions.push(previewDisposable);
    });
    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(clientDisposable);
}
exports.activate = activate;
function reloadSidePreview(file, languageClient) {
    let uri = vscode_1.Uri.parse(file);
    let stringifiedUri = uri.toString();
    let dotFile = uri.fsPath + ".dot";
    if (!fs.existsSync(dotFile)) {
        vscode_1.window.showErrorMessage("Error previewing graph. Please run `pip3 install cfn-lint pydot --upgrade`");
        return;
    }
    let content = fs.readFileSync(dotFile, 'utf8');
    if (!previews[stringifiedUri]) {
        previews[stringifiedUri] = vscode_1.window.createWebviewPanel('cfnLintPreview', // Identifies the type of the webview. Used internally
        'Template: ' + dotFile.slice(0, -4), // Title of the panel displayed to the user
        vscode_1.ViewColumn.Two, // Editor column to show the new webview panel in.
        {
            enableScripts: true,
        });
        previews[stringifiedUri].onDidDispose(() => {
            // if the user closed the preview
            delete previews[stringifiedUri];
            fs.unlinkSync(dotFile);
            languageClient.sendNotification('cfn/previewClosed', stringifiedUri);
        });
    }
    const panel = previews[stringifiedUri];
    panel.webview.html = getPreviewContent(content);
}
function getPreviewContent(content) {
    let multilineString = "`" + content + "`";
    // FIXME is there a better way of converting from dot to svg that is not using cdn urls?
    return `
	<!DOCTYPE html>
	<body>
		<script src="https://cdn.jsdelivr.net/npm/d3@5.16.0/dist/d3.min.js" integrity="sha256-Xb6SSzhH3wEPC4Vy3W70Lqh9Y3Du/3KxPqI2JHQSpTw=" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/@hpcc-js/wasm@0.3.14/dist/index.min.js" integrity="sha256-GQQPKRntjhRqIwXvSCfytweTuDgJQ7hnK3RGsln9HWc=" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/d3-graphviz@3.1.0/build/d3-graphviz.min.js" integrity="sha256-WRJh26uDo3BP+SjibjTwXI66JLkDFXmreIGpKm0xHV8=" crossorigin="anonymous"></script>
		<div id="graph" style="text-align: center;"></div>
		<script>
			d3.select("#graph")
			.graphviz()
			.width(screen.width)
			.height(screen.height)
			.renderDot(${multilineString});
		</script>
	</body>
`;
}
function yamlLangaugeServerValidation() {
    return __awaiter(this, void 0, void 0, function* () {
        let validateYaml = vscode_1.workspace.getConfiguration().get('yaml.validate');
        let cfnValidateYamlInspect = vscode_1.workspace.getConfiguration().inspect('cfnLint.validateUsingJsonSchema');
        let cfnValidateYaml = vscode_1.workspace.getConfiguration().get('cfnLint.validateUsingJsonSchema');
        if (validateYaml) {
            if (cfnValidateYamlInspect.globalValue === null || cfnValidateYamlInspect.workspaceFolderValue === null || cfnValidateYamlInspect.workspaceValue === null) {
                let selection = yield vscode_1.window
                    .showInformationMessage('The installed Red Hat YAML extension is also configured to validate YAML templates. This may result in duplicate lint errors with cfn-lint. Disabling the YAML extensions validation will disable it completely.  Would you like to only use cfn-lint to lint CloudFormation templates?', ...['yes', 'no']);
                if (selection === 'yes') {
                    vscode_1.workspace.getConfiguration().update('cfnLint.validateUsingJsonSchema', false, vscode_1.ConfigurationTarget.Global);
                }
                else if (selection === 'no') {
                    vscode_1.workspace.getConfiguration().update('cfnLint.validateUsingJsonSchema', true, vscode_1.ConfigurationTarget.Global);
                    cfnValidateYaml = true;
                }
            }
            if (cfnValidateYaml === false) {
                vscode_1.workspace.getConfiguration().update('yaml.validate', false, vscode_1.ConfigurationTarget.Global);
            }
        }
    });
}
exports.yamlLangaugeServerValidation = yamlLangaugeServerValidation;
//# sourceMappingURL=extension.js.map