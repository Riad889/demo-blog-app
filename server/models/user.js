const mongoose = require("mongoose");
const bycrpt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  blogs:[{
    type:mongoose.Types.ObjectId,
    ref:"Blog",
    required:true
  }]
});
//hasing the password

userSchema.pre('save',async function(next){
    if(this.isModified("password"))
    {
      // if user enter the password then change it not always

      this.password=await bycrpt.hash(this.password,12);

    }
    next();

})
const User = mongoose.model("USER", userSchema);
module.exports = User;
