import { pool } from "../configs/db.js";

export const getUserCreations = async (req,res) =>{
    try {
        const {userId} = req.auth();

        const creations = await pool.query(`SELECT * FROM "Creations" WHERE user_id = $1 ORDER BY created_at DESC`,[userId]);

        res.json({
            success : true,
            creations
        });

    }catch (err){
        res.json({
            success: false,
            message: err.message
        })
    }
}

export const getPusblishedCreations = async (req,res) =>{
    try {
        console.log("Controller reached");

        const creations = await pool.query(`SELECT * FROM "Creations" WHERE published = true ORDER BY created_at DESC`);
        console.log("Database query succeeded");

        res.json({
            success : true,
            creations: creations.rows
        });
        
    }catch (err){
        console.error("getPublishedCreations error:", err);

        res.json({
            success: false,
            message: err.message
        })
    }
}

export const toggleLikeCreations = async (req,res) =>{
    try {
        const {userId} = req.auth();
        const {id} = req.body;

        const [creation ] = await pool.query(`select * from "Creations" where id = $1`,[id]);

        if(!creation){
            return res.json({
                success: false,
                message: "Creation not found"
            })
        }

        const currentLikes = creation.likes;
        const userIdStr = userId.toString();

        let updatedLikes;
        let message;

        if(!currentLikes.includes(userIdStr)){
            updatedLikes = currentLikes.filter( (user) => user !== userIdStr);
            message = "creation Unliked"
        }else{
            updatedLikes = [...currentLikes,userIdStr]
            message = "creation liked";
        }

        const formattedArray = `{${updatedLikes.join(",")}}`;


        await pool.query(`update "Creations" set likes = $1::text[] where id = $2`,[formattedArray,id]);


        res.json({
            success : true,
            message
        });
        
    }catch (err){
        res.json({
            success: false,
            message: err.message
        })
    }
}