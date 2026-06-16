import { Request, Response } from "express";
import mongoose from "mongoose";

import Project from "../models/Project";
import Workspace from "../models/workspace";



// CREATE PROJECT


export const createProject = async (
    req: Request,
    res: Response
) => {


    try {


        const userId =
            req.user!._id as mongoose.Types.ObjectId;


        const {
            name,
            description,
            workspaceId
        } = req.body;



        const workspace =
            await Workspace.findById(workspaceId);



        if(!workspace){

            return res.status(404).json({

                success:false,

                message:"Workspace not found"

            });

        }



        const isMember =
            workspace.members.some(

                (member) =>

                    member.user.toString()
                    ===
                    userId.toString()

            );



        if(!isMember){


            return res.status(403).json({

                success:false,

                message:
                "You are not a member of this workspace"

            });


        }



        const project =
            await Project.create({

                name,

                description,

                workspace: workspaceId,

                createdBy: userId

            });



        res.status(201).json({

            success:true,

            message:
            "Project created successfully",

            project

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:"Project creation failed"

        });


    }


};




// GET PROJECTS OF A WORKSPACE


export const getWorkspaceProjects = async (
    req: Request,
    res: Response
) => {


    try {


       const workspaceId = req.params.workspaceId as string;


const projects =
    await Project.find({

        workspace: new mongoose.Types.ObjectId(workspaceId)

    }).populate(

                "createdBy",

                "name email"

            );



        res.status(200).json({

            success:true,

            projects

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:"Failed to fetch projects"

        });


    }


};