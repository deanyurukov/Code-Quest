import { Schema, model } from "mongoose";

const savedAnswerSchema = new Schema(
    {
        date: {
            type: String,
            required: true,
            unique: true,
        },
        selected: {
            type: Number,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        },
        answeredAt: {
            type: String,
            required: true
        },
        correctAnswerIndex: {
            type: Number,
            required: true
        }
    },
    { _id: false }
);

const userSchema = new Schema(
    {
        username: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            default: "",
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        answers: {
            type: [savedAnswerSchema],
            default: []
        },
        xp: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);
export default User;