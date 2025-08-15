import express from "express";
import {
    createTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction
} from "../controllers/transactionController.js";

import validateSchema from "../middlewares/validateSchema.js";
import { transactionSchemas } from "../schemas/transactionSchemas.js";

const router = express.Router();

router.post("/transactions", validateSchema(transactionSchemas), createTransaction);
router.get("/transactions", getTransaction);
router.put("/transactions/:id", validateSchema(transactionSchemas), updateTransaction);
router.delete("/transactions/:id", deleteTransaction);

export default router;