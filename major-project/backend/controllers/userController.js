const UserModel = require ("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email:email});

    if(!user){
        return res.status(404).json({msg:"User not found"});
    }

    const isPasswordMatchingFromDb = await bcrypt.compare(password,user.password);
    
    if(isPasswordMatchingFromDb){
        const token = jwt.sign({userId : user._id}, "randomsecret");
        return res.status(200).json({
            user:user,
            token:token,
        });
    }
    return res.status(401).send("Incorrect credentials");
}

const signupUser = async (req,res) =>{
    const {email, password , name} = req.body;

    const emailExists = await UserModel.findOne({email :email });
    if(emailExists){
        return res.status(400).json({error : "Email already exists" });
        }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser= new UserModel({
        name:name,
        email:email,
        password:hashedPassword,
    });

    const savedUser =newUser.save();
    //creating payload
    const token =jwt.sign({userId:savedUser._id},"randomsecret");
    return res.status(200).json({
        token:token,
        user:newUser,
    })
}

module.exports={signupUser,loginUser}