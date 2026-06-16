import mongoose, { Document, Schema } from "mongoose";


export interface IProject extends Document {

    name: string;

    description?: string;

    workspace: mongoose.Types.ObjectId;

    createdBy: mongoose.Types.ObjectId;

    status: "ACTIVE" | "COMPLETED" | "ARCHIVED";

}


const projectSchema = new Schema<IProject>(
    {

        name: {

            type: String,
            required: true,
            trim: true

        },


        description: {

            type: String,
            default: ""

        },


        workspace: {

            type: Schema.Types.ObjectId,
            ref: "Workspace",
            required: true

        },


        createdBy: {

            type: Schema.Types.ObjectId,
            ref: "User",
            required: true

        },


        status: {

            type: String,

            enum: [
                "ACTIVE",
                "COMPLETED",
                "ARCHIVED"
            ],

            default: "ACTIVE"

        }

    },


    {
        timestamps: true
    }

);


export default mongoose.model<IProject>(
    "Project",
    projectSchema
);