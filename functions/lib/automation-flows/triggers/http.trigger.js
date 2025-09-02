"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowsApi = void 0;
const https_1 = require("firebase-functions/v2/https");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const flow_service_1 = require("../services/flow.service");
const corsOptions = {
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.post("/", async (req, res) => {
    try {
        const newFlow = await (0, flow_service_1.createFlow)(req.body);
        return res.status(201).json(newFlow);
    }
    catch (error) {
        console.error("Error creating flow:", error);
        return res.status(500).send("Something went wrong");
    }
});
app.get("/", async (req, res) => {
    try {
        const flows = await (0, flow_service_1.getAllFlows)();
        return res.status(200).json(flows);
    }
    catch (error) {
        console.error("Error listing flows:", error);
        return res.status(500).send("Something went wrong");
    }
});
app.get("/:flowId", async (req, res) => {
    try {
        const flow = await (0, flow_service_1.getFlowById)(req.params.flowId);
        return res.status(200).json(flow);
    }
    catch (error) {
        console.error(error);
        return res.status(404).send(error.message);
    }
});
app.put("/:flowId", async (req, res) => {
    try {
        const updatedFlow = await (0, flow_service_1.updateFlow)(req.params.flowId, req.body);
        return res.status(200).json(updatedFlow);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});
app.delete("/:flowId", async (req, res) => {
    try {
        await (0, flow_service_1.deleteFlow)(req.params.flowId);
        return res.status(200).json({ message: "Flow deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});
exports.flowsApi = (0, https_1.onRequest)({ region: "us-central1" }, app);
//# sourceMappingURL=http.trigger.js.map