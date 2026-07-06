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
        correctAnswerIndex: Number
    },
    {
        timestamps: true,
    }
);

const Question = model("Question", questionSchema);
export default Question;