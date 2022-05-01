"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const util_1 = require("util");
const exec = (0, util_1.promisify)(child_process_1.exec);
async function default_1(cmd) {
    try {
        const { stderr, stdout } = await exec(cmd);
        return { stderr, stdout };
    }
    catch (e) {
        const error = e;
        console.error('error');
        console.error(error.message);
        console.error('stdout');
        console.error(error.stdout);
        console.error('stderr');
        console.error(error.stderr);
        const message = e.message;
        throw new Error(`${cmd} failed: ${message}`);
    }
}
exports.default = default_1;
//# sourceMappingURL=exec.js.map