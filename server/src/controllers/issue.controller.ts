import { Request, Response } from "express";
import mongoose from "mongoose";

import Issue from "../models/Issue";
import Project from "../models/Project";



// CREATE ISSUE


export const createIssue = async (
    req: Request,
    res: Response
) => {

    try {


        const userId =
            req.user!._id as mongoose.Types.ObjectId;



        const {
            title,
            description,
            priority,
            projectId,
            assignedTo,
            dueDate
        } = req.body;




        const project =
            await Project.findById(projectId);



        if (!project) {

            return res.status(404).json({

                success:false,

                message:"Project not found"

            });

        }




        const issue =
            await Issue.create({

                title,

                description,

                priority,

                project: projectId,

                assignedTo,

                dueDate,

                createdBy: userId

            });




        res.status(201).json({

            success:true,

            message:"Issue created successfully",

            issue

        });



    } catch(error){


        console.log(error);


        res.status(500).json({

            success:false,

            message:"Issue creation failed"

        });


    }


};





// GET PROJECT ISSUES


export const getProjectIssues = async (
    req: Request,
    res: Response
) => {


    try {

        const projectId = req.params.projectId as string;



const issues =
    await Issue.find({

        project:
        new mongoose.Types.ObjectId(projectId)

    })
            .populate(
                "createdBy",
                "name email"
            )
            .populate(
                "assignedTo",
                "name email"
            );




        res.status(200).json({

            success:true,

            issues

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:"Could not fetch issues"

        });


    }


};