import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";

const app = express();
await connectCloudinary();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
    res.send("server is live");
});

app.use("/api/ai", aiRouter);

app.listen(port, () => {
    console.log(`server running at ${port}`);
});
