const express=require("express");
const router=express.Router();
const fs=require("fs");
router.get("/",(req,res)=>{
    res.render("form");
})
router.get("/login",(req,res)=>{
    res.render("form");
})

router.post("/sign",(req,res)=>{
    const{name,email,password}=req.body;
    const data=readJson("data.json");
    if(data){
        const index=data.find((user)=>user.email==email)
            if(index){
                 return res.status(500).json("user Alerady exists");
        }
        data.push({name,email,password})
        writeJson("data.json",data)
        res.redirect("/login");

    }
})
router.post("/login",(req,res)=>{
    const {name,email,password}=req.body;
    const data=readJson("data.json")
    if(data){
        const user=data.find((user)=>
            user.email==email&&user.name==name)
        if(user){
           return  res.send(`welcome ${name}`);
        }
        return res.send("Invalid user");
    
    }

})
    

router.get("/sign",(req,res)=>{
    res.render("signup");
})
module.exports=router;
const readJson=(filepath)=>{
    try{
    const data=fs.readFileSync(filepath,"utf-8")
    return JSON.parse(data);
    }
    catch(err){
        console.log(err);
        return[];
    }
}
const writeJson=(filepath,data)=>{
    try{
    fs.writeFileSync(filepath,JSON.stringify(data,null,2),"utf-8");
    console.log("writing done");
    }
    catch(err){
        console.log(err);
    }
}