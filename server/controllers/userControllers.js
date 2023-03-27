const User = require("../models/user");
const bycrypt=require('bcryptjs');

//now get all user from the database in the homepage

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No user found" });
  } else {
    return res.status(202).json({ users });
  }
};
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(402).json({ message: "Plz fill all the field" });
  }
  try {
    const existing_user = await User.findOne({ email });
    
    if (existing_user) {
       // console.log(existing_user.name, existing_user.email);
      return res.status(400).json({ message: "User already exists" });
    } else {
      const user = new User({
        name,
        email,
        password,
        blogs:[]
      });
      await user.save();
      res
        .status(202)
        .json({ message: "User is registered successfully", userId: user._id});
    }
  } catch (error) {
    console.log(error);
  }
};

const login =async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
          return res.status(402).json({ message: "Plz fill all the field" });
    }
    try {
        const user=await User.findOne({email});
        if(user)
        {
            const isMatch=await bycrypt.compare(password,user.password);
            if(isMatch)
            {
              //console.log(user._id);
              return  res.status(202).json({message:"User login successfully",userId:user._id});
            }
            else 
            {
               return res.status(402).json({message:"Invalid Credential"});
            }
        }
        else {
            return res.status(402).json({message:"User not found Create account first"});
        }
    } catch (error) {
        console.log(error);
    }

}

//exporting

module.exports = { getAllUser, signup,login };
