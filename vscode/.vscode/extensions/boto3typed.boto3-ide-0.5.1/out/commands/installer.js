"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const smart_1 = require("../installers/smart");
async function handle(context) {
    const smartInstaller = await (0, smart_1.createSmartInstaller)(context);
    const installers = smartInstaller.getPresentInstallers();
    return await smartInstaller.selectInstaller(installers);
}
exports.default = handle;
//# sourceMappingURL=installer.js.map