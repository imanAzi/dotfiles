"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const boto3_1 = require("../boto3");
const modifyPackages_1 = require("../modifyPackages");
async function handle(context) {
    const boto3Version = await (0, boto3_1.getOrInstallBoto3Version)(context);
    if (!boto3Version) {
        return;
    }
    const servicePackages = await (0, utils_1.getServicePackages)(context);
    await (0, modifyPackages_1.default)(servicePackages, context, boto3Version);
}
exports.default = handle;
//# sourceMappingURL=modify.js.map