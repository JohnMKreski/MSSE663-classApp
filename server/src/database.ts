import * as mongodb from "mongodb";
// import { Employee } from "./pizza";
import { Pizza } from "./pizza-interface";


export const collections: {
    pizzas?: mongodb.Collection<Pizza>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("classApp"); //if it doesn't exist, it will create it "x"
    await applySchemaValidation(db);

    //If we dont already have the connection, it will create for us
    const pizzasCollection = db.collection<Pizza>("pizzas");
    collections.pizzas = pizzasCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        //jsonScheme will apply this scheme of validations onto the databse
        //good practice to make sure the data applied follows the shape of our model
        $jsonSchema: {
            bsonType: "object",
            required: ["size", "toppings"],
            additionalProperties: false,
            properties: {
                _id: {},
                size: {
                    bsonType: "string",
                    description: "'size' is required and is a string",
                },
                toppings: {
                    bsonType: "string",
                    description: "'toppings' is required and is a string",
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "pizzas",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("pizzas", {validator: jsonSchema});
        }
    });
}