import { Schema, model } from "mongoose";

const savedAnswerSchema = new Schema(
    {
        date: {
            type: String,
            required: true
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
        },
        difficulty: {
            type: String,
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
            validate: {
                validator: function (value) {
                    if (!this.isVerified && value === "") return true;

                    return value.length >= 3 && value.length <= 20;
                },
                message: "Username must be between 3 and 20 characters long"
            }
        },
        email: {
            type: String,
            default: "",
            validate: {
                validator: function (value) {
                    if (!this.isVerified && value === "") return true;

                    return value.length >= 5 && value.length <= 100;
                },
                message: "Email must be between 5 and 100 characters long"
            }
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
        },
        joinedOn: {
            type: Date,
            default: new Date()
        }
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);
export default User;