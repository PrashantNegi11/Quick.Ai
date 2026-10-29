import express from "express";
import { generateArticle, generateBlogTitle, generateImage, RemoveImageBackground, RemoveImageObject, reviewResume } from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";
import { upload } from "../configs/multer.js";

const aiRouter = express.Router();

aiRouter.post("/generate-article",auth,generateArticle);
aiRouter.post("/generate-blog-title",auth,generateBlogTitle);
aiRouter.post("/generate-image",auth,generateImage);
aiRouter.post("/remove-image-background",upload.single('image'),auth,RemoveImageBackground);
aiRouter.post("/remove-image-object",upload.single('image'),auth,RemoveImageObject);
aiRouter.post("/resume-review",upload.single('resume'),auth,reviewResume);





export default aiRouter;