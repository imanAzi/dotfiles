"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class PoetryInstaller extends base_1.BaseInstaller {
    constructor() {
        super(...arguments);
        this.name = 'poetry';
        this.description = 'Updates pyproject.toml and poetry.lock. Make sure you use https://pypi.org/simple source.';
    }
    async installPackage(name, version, extras, dev) {
        const packageName = this.buildPackageName(name, extras);
        const versionConstraint = version ? this.buildVersionConstraint(version) : '@latest';
        const installerCmd = await this.getInstallerCmd();
        const cmd = `${installerCmd} add -n ${dev ? '--dev' : ''} "${packageName}${versionConstraint}"`;
        await this.exec(cmd);
    }
    async removePackage(name, dev) {
        const installerCmd = await this.getInstallerCmd();
        const cmd = `${installerCmd} remove -n ${dev ? '--dev' : ''} "${name}"`;
        await this.exec(cmd);
    }
    getLockFileName() {
        return 'poetry.lock';
    }
    isPresent() {
        return this.getLockFilePath() ? true : false;
    }
}
exports.default = PoetryInstaller;
//# sourceMappingURL=poetry.js.map