"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidate = void 0;
const emailValidate = (email) => {
    let emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegExp.test(email);
};
exports.emailValidate = emailValidate;
