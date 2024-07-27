const express=require("express");
const app=express();
const routes=require("./routes/User")
const db=require("../Backened/config/db")

const cors = require("cors");

db.connect();

app.use(express.json());

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use("/api/v1/auth", routes);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'YOUR SERVER IS RUNNING....'
    });
});

app.listen(4000,()=>{
    console.log("app is running on port 4000");
})