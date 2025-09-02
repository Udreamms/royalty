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
exports.getAllFlows = exports.deleteFlow = exports.updateFlow = exports.getFlowById = exports.createFlow = void 0;
const admin = __importStar(require("firebase-admin"));
const getFlowsCollection = () => {
    return admin.firestore().collection("automationFlows");
};
const createFlow = async (flowData) => {
    const flowsCollection = getFlowsCollection();
    const newFlowRef = await flowsCollection.add({
        ...flowData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const newFlowDoc = await newFlowRef.get();
    return { id: newFlowDoc.id, ...newFlowDoc.data() };
};
exports.createFlow = createFlow;
const getFlowById = async (flowId) => {
    const flowsCollection = getFlowsCollection();
    const doc = await flowsCollection.doc(flowId).get();
    if (!doc.exists) {
        throw new Error(`Flow with id ${flowId} not found`);
    }
    return { id: doc.id, ...doc.data() };
};
exports.getFlowById = getFlowById;
const updateFlow = async (flowId, updates) => {
    const flowsCollection = getFlowsCollection();
    const flowRef = flowsCollection.doc(flowId);
    await flowRef.update(updates);
    return (0, exports.getFlowById)(flowId);
};
exports.updateFlow = updateFlow;
const deleteFlow = async (flowId) => {
    const flowsCollection = getFlowsCollection();
    await flowsCollection.doc(flowId).delete();
};
exports.deleteFlow = deleteFlow;
const getAllFlows = async () => {
    const flowsCollection = getFlowsCollection();
    const snapshot = await flowsCollection.get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
exports.getAllFlows = getAllFlows;
//# sourceMappingURL=flow.service.js.map