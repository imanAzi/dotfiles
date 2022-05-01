"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkDirs = exports.getServicePackages = exports.showProgress = exports.pluralize = void 0;
const vscode_1 = require("vscode");
const servicePackages_1 = require("./servicePackages");
const pypi_1 = require("./pypi");
const smart_1 = require("./installers/smart");
function pluralize(count, singular, plural = '') {
    if (count === 1) {
        return `${count} ${singular}`;
    }
    const pluralText = plural || `${singular}s`;
    return `${count} ${pluralText}`;
}
exports.pluralize = pluralize;
async function showProgress(message, progressCallback) {
    await vscode_1.window.withProgress({
        location: vscode_1.ProgressLocation.Notification,
        title: 'AWS boto3 IDE',
        cancellable: true
    }, async (progress) => {
        progress.report({ message });
        await progressCallback(progress);
    });
}
exports.showProgress = showProgress;
async function getServicePackages(context, recommended = []) {
    const smartInstaller = await (0, smart_1.createSmartInstaller)(context);
    const boto3Version = await smartInstaller.getBoto3Version();
    const installedPackages = await smartInstaller.pip.listPackages();
    const masterPackage = new pypi_1.Boto3StubsPackage();
    masterPackage.version = boto3Version;
    const masterPackageData = installedPackages.find((x) => x.name === masterPackage.moduleName);
    if (masterPackageData) {
        masterPackage.installed = true;
        masterPackage.version = masterPackageData.version;
    }
    servicePackages_1.servicePackages.forEach((sp) => {
        const installedPackage = installedPackages.find((x) => x.name === sp.moduleName);
        sp.installed = installedPackage ? true : false;
        sp.version = installedPackage ? installedPackage.version : boto3Version;
        sp.recommended = sp.isMaster || recommended.includes(sp.getExtraName());
    });
    servicePackages_1.servicePackages.sort((a, b) => b.downloads - a.downloads);
    servicePackages_1.servicePackages.sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0));
    servicePackages_1.servicePackages.sort((a, b) => (b.installed ? 1 : 0) - (a.installed ? 1 : 0));
    return [masterPackage, ...servicePackages_1.servicePackages];
}
exports.getServicePackages = getServicePackages;
function getWorkDirs() {
    if (vscode_1.workspace.workspaceFolders?.length) {
        return [...vscode_1.workspace.workspaceFolders.map((i) => i.uri.fsPath), process.cwd()];
    }
    return [process.cwd()];
}
exports.getWorkDirs = getWorkDirs;
//# sourceMappingURL=utils.js.map