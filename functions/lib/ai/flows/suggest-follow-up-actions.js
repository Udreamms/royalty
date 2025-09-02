"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestFollowUpActions = void 0;
const genkit_1 = require("@/ai/genkit");
const flow_1 = require("@genkit-ai/flow");
const zod_1 = require("zod");
exports.suggestFollowUpActions = (0, flow_1.defineFlow)({
    name: 'suggestFollowUpActions',
    inputSchema: zod_1.z.object({
        communicationHistory: zod_1.z.string(),
        prospectDetails: zod_1.z.string(),
    }),
    outputSchema: zod_1.z.object({
        followUpAction: zod_1.z.string(),
        reasoning: zod_1.z.string(),
    }),
}, async ({ communicationHistory, prospectDetails }) => {
    const prompt = `
      Based on the following communication history and prospect details,
      suggest the best follow-up action.

      Communication History:
      ${communicationHistory}

      Prospect Details:
      ${prospectDetails}
    `;
    await (0, flow_1.generate)({
        prompt,
        model: genkit_1.gemini10Pro,
        config: {
            temperature: 0.5,
        },
    });
    const followUpAction = "Suggested action from LLM";
    const reasoning = "Reasoning from LLM";
    return {
        followUpAction,
        reasoning,
    };
});
//# sourceMappingURL=suggest-follow-up-actions.js.map