import jwt from "jsonwebtoken";
import { db } from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function createTransaction(req, res) {
    const { value, description, type } = req.body;

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const formattedDate = dayjs().toDate();  

        await db.collection("transactions").insertOne({
            userId: new ObjectId(decoded.userId),
            createdAt: formattedDate,  
            value,
            description,
            type
        });

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}


export async function getTransaction(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.userId) });

        if (!user) return res.status(401).send("Usuário não existe!!");

        let page = parseInt(req.query.page)|| 1;
        if (page <= 0 || isNaN(page)) return res.status(400).send("Página inválida. Deve ser um número positivo.");

        const limit = 10;  
        const skip = (page - 1) * limit;  

        const transactions = await db.collection("transactions")
            .find({ userId: new ObjectId(decoded.userId)})  
            .sort({ createdAt: -1 }) 
            .skip(skip) 
            .limit(limit)  
            .toArray();

        res.status(200).send(transactions);  
    } catch (err) {
        res.status(500).send(err.message); 
    }
};


export async function updateTransaction(req, res) {
    const { id } = req.params;
    const { value, description, type } = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "").trim();

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = new ObjectId(decoded.userId);

        const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) });
        if (!transaction) return res.status(404).send("Transação não encontrada");
        if (!transaction.userId.equals(userId)) return res.status(401).send("Você não pode editar esta transação");

        await db.collection("transactions").updateOne(
            { _id: new ObjectId(id) },
            { $set: { value, description, type } }
        );
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Erro no servidor");
    }
}

export async function deleteTransaction (req, res) {
    const { id } = req.params;
    const token = req.headers.authorization?.replace("Bearer ", "").trim();
    if (!token) return res.sendStatus(401);


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = new ObjectId(decoded.userId);

        const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) });
        if (!transaction) return res.status(404).send("Transação não encontrada");

        if (!transaction.userId.equals(userId)) return res.status(401).send("Você não pode deletar esta transação");

        await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
}
