import mongoose from "mongoose";

import Activity from "../models/Activity";



interface ActivityInput {


    action:
        | "PROJECT_CREATED"
        | "ISSUE_CREATED"
        | "ISSUE_UPDATED"
        | "ISSUE_COMPLETED";


    message: string;


    user: mongoose.Types.ObjectId;


    project?: mongoose.Types.ObjectId;


    issue?: mongoose.Types.ObjectId;


}



export const createActivity =
    async (
        data: ActivityInput
    ) => {


        const activityData: any = {

            action: data.action,

            message: data.message,

            user: data.user

        };



        if (data.project) {

            activityData.project =
                data.project;

        }



        if (data.issue) {

            activityData.issue =
                data.issue;

        }



        return await Activity.create(
            activityData
        );


    };