"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrInstallBoto3Version = void 0;
const vscode_1 = require("vscode");
const smart_1 = require("./installers/smart");
async function getOrInstallBoto3Version(context) {
    const smartInstaller = await (0, smart_1.createSmartInstaller)(context);
    const boto3Version = await smartInstaller.getBoto3Version();
    if (boto3Version) {
        return boto3Version;
    }
    const action = await vscode_1.window.showErrorMessage(`boto3 is not installed in ${smartInstaller.mainPythonPath}!`, `Install now`);
    if (!action) {
        return '';
    }
    await smartInstaller.install('boto3', '', false);
    return await smartInstaller.getBoto3Version();
}
exports.getOrInstallBoto3Version = getOrInstallBoto3Version;
//# sourceMappingURL=boto3.js.map