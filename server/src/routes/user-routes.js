import express from "express";
import User from "../models/user.js";
import { getQuestion } from "../services/question-service.js";
import { getSofiaDateString } from "../services/date-service.js";
import { sortUserAnswers } from "../services/user-service.js";
import bcrypt from "bcrypt";
import { getErrorMessage } from "../services/error-service.js";

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
        let user = await User.findOne({
            isVerified: false,
            answers: { $size: 0 }
        });

        if (!user) {
            user = await User.create({});
        }

        res.status(201).json({ userId: user._id });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

router.put("/user/submission", async (req, res) => {
    const xpLevels = { Beginner: 50, Intermediate: 100, Advanced: 150 };

    const { id, date, isCorrect, selected } = req.body;

    if (!id) {
        return res.status(400).json({ error: "User id is required" });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const question = await getQuestion(new Date(date));

    if (!question) {
        return res.status(404).json({ error: "Question not found" });
    }

    if (user?.answers.find(q => q.date === question?.date) !== undefined) {
        return res.status(409).json({ error: "User has already answered this question" });
    }

    user.answers.push({
        date,
        isCorrect,
        selected,
        answeredAt: getSofiaDateString(),
        correctAnswerIndex: question.correctAnswerIndex,
        difficulty: question.difficulty
    });

    user.answers = sortUserAnswers(user.answers);

    if (isCorrect) {
        user.xp += xpLevels[question.difficulty];
    }

    await user.save();

    res.json(user.answers);
});

router.post("/user/register", async (req, res) => {
    const { id, username, email, password } = req.body;

    if (!id) {
        return res.status(400).json({ error: "User id is required" });
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const userWithEmailExists = await User.countDocuments({ email: email.trim() });
    if (userWithEmailExists !== 0) {
        return res.status(409).json({ message: 'Account with email already exists' });
    }

    const userWithUsernameExists = await User.countDocuments({ username: username.trim() });
    if (userWithUsernameExists !== 0) {
        return res.status(409).json({ message: 'Account with username already exists' });
    }

    try {
        user.email = email.trim();
        user.username = username.trim();
        user.password = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
        user.isVerified = true;
        user.joinedOn = new Date();

        await user.validate();
        await user.save();

        return res.status(201).json({
            email: user.email,
            username: user.username
        });
    }
    catch (e) {
        console.error(e);
        return res.status(400).json({ message: getErrorMessage(e) });
    }
});

router.post("/user/login", async (req, res) => {
    const { email, password, id } = req.body;

    const user = await User.findOne({ email: email.trim() });
    if (!user) {
        return res.status(404).send({ message: 'Account with this email does not exist' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
        return res.status(401).json({ message: "Wrong password" });
    }

    try {
        await User.findByIdAndDelete(id);
        delete user.password;
        return res.status(200).json(user);
    }
    catch (e) {
        console.error(e);
        return res.status(400).json({ message: getErrorMessage(e) });
    }
});

export default router;