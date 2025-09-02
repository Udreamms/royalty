"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = void 0;
const nodemailer = __importStar(require("nodemailer"));
const params_1 = require("firebase-functions/params");
const smtpUser = (0, params_1.defineString)('SMTP_USER');
const smtpPassword = (0, params_1.defineString)('SMTP_PASSWORD');
const senderEmail = (0, params_1.defineString)('SENDER_EMAIL');
let transporter = null;
const sendWelcomeEmail = async (prospectEmail, prospectName) => {
    if (!transporter) {
        console.log("Initializing nodemailer transporter...");
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: smtpUser.value(),
                pass: smtpPassword.value(),
            },
        });
    }
    const mailOptions = {
        from: `UDREAMMS <${senderEmail.value()}>`,
        to: prospectEmail,
        subject: `¡Bienvenido a UDREAMMS, ${prospectName}!`,
        html: `<h1>Hola ${prospectName},</h1><p>Gracias por registrarte. Estamos felices de tenerte con nosotros.</p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${prospectEmail}`);
};
exports.sendWelcomeEmail = sendWelcomeEmail;
//# sourceMappingURL=email.service.js.map