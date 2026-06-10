import mongoose, { Document, Schema } from "mongoose";


export interface IWorkspace extends Document {

    name: string;

    description?: string;

    owner: mongoose.Types.ObjectId;

    members: {
        user: mongoose.Types.ObjectId;
        role: "OWNER" | "ADMIN" | "MEMBER";
    }[];

}


const workspaceSchema = new Schema<IWorkspace>(
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


        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },


        members: [

            {

                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                },

                role: {

                    type: String,

                    enum: [
                        "OWNER",
                        "ADMIN",
                        "MEMBER"
                    ],

                    default: "MEMBER"

                }

            }

        ]

    },

    {
        timestamps: true
    }
);


export default mongoose.model<IWorkspace>(
    "Workspace",
    workspaceSchema
);