"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const update_1 = require("./commands/update");
const modify_1 = require("./commands/modify");
const docs_1 = require("./commands/docs");
const autodiscover_1 = require("./commands/autodiscover");
const quickstart_1 = require("./commands/quickstart");
const installer_1 = require("./commands/installer");
const welcome_1 = require("./commands/welcome");
async function activate(context) {
    console.log('boto3-ide is now active!');
    context.subscriptions.push(vscode_1.commands.registerCommand('boto3-ide.quickstart', async () => {
        return await (0, quickstart_1.default)(context);
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand('boto3-ide.modify', async () => {
        return await (0, modify_1.default)(context);
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand('boto3-ide.update', async () => {
        return await (0, update_1.default)(context);
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand('boto3-ide.docs', async () => {
        return await (0, docs_1.default)(context);
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand('boto3-ide.autodiscover', async () => {
        return await (0, autodiscover_1.default)(context);
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand('boto3-ide.installer', async () => {
        return await (0, installer_1.default)(context);
    }));
    await (0, welcome_1.default)(context);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map