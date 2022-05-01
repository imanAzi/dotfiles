"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePackage = void 0;
class ServicePackage {
    constructor(moduleName, serviceName, downloads = 0) {
        this.isMaster = false;
        this.serviceName = serviceName;
        this.moduleName = moduleName;
        this.version = '';
        this.installed = false;
        this.recommended = false;
        this.downloads = downloads;
    }
    getDetail() {
        return `boto3.client('${this.getExtraName()}') IntelliSense and type annotations`;
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
    getShortLabel() {
        return this.serviceName;
    }
    getLabel() {
        return `${this.serviceName} ${this.version}`;
    }
    getExtraName() {
        return this.moduleName.replace('mypy-boto3-', '');
    }
    getDocsURL() {
        const linkName = this.moduleName.replace(/-/g, '_');
        return `https://youtype.github.io/boto3_stubs_docs/${linkName}/`;
    }
}
exports.ServicePackage = ServicePackage;
//# sourceMappingURL=servicePackage.js.map