"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crmAssistant = void 0;
const genkit_1 = require("@/ai/genkit");
const flow_1 = require("@genkit-ai/flow");
const zod_1 = require("zod");
const crmTools = [
    genkit_1.findProspect,
    genkit_1.updateProspectStage,
    genkit_1.sendMessageToProspect,
    genkit_1.scheduleFollowUp,
];
exports.crmAssistant = (0, flow_1.defineFlow)({
    name: 'crmAssistant',
    inputSchema: zod_1.z.string(),
    outputSchema: zod_1.z.string(),
}, async (prompt) => {
    const llmResponse = await (0, flow_1.generate)({
        prompt,
        model: genkit_1.gemini10Pro,
        tools: crmTools,
        config: {
            temperature: 0.3,
        },
    });
    const toolCalls = llmResponse.toolCalls();
    if (toolCalls.length > 0) {
        const toolResults = await Promise.all(toolCalls.map(async (toolCall) => {
            const toolResult = await (0, flow_1.runTool)(toolCall);
            return {
                toolResult,
                toolCall,
            };
        }));
        const toolResponse = await (0, flow_1.generate)({
            prompt: `Based on the results of the tools, provide a summary to the user.`,
            history: [
                { role: 'user', content: prompt },
                ...toolResults.map(({ toolResult, toolCall }) => ({
                    role: 'tool',
                    content: toolResult,
                    toolCall,
                })),
            ],
            model: genkit_1.gemini10Pro,
        });
        return toolResponse.text();
    }
    return llmResponse.text();
});
//# sourceMappingURL=crm-assistant.js.map