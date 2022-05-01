"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PypiPackageItem = exports.InstallerItem = void 0;
class InstallerItem {
    constructor(installer, picked) {
        this.installer = installer;
        this.label = installer.name;
        this.detail = installer.description;
        this.description = `${installer.getWorkDir()} ${picked ? '(selected)' : ''}`;
        this.picked = picked;
    }
}
exports.InstallerItem = InstallerItem;
class PypiPackageItem {
    constructor(pypiPackage, picked) {
        this.pypiPackage = pypiPackage;
        this.label = pypiPackage.getLabel().trim();
        this.description = pypiPackage.getDescription().trim();
        this.detail = pypiPackage.getDetail().trim();
        this.picked = picked;
    }
}
exports.PypiPackageItem = PypiPackageItem;
//# sourceMappingURL=quickPick.js.map