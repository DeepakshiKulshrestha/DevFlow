import mongoose, {
    Schema,
    Document,
    Types
} from "mongoose";


export interface IIssue extends Document {

    title: string;

    description?: string;

    status:
        | "TODO"
        | "IN_PROGRESS"
        | "DONE";

    priority:
        | "LOW"
        | "MEDIUM"
        | "HIGH";

    project: Types.ObjectId;

    createdBy: Types.ObjectId;

    assignedTo?: Types.ObjectId;

    dueDate?: Date;

}



const issueSchema =
    new Schema<IIssue>(

        {

            title: {

                type: String,

                required: true,

                trim: true

            },



            description: {

                type: String,

                default: ""

            },



            status: {

                type: String,

                enum: [
                    "TODO",
                    "IN_PROGRESS",
                    "DONE"
                ],

                default: "TODO"

            },



            priority: {

                type: String,

                enum: [
                    "LOW",
                    "MEDIUM",
                    "HIGH"
                ],

                default: "MEDIUM"

            },



            project: {

                type: Schema.Types.ObjectId,

                ref: "Project",

                required: true

            },



            createdBy: {

                type: Schema.Types.ObjectId,

                ref: "User",

                required: true

            },



            assignedTo: {

                type: Schema.Types.ObjectId,

                ref: "User"

            },



            dueDate: {

                type: Date

            }

        },


        {

            timestamps: true

        }

    );



export default mongoose.model<IIssue>(
    "Issue",
    issueSchema
);