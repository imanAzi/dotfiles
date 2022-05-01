"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const vscode_1 = require("vscode");
const boto3_1 = require("../boto3");
const modify_1 = require("./modify");
const update_1 = require("./update");
const autodiscover_1 = require("./autodiscover");
const constants_1 = require("../constants");
async function handle(context) {
    const boto3Version = await (0, boto3_1.getOrInstallBoto3Version)(context);
    if (!boto3Version) {
        return;
    }
    const servicePackages = await (0, utils_1.getServicePackages)(context);
    const pylanceEnabled = vscode_1.workspace.getConfiguration('python').get('languageServer') === 'Pylance';
    const autoCompleteEnabled = servicePackages.find((x) => x.installed && x.isMaster) ? true : false;
    const typeCheckingEnabled = vscode_1.workspace.getConfiguration('python').get('analysis.typeCheckingMode') !== 'off';
    const messageParts = [
        `${pylanceEnabled ? '✓' : '✗'} Pylance`,
        `${autoCompleteEnabled ? '✓' : '✗'} IntelliSense`,
        `${typeCheckingEnabled ? '✓' : '✗'} Type checking`
    ];
    const actions = [];
    if (!pylanceEnabled) {
        actions.push('Enable Pylance');
    }
    if (!typeCheckingEnabled) {
        actions.push('Enable Type Checking');
    }
    actions.push('Install', 'Modify', 'Update');
    const action = await vscode_1.window.showInformationMessage(`${constants_1.NAME}: ${messageParts.join(' | ')}`, ...actions);
    if (action === 'Enable Pylance' || action === 'Enable Type Checking') {
        vscode_1.env.openExternal(vscode_1.Uri.parse('https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance'));
    }
    if (action === 'Modify') {
        await (0, modify_1.default)(context);
    }
    if (action === 'Install') {
        await (0, autodiscover_1.default)(context);
    }
    if (action === 'Update') {
        await (0, update_1.default)(context);
    }
}
exports.default = handle;
//# sourceMappingURL=quickstart.js.map