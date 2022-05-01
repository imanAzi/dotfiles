"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class PipenvInstaller extends base_1.BaseInstaller {
    constructor() {
        super(...arguments);
        this.name = 'pipenv';
        this.description = 'Updates pyproject.toml and Pipfile.lock. Make sure you use https://pypi.org/simple source.';
    }
    async installPackage(name, version, extras, dev) {
        const packageName = this.buildPackageName(name, extras);
        const versionConstraint = version ? this.buildVersionConstraint(version) : '';
        const command = version ? 'install' : 'update';
        const installerCmd = await this.getInstallerCmd();
        const cmd = `${installerCmd} ${command} ${dev ? '--dev' : ''} "${packageName}${versionConstraint}"`;
        await this.exec(cmd);
    }
    async removePackage(name, dev) {
        const installerCmd = await this.getInstallerCmd();
        const cmd = `${installerCmd} uninstall -n ${dev ? '--dev' : ''} "${name}"`;
        await this.exec(cmd);
    }
    getLockFileName() {
        return 'Pipfile.lock';
    }
    isPresent() {
        return this.getLockFilePath() ? true : false;
    }
}
exports.default = PipenvInstaller;
//# sourceMappingURL=pipenv.js.map