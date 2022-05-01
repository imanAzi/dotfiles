"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class PipInstaller extends base_1.BaseInstaller {
    constructor() {
        super(...arguments);
        this.name = 'pip';
        this.description = 'Installs packages directly without lockfile.';
    }
    isPresent() {
        return true;
    }
    async installPackage(name, version, extras, dev) {
        const packageName = this.buildPackageName(name, extras);
        const versionConstraint = version ? this.buildVersionConstraint(version) : '';
        await this.exec(`${this.mainPythonPath} -m pip install -U "${packageName}${versionConstraint}"`);
    }
    async removePackage(name, dev) {
        await this.exec(`${this.mainPythonPath} -m pip uninstall -y ${name}`);
    }
}
exports.default = PipInstaller;
//# sourceMappingURL=pip.js.map