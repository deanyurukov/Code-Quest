import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/user", async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: "User id is required" });
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to get user" });
    }
});

router.post("/user/anonymous", async (req, res) => {
    try {
        const user = await User.create({});
        console.log(user);

        res.status(201).json({ userId: user._id });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

export default router;