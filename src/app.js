import express, { application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(transactionRoutes);

app.listen(process.env.PORT || 5000, () => console.log(`Rodando na porta ${process.env.PORT}`))