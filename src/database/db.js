import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
export let db;

try {
  await mongoClient.connect();
  db = mongoClient.db();
  console.log("Conexão com o MongoDB estabelecida com sucesso!");
} catch (err) {
  console.log("Erro ao se conectar com MongoDB:", err);
}
