"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailProcess = (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Processing job:', job.data);
    if (job.attemptsMade > 2) {
        throw new Error(`server is down`);
    }
    let testAccount = yield nodemailer_1.default.createTestAccount();
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "d@gmail.com",
            pass: "1234",
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    console.log(job.data);
    const info = yield transporter.sendMail(job.data);
    const testMessageUrl = nodemailer_1.default.getTestMessageUrl(info);
    console.log("Message sent: %s", info.messageId);
    console.log("Test message URL: ", testMessageUrl);
    return testMessageUrl;
});
exports.default = emailProcess;
