import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";


// SIGNUP CONTROLLER

export const signup = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        // check existing user

        const existingUser =
            await User.findOne({ email });


        if(existingUser){

            return res.status(400).json({
                success:false,
                message:"User already exists"
            });

        }


        // hash password

        const hashedPassword =
            await bcrypt.hash(password,10);



        // create user

        const user = await User.create({

            name,

            email,

            password: hashedPassword

        });



        res.status(201).json({

            success:true,

            message:"User created successfully",

            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }

        });


    } catch(error){

        res.status(500).json({

            success:false,

            message:"Signup failed"

        });

    }

};