import express from "express";
import cors from "cors";
import 'dotenv/config';
import {clerkMiddleware} from "@clerk/express"
import aiRouter from "./routes/aiRoutes.js";
const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())

app.get("/",(req,res) => {
    res.send('server is live');
});

app.use('/api/ai',aiRouter);
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})