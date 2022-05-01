"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const vscode_1 = require("vscode");
const smart_1 = require("./installers/smart");
const quickPick_1 = require("./quickPick");
const constants_1 = require("./constants");
function getSuccessMessage(selected) {
    if (!selected.length) {
        return `${constants_1.NAME} disabled!`;
    }
    const servicePackages = selected.filter((x) => !x.pypiPackage.isMaster);
    return `${constants_1.NAME} enabled for ${(0, utils_1.pluralize)(servicePackages.length, 'service')}.`;
}
async function modifyPackages(servicePackages, context, boto3Version) {
    const quickPick = vscode_1.window.createQuickPick();
    quickPick.placeholder = 'Select boto3 services...';
    quickPick.canSelectMany = true;
    quickPick.busy = true;
    quickPick.show();
    const pickedServicePackages = servicePackages.filter((x) => x.installed || x.recommended);
    quickPick.items = servicePackages.map((x) => new quickPick_1.PypiPackageItem(x, pickedServicePackages.includes(x)));
    quickPick.selectedItems = quickPick.items.filter((x) => x.picked);
    quickPick.busy = false;
    const selectedItems = await new Promise((resolve) => {
        quickPick.onDidHide(() => {
            resolve(null);
            quickPick.dispose();
        });
        quickPick.onDidAccept(async () => {
            const result = quickPick.selectedItems;
            resolve([...result]);
            quickPick.dispose();
        });
    });
    if (!selectedItems) {
        return;
    }
    const selectedPackages = selectedItems.map((x) => x.pypiPackage);
    const removePackages = servicePackages
        .filter((x) => x.installed)
        .filter((x) => !selectedPackages.includes(x));
    const smartInstaller = await (0, smart_1.createSmartInstaller)(context);
    const result = await smartInstaller.installPackages(selectedPackages, removePackages, boto3Version, true);
    if (result) {
        await vscode_1.window.showInformationMessage(getSuccessMessage(selectedItems));
    }
}
exports.default = modifyPackages;
//# sourceMappingURL=modifyPackages.js.map