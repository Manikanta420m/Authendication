const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async(req,res)=>{
    try{
       const {username,email,password,role}=req.body;
       const checkExistingUser = await user.findOne({$or :[{username},{email}]});
       if(checkExistingUser){
        return res.status(400).json({
          success : false,
          message : 'User is already exists with same deatils'
        });
       }
       
       const salt= await bcrypt.genSalt(10);
       const hashedPassword= await bcrypt.hash(password,salt);

       const newlyCreatedUser = new user({
          username,
          email,
          password: hashedPassword,
          role : role || 'user'
       })

       await newlyCreatedUser.save();

       if(newlyCreatedUser){
        res.status(201).json({
            success : true,
            message : 'User registeres successfully'
        })
       }
       else{
         res.status(400).json({
            success : true,
            message : 'unable to register user'
        })
       }       
    }
    catch(e){
        console.log(e);
        res.status(500).json({
           success : false,
           message : 'Some error occured! please retry'
        });
    }
};


const loginUser = async(req,res)=>{
    try{
       const {username,password} = req.body;

       const User= await user.findOne({username});

       if(!User){
        return res.status(400).json({
            success : false,
            message : 'Invalid userName or pass'
        })
       }

       const isPasswordMatch = await bcrypt.compare(password,User.password);

       if(!isPasswordMatch){
        return res.status(400).json({
            success : false,
            message : 'Invalid userName or pass'
        })
       }
       
       const accessToken=jwt.sign({
          userId : user._id,
          username : user.username,
          role : user.role
       },process.env.JWT_SECRET_KEY,{
        expiresIn : '15m'
       });

       res.status(200).json({
         success : true,
         message : 'Loggedin Successfully',
         accessToken
       });

    }
    catch(e){
        console.log(e);
        res.status(500).json({
           success : false,
           message : 'Some error occured! please retry'
        });
    }
};

module.exports = {registerUser,loginUser};