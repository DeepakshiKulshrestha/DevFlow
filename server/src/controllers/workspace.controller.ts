import { Request, Response } from "express";
import mongoose from "mongoose";
import Workspace from "../models/workspace";


// CREATE WORKSPACE

export const createWorkspace = async (
    req: Request,
    res: Response
) => {

    try {

        const { name, description } = req.body;
        const userId = req.user!._id as mongoose.Types.ObjectId;


        const workspace = await Workspace.create({

            name,

            description,

           owner: userId,

members: [
    {
        user: userId,
        role: "OWNER"
    }
]

        });


        res.status(201).json({

            success: true,

            message: "Workspace created successfully",

            workspace

        });


    } catch(error){

        res.status(500).json({

            success:false,

            message:"Workspace creation failed"

        });

    }

};




// GET MY WORKSPACES


export const getMyWorkspaces = async (

    req: Request,

    res: Response

) => {


    try {
        const userId = req.user!._id as mongoose.Types.ObjectId;

        const workspaces = await Workspace.find({

            "members.user": userId

        }).populate(

            "members.user",

            "name email avatar"

        );



        res.status(200).json({

            success:true,

            workspaces

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:"Failed to fetch workspaces"

        });


    }


};