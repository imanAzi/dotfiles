"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const utils_1 = require("../utils");
const boto3_1 = require("../boto3");
const pypi_1 = require("../pypi");
const smart_1 = require("../installers/smart");
const constants_1 = require("../constants");
const autodiscover_1 = require("./autodiscover");
async function handle(context) {
    let boto3Version = await (0, boto3_1.getOrInstallBoto3Version)(context);
    if (!boto3Version) {
        return;
    }
    const latestBoto3Version = await (0, pypi_1.getLatestBoto3Version)();
    if (latestBoto3Version !== boto3Version) {
        const smartInstaller = await (0, smart_1.createSmartInstaller)(context);
        const action = await vscode_1.window.showInformationMessage(`New boto3 version ${latestBoto3Version} available!`, 'Update');
        if (!action) {
            return;
        }
        await smartInstaller.install('boto3', latestBoto3Version, false);
        boto3Version = latestBoto3Version;
    }
    const servicePackages = await (0, utils_1.getServicePackages)(context);
    const installedPackages = servicePackages.filter((x) => x.installed);
    if (!installedPackages.length) {
        const response = await vscode_1.window.showInformationMessage(`No ${constants_1.NAME} packages detected, nothing to update.`, 'Auto-discover required packages');
        if (response) {
            await (0, autodiscover_1.default)(context);
        }
        return;
    }
    const smartInstaller = await (0, smart_1.createSmartInstaller)(context);
    const isInstalled = await smartInstaller.installPackages(installedPackages, [], boto3Version, true);
    if (isInstalled) {
        await vscode_1.window.showInformationMessage(`${(0, utils_1.pluralize)(installedPackages.length, 'package')} updated`);
    }
}
exports.default = handle;
//# sourceMappingURL=update.js.map