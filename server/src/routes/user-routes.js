import express from "express";
import User from "../models/user.js";

const router = express.Router();



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