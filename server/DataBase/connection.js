const mongoose=require('mongoose');
const DB=process.env.DB_URL;
mongoose.connect(DB).then(()=>{
    console.log("DB connection established");
}).catch((error)=>{
    console.log(error);
})