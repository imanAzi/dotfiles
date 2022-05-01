"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Electron inter process communication channels
var ElectronChannels;
(function (ElectronChannels) {
    ElectronChannels["setInjectorConfig"] = "controlInjector:set-injector-config";
    ElectronChannels["injectRawInput"] = "controlInjector:inject-raw-input";
    ElectronChannels["setInjectionRect"] = "controlInjector:set-injection-rect";
    ElectronChannels["allowSingleController"] = "controlInjector:allow-single-controller";
    ElectronChannels["setAvatar"] = "controlInjector:set-avatar";
    ElectronChannels["quit"] = "quit";
})(ElectronChannels = exports.ElectronChannels || (exports.ElectronChannels = {}));
exports.avatarBase64 = 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAFIUlEQVRYR82Yf0xVZRjHv88FrrlSVMK0TFC2RJoVuLlBP5hpcK8x2qqB1ZI/NMEwRUTkXly7c4EIcgWGBkYrQzcxapN+XCBLWaZlU2wrUtqA1GopMqEhv+Q87Rw8BPde7j3v4a66f7Cx836/z+c87/s+z3tegs6f2VIWLNHt5QZgGZjDQBTKzAtkOyJqZ6CdgDYJOAsjjjfYMrv0hCIRUbx171yC9AYxJYCwRETLwHkwPmei/Q35W/7QqtUEKIMZWMoGKBWEqVrN3Y5j9DGhgkFFWkA9AvoUzJn2Dmi/Uco/acvqnOilJwR82GYzzh+cXgogbVIZ8y6uuGzs2fyTzTbobqhbwBWW8qAAGqgjUIx3/8mPYPDpIZ6S+OWujTec3VwAl66vDAgO6m0iQvTkQ2t3YPCp6533PH3uQOrQWJULoMlSXEFEqdqtfTeSmSvrd20dt6TGAcbn2tMMjLd9F1LcSSJsaMjLrFCVo4CrthXOkQL82gl0l7itDxWMPokoTC1Bo4CTmdrI0PuxatkjCJkTrJBe7+7BmR9/wafnWvSSlzryMzOUriT/WZmzd2EAcSsIfqKOuUkmPP7oYlz9sxMtHVcVeejcYDw0/wG0Xv4NOw99gq7ePjHbMVlUAE0W+/tESBFzAWS4qPAwvPfZCZdsyVndkLhCscx5t1YYUt0wI4BW+0UCFokArn4iCmvMsdh9+BiaWtrcSmfdPRWl6a/gYsdV5B2tF7EHA5fq8zPDKc6yJ9yPDD8LqQGUpCaht38AuQePeZSueyYG5uhIvLBzn2gIDLO0mEwWew4Rdomo5cwcsqZh/8cNXjeCyFhnBmZYyGwpPgKi5P8jIJhryGyxnwQhVgRQHvvRm+n48KszOHLqvEfpwtmzUL45xeNandCA0URma3EHQCGigP/GGpQ3ipzBfhCmiAImLI3A68/H4wNH04RZlLNXlPYSvr7QgpK6E6IhwMzdZLIU3ySiQGE1gIzE5XjysQg4zjSj6ovT4yzkF0heEYMb3T3IqDyqx/4OoI4aODaaWkZu9Q+gr39g9NG8++5Fc2sbimsbhYu0aqJOsa5NIpvIxfrZmCgEBU5TWp3cg2/1DSg9OWjGdCWO3ulVxMom0VFmZK3agxu/u4C6b39A2zXXr0o5u7GREUpm9bQ7pczoKdRqDy6rdUzY5tRpkgt1wdoXdfVkpVCLtjp193rqwc47Qm9PVlqd6GFBa/1zhlRfbGPpQbfLwaXNqYcF+YHZai8BsNlbLZCPUHmvJSP3nRo0d/zubbjL8+rsdWhqbnEpSe6NeLcjf2uOksG4HUULDJKhxdtxX130rxZWCcPJgryU5xSdtxMQg/ulQSmkcc+2a6NHfrO1uACg7Z4iy4U5InQe1pdV6wLUrh/JnhxkFHDl9oJAf0PAr3q7ii5i96IeGP0fdNg29YwDlP+Jt9pfNgCHfRhM3Eri1Y6CrTWq0OXDXctUi0fVqvhnaicEhM1mMA9OOwHQU1ptfTTO4TD2JMBmk8b6ub08issqmu0X4Pc9CPN9FNyjDYOv3B4eWnJ8d06388D//PqNwVVXjH+lC12/jX0L5b5GQrmej3ovaRuWiNIa8rd4LKqaroBNO0oWQRrOImANQMbJTDszhoi4mg1+hfVvZVzy5qUJUDUxZ5fNY/8huYCu9dZ1nAMzcy+IDtBtf7ujcNPIHYmGnxDgWD+TZW80QUpiwjICzQTzTCbMUIor4yYDN0HoAugbJtQ25GWe1cDjMuRvB5EylUlS6sAAAAAASUVORK5CYII=';
exports.ghostAvatarBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
exports.liveShareUserSettingsFileName = '.vs-liveshare-settings.json';
exports.logDirectoryName = 'VSFeedbackVSRTCLogs';
//# sourceMappingURL=constants.js.map