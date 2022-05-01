"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInstaller = void 0;
const exec_1 = require("../exec");
const pipPackage_1 = require("./pipPackage");
const path = require("path");
const fs = require("fs");
const vscode_1 = require("vscode");
class BaseInstaller {
    constructor(pythonPaths, workDirs) {
        this.supportsExtras = true;
        this.pythonPaths = pythonPaths;
        this.mainPythonPath = pythonPaths[0];
        this.workDirs = workDirs;
        this.installerCmd = '';
    }
    async getInstallerCmd() {
        if (this.installerCmd) {
            return this.installerCmd;
        }
        const commands = [
            vscode_1.workspace.getConfiguration('python').get(`${this.name}Path`) || '',
            ...this.pythonPaths.map((x) => `${x} -m ${this.name}`)
        ];
        for (const command of commands) {
            if (!command) {
                continue;
            }
            try {
                await this.exec(command);
                this.installerCmd = command;
                return this.installerCmd;
            }
            catch (e) {
                console.log(`${command} - failed with ${e}`);
            }
        }
        const message = `Could not find ${this.name} installer in any Python path`;
        this.throwError(message);
    }
    throwError(message) {
        console.error(message);
        // window.showErrorMessage(message);
        throw new Error(message);
    }
    parsePackageData(s) {
        if (s.includes('==')) {
            return new pipPackage_1.default(s.split('==')[0], s.split('==')[1]);
        }
        return new pipPackage_1.default(s.split('@')[0].trim(), '');
    }
    getLockFileName() {
        return '';
    }
    isInUse() {
        const lockFilePath = this.getLockFilePath();
        if (!lockFilePath) {
            return false;
        }
        const data = fs.readFileSync(lockFilePath, { encoding: 'utf-8' });
        if (data.includes('"mypy-boto3')) {
            return true;
        }
        if (data.includes('"boto3-stubs"')) {
            return true;
        }
        return false;
    }
    getLockFilePath() {
        const lockFileName = this.getLockFileName();
        if (!lockFileName.length) {
            return null;
        }
        for (const workDir of this.workDirs) {
            const lockFilePath = path.join(workDir, lockFileName);
            if (fs.existsSync(lockFilePath))
                return lockFilePath;
        }
        return null;
    }
    getWorkDir() {
        const lockFileName = this.getLockFileName();
        if (!lockFileName.length) {
            return this.workDirs[0];
        }
        for (const workDir of this.workDirs) {
            const lockFilePath = path.join(workDir, lockFileName);
            if (fs.existsSync(lockFilePath))
                return workDir;
        }
        return this.workDirs[0];
    }
    buildVersionConstraint(version) {
        if (!version.length) {
            return '';
        }
        if (/^[=><]/.test(version)) {
            return version;
        }
        return `==${version}`;
    }
    buildPackageName(name, extras) {
        if (!extras.length) {
            return name;
        }
        return `${name}[${extras.join(',')}]`;
    }
    async listPackages() {
        const cmd = `${this.mainPythonPath} -m pip freeze`;
        try {
            const output = (await (0, exec_1.default)(cmd)).stdout;
            return output.split(/\r?\n/).map((x) => this.parsePackageData(x));
        }
        catch {
            console.error(`Cannot list packages with ${cmd}`);
            return [];
        }
    }
    async exec(cmd) {
        console.log(`Exec: ${cmd}`);
        const oldCwd = process.cwd();
        process.chdir(this.getWorkDir());
        try {
            return await (0, exec_1.default)(cmd);
        }
        catch {
            this.throwError(`Installer ${this.name} failed on command: ${cmd}`);
        }
        finally {
            process.chdir(oldCwd);
        }
    }
}
exports.BaseInstaller = BaseInstaller;
//# sourceMappingURL=base.js.map