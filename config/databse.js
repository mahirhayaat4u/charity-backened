const monoose=require("mongoose");
require('dotenv').config();

exports.connect=()=>{
    monoose.connect(process.env.MONGODB_URL).then(()=>console.log("Db connected successfully"))
    .catch((error)=>{
        console.log("db connection failed");
        console.log(error);
        process.exit(1);
    })
}