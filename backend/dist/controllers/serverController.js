"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialServer = void 0;
const initialServer = (req, res) => {
    res.json({ success: true, message: `Hello from techdome loan app server.` });
};
exports.initialServer = initialServer;
