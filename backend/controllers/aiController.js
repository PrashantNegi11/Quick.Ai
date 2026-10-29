import OpenAI from "openai";
import { pool } from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from "cloudinary";
import 'dotenv/config'

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
export const generateArticle = async (req,res) => {
    try{
        const {userId} = req.auth();
        const {prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >= 10){
            return res.json({
                success: false,
                message: "Limit Reached. Upgrade to continue."
            })
        }

        const response = await AI.chat.completions.create({
            model: "gemini-3.8-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
        });
        
        const content = response.choices[0].message.content;

        await pool.query(`insert into "Creations" (user_id, prompt, content, type) values($1,$2,$3,$4)`,[userId,prompt,content,'article']);
        
        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({
            success: true,
            content
        });
    }catch(err){

        res.json({
            message: err.message,
            success: false
        });
    }
}

export const generateBlogTitle = async (req,res) => {
    try{
        const {userId} = req.auth();
        const {prompt} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;


        if(plan !== 'premium' && free_usage >= 10){
            return res.json({
                success: false,
                message: "Limit Reached. Upgrade to continue."
            })
        }

        const response = await AI.chat.completions.create({
            model: "gemini-3.8-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            temperature: 0.7,
            max_tokens: 100,
        });

        const content = response.choices[0].message.content;

        await pool.query(`insert into "Creations" (user_id, prompt, content, type) values($1,$2,$3,$4)`,[userId,prompt,content,'blog-title']);

        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({
            success: true,
            content
        });
    }catch(err){
        res.json({
            message: err.message,
            success: false
        });
    }
}

export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: "This feature is only available for premium subscriptions"
            });
        }

        const form = new FormData();
        form.append('prompt', prompt);

        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            form,
            {
                headers: { 'x-api-key': process.env.IMAGE_API_KEY },
                responseType: 'arraybuffer',
            }
        );

        const base64Image = `data:image/png;base64,${Buffer.from(data).toString('base64')}`;
        
        
        const { secure_url } = await cloudinary.uploader.upload(base64Image);

        
        await pool.query(
            `insert into "Creations" (user_id, prompt, content, type, publish) values ($1, $2, $3, $4, $5)`,
            [userId, prompt, secure_url, 'image', publish ?? false]
        );
        res.json({
            success: true,
            content: secure_url
        });
    } catch (err) {
        
        res.json({
            success: false,
            message: err.message
        });
    }
};