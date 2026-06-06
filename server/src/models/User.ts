import mongoose, { Document, Schema } from "mongoose";


export interface IUser extends Document {

    name: string;

    email: string;

    password: string;

    avatar?: string;

    status: "online" | "offline";

}


const userSchema = new Schema<IUser>(
    {

        name: {
            type: String,
            required: true,
            trim: true
        },


        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },


        password: {
            type: String,
            required: true
        },


        avatar: {
            type: String,
            default: ""
        },


        status: {
            type: String,
            enum: ["online", "offline"],
            default: "offline"
        }

    },

    {
        timestamps: true
    }
);


export default mongoose.model<IUser>(
    "User",
    userSchema
);