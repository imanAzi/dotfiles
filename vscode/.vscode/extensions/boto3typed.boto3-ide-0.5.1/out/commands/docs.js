"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const vscode_1 = require("vscode");
const quickPick_1 = require("../quickPick");
async function handle(context) {
    const quickPick = vscode_1.window.createQuickPick();
    quickPick.placeholder = 'Documentation will be opened in a browser';
    quickPick.busy = true;
    quickPick.show();
    const servicePackages = await (0, utils_1.getServicePackages)(context);
    let pickedServicePackages = servicePackages.filter((x) => x.installed);
    if (!pickedServicePackages.length) {
        pickedServicePackages = servicePackages.slice(0, 5);
    }
    quickPick.items = pickedServicePackages.map((x) => new quickPick_1.PypiPackageItem(x, false));
    quickPick.busy = false;
    const selectedItem = await new Promise((resolve) => {
        quickPick.onDidHide(() => {
            resolve(null);
            quickPick.dispose();
        });
        quickPick.onDidAccept(async () => {
            const result = quickPick.selectedItems[0];
            resolve(result);
            quickPick.dispose();
        });
    });
    if (!selectedItem) {
        return;
    }
    vscode_1.env.openExternal(vscode_1.Uri.parse(selectedItem.pypiPackage.getDocsURL()));
}
exports.default = handle;
//# sourceMappingURL=docs.js.map