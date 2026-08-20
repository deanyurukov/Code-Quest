import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/ranks", async (req, res) => {
    try {
        const users = await User.find({ isVerified: true })
            .select("username xp")
            .sort({ xp: -1, username: -1 })
            .limit(20);

        res.status(200).json(users);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

export default router;