"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestBoto3Version = exports.Boto3StubsPackage = void 0;
const https = require("https");
class Boto3StubsPackage {
    constructor() {
        this.isMaster = true;
        this.moduleName = 'boto3-stubs';
        this.version = '';
        this.installed = false;
        this.recommended = true;
    }
    getDescription() {
        if (this.installed) {
            return '(installed)';
        }
        if (this.recommended) {
            return '(recommended)';
        }
        return '';
    }
    getDetail() {
        return `boto3/botocore IntelliSense and type annotations`;
    }
    getShortLabel() {
        return 'boto3';
    }
    getLabel() {
        return `boto3 common ${this.version}`;
    }
    getExtraName() {
        return '';
    }
    getDocsURL() {
        return 'https://youtype.github.io/boto3_stubs_docs/';
    }
}
exports.Boto3StubsPackage = Boto3StubsPackage;
function getJSON(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    let json = JSON.parse(body);
                    resolve(json);
                }
                catch (error) {
                    reject(error);
                }
            });
        })
            .on('error', (error) => {
            reject(error.message);
        });
    });
}
async function getLatestBoto3Version() {
    const data = await getJSON('https://pypi.org/pypi/boto3/json');
    return data.info.version;
}
exports.getLatestBoto3Version = getLatestBoto3Version;
//# sourceMappingURL=pypi.js.map