const User =require("../models/User")
const jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt");
// const { default: toast } = require("react-hot-toast");
require('dotenv').config();

//signUp

exports.signUp=async(req,res)=>{   
    try {
     
        const{  firstName, lastName  ,email,password   }=req.body;
        console.log(req.body)
         
        const existingUser=await User.findOne({email});

        

        const hashedPassword=await bcrypt.hash(password,10);



        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exist",
            })
        }

        const user =await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword ,
            
          

        });

        return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});




    } catch (error) {
        console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
    }
}


//login


exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password) {
            //Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            });
        }

        const user = await User.findOne({email})

        if(!user) {
            return res.status(401).json({
                //Return 401 unauthorized status code with error message
                success: false,
                message: `User is not registered with Us, Please signup to Continue`,
            });
           
        }

        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,

            }

            const token =jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h',
            });

            user.token=token;
            user.password=undefined;

            const options={
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie('token',token,options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
        }else{
            return res.status(401).json({
                success: false,
                message: `Password Is Incorrect`,
            });
        }

     



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
}
