"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailQueue = exports.sendNewEmail = void 0;
const bull_1 = __importDefault(require("bull"));
const emailprocess_1 = __importDefault(require("../process/emailprocess"));
const emailQueue = new bull_1.default("email", {
    redis: {
        host: '127.0.0.1',
        port: 6379,
    },
    limiter: {
        max: 1000,
        duration: 5000,
    }
});
exports.emailQueue = emailQueue;
emailQueue.process(emailprocess_1.default);
const sendNewEmail = (data) => {
    emailQueue.add(data, {
        attempts: 5,
        priority: 3
    });
    console.log('Job added to the queue:', data);
};
exports.sendNewEmail = sendNewEmail;
