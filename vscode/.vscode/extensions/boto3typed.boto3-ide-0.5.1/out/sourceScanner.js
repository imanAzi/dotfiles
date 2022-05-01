"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const fs = require("fs");
const ignore_1 = require("ignore");
const path = require("path");
const SERVICE_RE = /(boto3|session)\.(client|resource)\(\s*['"]+(\S+)['"]+\s*\)/g;
class SourceScanner {
    constructor(workDirs) {
        this.workDirs = workDirs;
    }
    async findPythonFiles() {
        const exclude = [
            ...Object.keys((await vscode_1.workspace.getConfiguration('search', null).get('exclude')) || {}),
            ...Object.keys((await vscode_1.workspace.getConfiguration('files', null).get('exclude')) || {}),
            '**/typings/**',
            '**/tests/**'
        ].join(',');
        const files = await vscode_1.workspace.findFiles('**/*.py', `{${exclude}}`);
        const result = [];
        for (const workDir of this.workDirs) {
            const gitignorePath = path.join(workDir, '.gitignore');
            const gitignoreExists = fs.existsSync(gitignorePath);
            const filters = gitignoreExists ? (await this.readFile(gitignorePath)).split(/\r?\n/) : [];
            const gitignore = (0, ignore_1.default)();
            gitignore.add(filters);
            for (const file of files) {
                const relativePath = path.relative(workDir, file.fsPath);
                if (filters.length) {
                    try {
                        const ignored = gitignore.test(relativePath).ignored;
                        if (ignored) {
                            console.log(`File ${relativePath} is gitignored`);
                            continue;
                        }
                    }
                    catch (e) {
                        console.log(`File ${relativePath} is not relative to ${workDir}: ${e}`);
                        continue;
                    }
                }
                console.log(`Discovered ${relativePath}`);
                result.push(file.fsPath);
            }
        }
        console.log(`Discovered ${result.length} files`);
        return result;
    }
    async readFile(filePath) {
        return new Promise((resolve) => {
            fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
                if (err) {
                    console.log(`Error reading ${filePath}: ${err}`);
                    resolve('');
                    return;
                }
                resolve(data);
            });
        });
    }
    async findServices(filePath) {
        const text = await this.readFile(filePath);
        const result = new Set();
        if (!text) {
            return result;
        }
        SERVICE_RE.lastIndex = 0;
        while (true) {
            const match = SERVICE_RE.exec(text);
            if (!match) {
                break;
            }
            const serviceName = match.pop() || '';
            SERVICE_RE.lastIndex = match.index + 1;
            result.add(serviceName);
        }
        return result;
    }
}
exports.default = SourceScanner;
//# sourceMappingURL=sourceScanner.js.map