import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../database/db.js";
import { ObjectId } from "mongodb";

export async function signUp (req, res) {
    const { name, email, password } = req.body;

    try {
        const existUser = await db.collection("users").findOne({ email });
        if (existUser) return res.status(409).send("Usuário já existe");

        const user = await db.collection("users").insertOne({
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        });
        return res.status(201).send("Usuário criado com sucesso!");

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn (req, res) {
    const { email, password } = req.body;

    try {
        const existUser = await db.collection("users").findOne({ email });
        if (!existUser) return res.status(404).send("Usuário ou senha incorretos");
        if (!bcrypt.compareSync(password, existUser.password)) return res.status(401).send("Usuário ou senha incorretos");

        const token = jwt.sign(
            { userId: existUser._id },
            process.env.JWT_SECRET
        );
        await db.collection("sessions").insertOne({ userId: existUser._id, token });
        res.send(token);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

