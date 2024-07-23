import express from "express"
import dotenv from "dotenv";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import cors from "cors"
import bodyParser from "body-parser";
import path from "path";
dotenv.config();

const __dirname=path.resolve();

const app=express();

app.use(cors())
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",Router);


app.use(express.static("public"))

//ststic files
app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})

app.listen(8000,()=>{
    console.log("server started at port 8000")
})

const url=process.env.MONGODB_URI

Connection(url)