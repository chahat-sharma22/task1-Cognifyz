const express=require("express");
const app=express();
const ejs=require("ejs");
const path=require("path");
const router=require("./router/router")

const bodyParser = require("body-parser");
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use("/",router);
app.listen(3000,()=>{
    console.log("server done")
})