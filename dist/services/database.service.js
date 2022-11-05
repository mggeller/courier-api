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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySchemaValidation = exports.connectToDatabase = exports.collections = void 0;
const mongoDB = __importStar(require("mongodb"));
const dotenv = __importStar(require("dotenv"));
exports.collections = {};
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv.config();
    if (!process.env.DB_CONN_STRING || !process.env.ORDERS_COLLECTION_NAME) {
        console.log("process.env.DB_CONN_STRING is ", process.env.DB_CONN_STRING);
        return;
    }
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    yield client.connect();
    const db = client.db(process.env.DB_NAME);
    yield (0, exports.applySchemaValidation)(db);
    const orderCollection = db.collection(process.env.ORDERS_COLLECTION_NAME);
    exports.collections.orders = orderCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${orderCollection.collectionName}`);
});
exports.connectToDatabase = connectToDatabase;
const applySchemaValidation = (db) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonSchema = {
        $jsonScehma: {
            bsonType: "object",
            required: ["orderToken"],
            additionalProperties: false,
            properties: {
                _id: {},
                orderToke: {
                    bsonType: "string",
                    description: "'orderToken' is required and is a string",
                },
            },
        },
    };
    yield db.command({
        collMod: process.env.ORDERS_COLLECTION_NAME,
        validator: jsonSchema
    }).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error.codeName === 'NamespaceNotFound' && process.env.ORDERS_COLLECTION_NAME) {
            yield db.createCollection(process.env.ORDERS_COLLECTION_NAME, { validator: jsonSchema });
        }
    }));
});
exports.applySchemaValidation = applySchemaValidation;
