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

router.get("/ranks/:id", async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id,
            isVerified: true
        }).select("xp");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const usersAhead = await User.countDocuments({
            isVerified: true,
            xp: { $gt: user.xp }
        });

        return res.status(200).json({
            rank: usersAhead + 1
        });
    }
    catch (e) {
        console.error(e);
        return res.sendStatus(500);
    }
});

export default router;