"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTestContent = exports.getDocUri = exports.getDocPath = exports.activateAndPreview = exports.activate = exports.platformEol = exports.documentEol = exports.editor = exports.doc = void 0;
const vscode = require("vscode");
const path = require("path");
/**
 * Activates the kddejong.vscode-cfn-lint extension
 */
function activate(docUri) {
    return __awaiter(this, void 0, void 0, function* () {
        const ext = vscode.extensions.getExtension('kddejong.vscode-cfn-lint');
        yield ext.activate();
        yield vscode.workspace.getConfiguration().update('yaml.validate', false, vscode.ConfigurationTarget.Global);
        try {
            exports.doc = yield vscode.workspace.openTextDocument(docUri);
            exports.editor = yield vscode.window.showTextDocument(exports.doc);
            yield sleep(4000); // Wait for server activation
        }
        catch (e) {
            console.error(e);
            throw (e);
        }
    });
}
exports.activate = activate;
function activateAndPreview(docUri) {
    return __awaiter(this, void 0, void 0, function* () {
        yield activate(docUri);
        yield vscode.commands.executeCommand('extension.sidePreview');
        yield sleep(4000); // Wait for preview to become available
    });
}
exports.activateAndPreview = activateAndPreview;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
exports.getDocPath = (p) => {
    return path.resolve(__dirname, '../../../src/test/suite/fixtures', p);
};
exports.getDocUri = (p) => {
    return vscode.Uri.file(exports.getDocPath(p));
};
function setTestContent(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const all = new vscode.Range(exports.doc.positionAt(0), exports.doc.positionAt(exports.doc.getText().length));
        return exports.editor.edit(eb => eb.replace(all, content));
    });
}
exports.setTestContent = setTestContent;
//# sourceMappingURL=helper.js.map