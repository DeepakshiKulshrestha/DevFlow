import mongoose, {
    Schema,
    Document,
    Types
} from "mongoose";



export interface IActivity extends Document {


    action:
        | "PROJECT_CREATED"
        | "ISSUE_CREATED"
        | "ISSUE_UPDATED"
        | "ISSUE_COMPLETED";


    message: string;


    user: Types.ObjectId;


    project?: Types.ObjectId;


    issue?: Types.ObjectId;


}



const activitySchema =
    new Schema<IActivity>(

        {


            action: {

                type: String,

                enum: [
                    "PROJECT_CREATED",
                    "ISSUE_CREATED",
                    "ISSUE_UPDATED",
                    "ISSUE_COMPLETED"
                ],

                required: true

            },



            message: {

                type: String,

                required: true

            },



            user: {

                type: Schema.Types.ObjectId,

                ref: "User",

                required: true

            },



            project: {

                type: Schema.Types.ObjectId,

                ref: "Project"

            },



            issue: {

                type: Schema.Types.ObjectId,

                ref: "Issue"

            }


        },


        {
            timestamps:true
        }


    );




export default mongoose.model<IActivity>(
    "Activity",
    activitySchema
);