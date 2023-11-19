const express=require("express");
const bodyparser=require("body-parser");
const https=require("https");
const app=express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
const mongoose=require("mongoose");
require('dotenv').config();
mongoose.connect("mongodb://0.0.0.0:27017/wasteDB",{useNewUrlParser:true});

const userSchema={
   fname:String,
   lname:String,
   email:String,
   password:String
 };

 const wareSchema={
   product:String,
   in:String,
   space:String,
   out:String
 }
const list=mongoose.model("user",userSchema);
const warelist=mongoose.model("ware",wareSchema);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/signin",function(req,res){
   res.sendFile(__dirname+"/signin.html");
});

app.get("/signup",function(req,res){
   res.sendFile(__dirname+"/signup.html");
});

app.get("/middle",function(req,res){
    res.render("middle");
});

app.get("/ware",function(req,res){
   async function getlistitems() {
      const foundlist = await warelist.find({});
   
    res.render("warehouse",{newitemlist:foundlist});
   }
   getlistitems();
});

app.get("/detail",function(req,res){
   res.sendFile(__dirname+"/detail.html");
})

app.post("/signin",function(req,res){
   const email=req.body.email;
   const pass=req.body.password;
  async function finduser(){
    const found=await list.find({email:email,password:pass})
   
   if(found){
      res.redirect("./middle");
   }
  }
  finduser();
}); 



app.post("/signup",function(req,res){
   const lname=req.body.lname;
   const fname=req.body.fname;
   const email=req.body.email;
   const pass=req.body.password;
   console.log(lname);
   console.log(fname);
   console.log(email);
   console.log(pass);
   const user=new list({
      fname:req.body.fname,
      lname:req.body.lname,
      email:req.body.email,
      password:req.body.password
  }); 

  user.save();
  res.redirect("./middle");
});

app.post("/warehouse",function(req,res){
   const ware=new warelist({
      product:req.body.product,
      in:req.body.in,
      space:req.body.space,
      out:req.body.out
   });

   ware.save();
});
 
app.listen(3000, function() {
    console.log("Server started on port 3000.");
  });