"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const boto3_1 = require("../boto3");
const modifyPackages_1 = require("../modifyPackages");
const sourceScanner_1 = require("../sourceScanner");
async function handle(context) {
    const boto3Version = await (0, boto3_1.getOrInstallBoto3Version)(context);
    if (!boto3Version) {
        return;
    }
    const workDirs = (0, utils_1.getWorkDirs)();
    const sourceDirs = workDirs.slice(0, -1);
    const sourceScanner = new sourceScanner_1.default(sourceDirs);
    let servicePackages = [];
    await (0, utils_1.showProgress)('Scanning workspace...', async (progress) => {
        const files = await sourceScanner.findPythonFiles();
        const serviceNamesSet = new Set();
        progress.report({ message: `Scanning ${files.length} files...` });
        for (const file of files) {
            const services = await sourceScanner.findServices(file);
            services.forEach((x) => serviceNamesSet.add(x));
        }
        progress.report({ message: `Checking installed packages...` });
        const serviceNames = [...serviceNamesSet];
        servicePackages = await (0, utils_1.getServicePackages)(context, serviceNames);
    });
    await (0, modifyPackages_1.default)(servicePackages, context, boto3Version);
}
exports.default = handle;
//# sourceMappingURL=autodiscover.js.map