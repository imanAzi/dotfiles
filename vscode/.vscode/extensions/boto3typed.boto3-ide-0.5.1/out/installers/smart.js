"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSmartInstaller = exports.SmartInstaller = void 0;
const poetry_1 = require("./poetry");
const pip_1 = require("./pip");
const vscode_1 = require("vscode");
const pipenv_1 = require("./pipenv");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const quickPick_1 = require("../quickPick");
class SmartInstaller {
    constructor(pythonPaths, context) {
        this.pythonPaths = pythonPaths;
        this.context = context;
        this.mainPythonPath = pythonPaths[0];
        this.workDirs = (0, utils_1.getWorkDirs)();
        this.poetry = new poetry_1.default(this.pythonPaths, this.workDirs);
        this.pipenv = new pipenv_1.default(this.pythonPaths, this.workDirs);
        this.pip = new pip_1.default(this.pythonPaths, this.workDirs);
        this.installers = [this.poetry, this.pipenv, this.pip];
        this.installedPackages = [];
    }
    getPresentInstallers() {
        return this.installers.filter((x) => x.isPresent());
    }
    async getInstaller() {
        const installers = this.getPresentInstallers();
        if (!installers.length) {
            return undefined;
        }
        if (installers.length === 1) {
            return installers[0];
        }
        const selectedInstallerName = this.context.workspaceState.get(constants_1.SETTING_INSTALLER) || '';
        let selectedInstaller = installers.find((x) => x.name === selectedInstallerName);
        if (selectedInstaller) {
            return selectedInstaller;
        }
        selectedInstaller = await this.selectInstaller(installers);
        if (!selectedInstaller) {
            return;
        }
        return selectedInstaller;
    }
    async selectInstaller(installers) {
        const quickPick = vscode_1.window.createQuickPick();
        quickPick.placeholder = 'Select installer';
        const savedInstallerName = this.context.workspaceState.get(constants_1.SETTING_INSTALLER) || '';
        const installerItems = installers.map((x) => new quickPick_1.InstallerItem(x, x.name === savedInstallerName));
        installerItems.sort((a, b) => (b.picked ? 1 : 0) - (a.picked ? 1 : 0));
        quickPick.items = installerItems;
        quickPick.show();
        const selectedInstaller = await new Promise((resolve) => {
            quickPick.onDidHide(() => {
                resolve(null);
                quickPick.dispose();
            });
            quickPick.onDidAccept(async () => {
                const result = quickPick.selectedItems[0];
                resolve(result.installer);
                quickPick.dispose();
            });
        });
        if (selectedInstaller) {
            this.context.workspaceState.update(constants_1.SETTING_INSTALLER, selectedInstaller.name);
            return selectedInstaller;
        }
    }
    async installPackages(installPackages, removePackages, version, dev) {
        const installer = await this.getInstaller();
        if (!installer) {
            return false;
        }
        await this._installPackages(installer, installPackages, removePackages, version, dev);
        this.resetListPackages();
        return true;
    }
    async install(name, version, dev = false) {
        const installer = await this.getInstaller();
        if (!installer) {
            return;
        }
        await (0, utils_1.showProgress)(`Installing ${name} ${version} with ${installer.name}...`, async () => {
            await installer.installPackage(name, version, [], dev);
        });
        this.resetListPackages();
    }
    async _installPackages(installer, packages, removePackages, version, dev) {
        const masterPackage = packages.find((x) => x.isMaster);
        const extraPackages = packages.filter((x) => !x.isMaster);
        await (0, utils_1.showProgress)(`Installing packages...`, async (progress) => {
            if (installer.supportsExtras && masterPackage) {
                const extras = extraPackages.map((x) => x.getExtraName());
                progress.report({
                    message: `Installing ${extraPackages.length} services with ${installer.name}...`
                });
                await installer.installPackage(masterPackage.moduleName, version, extras, dev);
            }
            else {
                for (const extraPackage of packages) {
                    progress.report({
                        message: `Installing ${extraPackage.getLabel()} service with ${installer.name}...`
                    });
                    await installer.installPackage(extraPackage.moduleName, `<=${version}`, [], dev);
                }
            }
            for (const removePackage of removePackages) {
                progress.report({
                    message: `Removing ${removePackage.getLabel()} with ${installer.name}...`
                });
                await installer.removePackage(removePackage.moduleName, dev);
            }
        });
    }
    async listPackages() {
        if (this.installedPackages.length) {
            return this.installedPackages;
        }
        this.installedPackages = await this.pip.listPackages();
        return this.installedPackages;
    }
    resetListPackages() {
        this.installedPackages = [];
    }
    async getBoto3Version() {
        try {
            return (await this.pip.exec(`${this.mainPythonPath} -c "import boto3; print(boto3.__version__)"`)).stdout.trim();
        }
        catch (e) {
            console.error(e);
        }
        return '';
    }
}
exports.SmartInstaller = SmartInstaller;
async function getPythonPaths() {
    const result = [];
    const extension = vscode_1.extensions.getExtension('ms-python.python');
    if (extension) {
        if (!extension.isActive) {
            await (0, utils_1.showProgress)(`Waiting for Python extension to activate...`, async () => {
                await extension.activate();
            });
        }
        const executionDetails = extension.exports.settings.getExecutionDetails();
        if (executionDetails?.execCommand.length) {
            result.push(executionDetails.execCommand[0]);
        }
    }
    const newPath = vscode_1.workspace.getConfiguration('python').get('defaultInterpreterPath') || '';
    if (newPath.length && !result.includes(newPath)) {
        result.push(newPath);
    }
    const oldPath = vscode_1.workspace.getConfiguration('python').get('pythonPath') || '';
    if (oldPath.length && !result.includes(oldPath)) {
        result.push(oldPath);
    }
    const failbackPath = 'python';
    if (!result.includes(failbackPath)) {
        result.push(failbackPath);
    }
    return result;
}
async function createSmartInstaller(context) {
    return new SmartInstaller(await getPythonPaths(), context);
}
exports.createSmartInstaller = createSmartInstaller;
//# sourceMappingURL=smart.js.map