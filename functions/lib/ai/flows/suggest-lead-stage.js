"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestLeadStage = void 0;
const genkit_1 = require("@/ai/genkit");
const flow_1 = require("@genkit-ai/flow");
const zod_1 = require("zod");
exports.suggestLeadStage = (0, flow_1.defineFlow)({
    name: 'suggestLeadStage',
    inputSchema: zod_1.z.object({
        communicationHistory: zod_1.z.string(),
        stageConfigs: zod_1.z.string(),
        prospectDetails: zod_1.z.string(),
    }),
    outputSchema: zod_1.z.object({
        suggestedStage: zod_1.z.string(),
        reasoning: zod_1.z.string(),
        reengage: zod_1.z.boolean(),
    }),
}, async ({ communicationHistory, stageConfigs, prospectDetails }) => {
    const prompt = `
      Based on the communication history, stage configurations, and prospect details,
      suggest the most appropriate stage for this lead.

      Communication History:
      ${communicationHistory}

      Stage Configurations:
      ${stageConfigs}

      Prospect Details:
      ${prospectDetails}
    `;
    await (0, flow_1.generate)({
        prompt,
        model: genkit_1.gemini10Pro,
        config: {
            temperature: 0.3,
        },
    });
    // Placeholder for actual logic to parse LLM response
    const suggestedStage = "pc_seguimiento";
    const reasoning = "Based on the conversation, the lead seems interested but has not yet booked an appointment.";
    const reengage = false;
    return {
        suggestedStage,
        reasoning,
        reengage,
    };
});
//# sourceMappingURL=suggest-lead-stage.js.map