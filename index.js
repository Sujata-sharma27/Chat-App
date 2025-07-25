const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js")
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));

const mongoose = require("mongoose");


main().then(()=>{
    console.log("connection sucessful")
}).catch((err)=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

// let Chat1 =  new Chat({
//     from:"neha",
//     to:"priya",
//     message:"hey,how are you",
//     created_at: new Date(),  
// })

// Chat1.save().then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })

//index page
app.get("/chats", async (req,res)=>{
   try{
      let chats = await Chat.find();
      res.render("index.ejs",{chats});
   }catch(err){
    next(err);
   } 
});

//new route
app.get("/chats/new",(req,res)=>{
  //throw new ExpressError(404 , "Page not found");
  res.render("new.ejs")
})

//create route
app.post("/chats",(req,res)=>{
  try{
    let {from,to ,message} = req.body;
    let newChat = new Chat({
      from:from,
      to:to,
      message:message,
      created_at:new Date(),
    });
    newChat.save().then((result)=>{console.log("chat was saved")}).catch((err)=>{console.log(err)});
    res.redirect("/chats");
    }catch(err){
      next(err);
    }
});

//edit route

app.get("/chats/:id/edit", async (req,res)=>{
  try{
     let {id} = req.params;
  let chat = await Chat.findById(id);
  if(!chat){
   next( new ExpressError(404 , "chat not found"));
  }
  res.render("edit.ejs",{chat});
  }
  catch(err){
    next(err);
  }
});

//update route
app.put("/chats/:id", async (req,res)=>{
  try{
         let {id} = req.params;
  let { message : newMsg} = req.body;
  console.log(newMsg);
  let updatedChat = await Chat.findByIdAndUpdate(id, {message : newMsg}, {runValidators:true ,new : true});
  console.log(updatedChat);
  res.redirect("/chats");
  }
  catch(err){
  next(err);
}
});

//delete msg
app.delete("/chats/:id", async (req,res)=>{
  try{
     let {id} = req.params;
  let dltChat = await Chat.findByIdAndDelete(id);
  console.log(dltChat);
  res.redirect("/chats");
  }
  catch(err){
    next(err);
  }
});

app.get("/",(req,res)=>{
    res.send("working");
});

 //error handling middleware
app.use((err,req,res,next)=>{
  let {status=500,message="Some Error Occured"} =err;
  res.status(status).send(message);

})

app.listen(8080, ()=>{
    console.log("server is listening");
});

