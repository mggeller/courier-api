import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Order from "../model/order";

export const collections: { orders?: mongoDB.Collection<Order> } = {};

export const connectToDatabase = async () => {
  dotenv.config();
  if (!process.env.DB_CONN_STRING || !process.env.ORDERS_COLLECTION_NAME) {
    console.log("process.env.DB_CONN_STRING is ", process.env.DB_CONN_STRING);
    return;
  }
  const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

  await client.connect();

  const db = client.db(process.env.DB_NAME);

  await applySchemaValidation(db);

  const orderCollection = db.collection<Order>(
    process.env.ORDERS_COLLECTION_NAME
  );

  collections.orders = orderCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${orderCollection.collectionName}`
  );
};

export const applySchemaValidation = async (db: mongoDB.Db) => {
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
  
    await db.command({
      collMod: process.env.ORDERS_COLLECTION_NAME,
      validator: jsonSchema
    }).catch(async (error: mongoDB.MongoServerError) => {
      if (error.codeName === 'NamespaceNotFound' && process.env.ORDERS_COLLECTION_NAME) {
          await db.createCollection(process.env.ORDERS_COLLECTION_NAME, {validator: jsonSchema});
      }
    });
  };
