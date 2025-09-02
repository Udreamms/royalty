"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleFollowUp = exports.sendMessageToProspect = exports.updateProspectStage = exports.findProspect = exports.gemini10Pro = void 0;
const googleai_1 = require("@genkit-ai/googleai");
Object.defineProperty(exports, "gemini10Pro", { enumerable: true, get: function () { return googleai_1.gemini10Pro; } });
const core_1 = require("@genkit-ai/core");
const firebase_1 = require("@genkit-ai/firebase");
const zod_1 = require("zod");
const ai_1 = require("@genkit-ai/ai");
// Initialize Genkit
(0, core_1.configureGenkit)({
    plugins: [(0, firebase_1.firebase)()],
    logLevel: 'debug',
    enableTracingAndMetrics: true,
});
// Define dummy tools for now
exports.findProspect = (0, ai_1.defineTool)({
    name: 'findProspect',
    description: 'Find a prospect by name or phone number',
    inputSchema: zod_1.z.object({ query: zod_1.z.string() }),
    outputSchema: zod_1.z.object({ success: zod_1.z.boolean(), message: zod_1.z.string() }),
}, async ({ query }) => {
    return { success: true, message: `Prospect found for ${query}` };
});
exports.updateProspectStage = (0, ai_1.defineTool)({
    name: 'updateProspectStage',
    description: 'Update the stage of a prospect',
    inputSchema: zod_1.z.object({ prospectId: zod_1.z.string(), newStageId: zod_1.z.string() }),
    outputSchema: zod_1.z.object({ success: zod_1.z.boolean(), message: zod_1.z.string() }),
}, async ({ prospectId, newStageId }) => {
    return { success: true, message: `Prospect ${prospectId} updated to stage ${newStageId}` };
});
exports.sendMessageToProspect = (0, ai_1.defineTool)({
    name: 'sendMessageToProspect',
    description: 'Send a message to a prospect',
    inputSchema: zod_1.z.object({ prospectId: zod_1.z.string(), message: zod_1.z.string() }),
    outputSchema: zod_1.z.object({ success: zod_1.z.boolean(), message: zod_1.z.string() }),
}, async ({ prospectId, message }) => {
    return { success: true, message: `Message sent to ${prospectId}` };
});
exports.scheduleFollowUp = (0, ai_1.defineTool)({
    name: 'scheduleFollowUp',
    description: 'Schedule a follow-up for a prospect',
    inputSchema: zod_1.z.object({ prospectId: zod_1.z.string(), delay: zod_1.z.string(), message: zod_1.z.string() }),
    outputSchema: zod_1.z.object({ success: zod_1.z.boolean(), message: zod_1.z.string() }),
}, async ({ prospectId, delay, message }) => {
    return { success: true, message: `Follow-up scheduled for ${prospectId}` };
});
//# sourceMappingURL=genkit.js.map