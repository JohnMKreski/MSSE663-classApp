import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const pizzaRouter = express.Router();
pizzaRouter.use(express.json());

//.find({}) finds everything in the db "({})"
/** 
 * collections"?".pizzas"?".... the questions marks allow nested 
 * folders to be searched without throwing an error if they do not exist.
 * IF they do not exist, it will return "Undefined"
 * this keeps typescript happy
 * */
pizzaRouter.get("/", async (_req, res) => {
    try {
        const pizzas = await collections?.pizzas?.find({}).toArray();
        res.status(200).send(pizzas);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

pizzaRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const pizza = await collections?.pizzas?.findOne(query);

        if (pizza) {
            res.status(200).send(pizza);
        } else {
            res.status(404).send(`Failed to find a pizza: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a pizza: ID ${req?.params?.id}`);
    }
});

pizzaRouter.post("/", async (req, res) => {
    try {
        const pizza = req.body;
        const result = await collections?.pizzas?.insertOne(pizza);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new employee: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new employee.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

pizzaRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const pizza = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.pizzas?.updateOne(query, { $set: pizza });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a pizza: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a pizza: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a pizza: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

pizzaRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.pizzas?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a pizza: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a pizza: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a pizza: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});