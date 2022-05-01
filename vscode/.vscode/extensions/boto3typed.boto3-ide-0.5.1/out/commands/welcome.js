"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../constants");
const smart_1 = require("../installers/smart");
const quickstart_1 = require("./quickstart");
async function getPackages(context) {
    try {
        const smartInstaller = await (0, smart_1.createSmartInstaller)(context);
        return await smartInstaller.listPackages();
    }
    catch {
        return [];
    }
}
async function handle(context) {
    const silenced = context.globalState.get(constants_1.SETTING_SILENCED);
    console.log('silenced', silenced);
    if (silenced) {
        return;
    }
    const initialized = context.workspaceState.get(constants_1.SETTING_INITIALIZED);
    console.log('initialized', initialized);
    if (initialized) {
        return;
    }
    const pipPackages = await getPackages(context);
    const pipPackageNames = pipPackages.map((x) => x.name);
    console.log(pipPackageNames);
    if (!pipPackageNames.includes('boto3')) {
        console.log('boto3 not installed');
        return;
    }
    if (pipPackageNames.includes('boto3-stubs')) {
        console.log('boto3-stubs installed');
        return;
    }
    const response = await vscode_1.window.showInformationMessage(`This project uses boto3 with no ${constants_1.NAME}.`, `Install ${constants_1.NAME}`, 'Maybe later', 'Do not show this again');
    context.workspaceState.update(constants_1.SETTING_INITIALIZED, 'true');
    if (response === 'Do not show this again') {
        context.globalState.update(constants_1.SETTING_SILENCED, 'true');
    }
    if (response === `Install ${constants_1.NAME}`) {
        await (0, quickstart_1.default)(context);
    }
    if (response === 'Maybe later') {
        await vscode_1.window.showInformationMessage(`Run AWS boto3: Quick Start command anytime to enable ${constants_1.NAME}.`);
    }
}
exports.default = handle;
//# sourceMappingURL=welcome.js.map