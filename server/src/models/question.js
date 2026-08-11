import { Schema, Types, model } from "mongoose";

const questionSchema = new Schema(
    {
        date: {
            type: String,
            unique: true
        },
        question: String,
        answers: [String],
        topic: String,
        difficulty: String,
        correctAnswerIndex: {
            type: Number,
            min: 0,
            max: 3
        },
        submissions: {
            default: 0,
            type: Number,
        },
        explanation: String
    },
    {
        timestamps: true,
    }
);

const Question = model("Question", questionSchema);
export default Question;