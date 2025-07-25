const mongoose = require("mongoose");
const Chat = require("./models/chat.js")

main().then(()=>{
    console.log("connection sucessful")
}).catch((err)=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

let allChats = [{
    from:"amit",
    to:"mohit",
    message:"hii,how are you",
    created_at: new Date(),  
},
    {
    from:"laila",
    to:"dila",
    message:"hey,how are you",
    created_at: new Date(),  
},
{
    from:"york",
    to:"pari",
    message:"hey,how are you",
    created_at: new Date(),  
},
{
    from:"rohit",
    to:"shalu",
    message:"hey,how are you",
    created_at: new Date(),  
},
{
    from:"neha",
    to:"priya",
    message:"hey,how are you",
    created_at: new Date(),  
}
]

Chat.insertMany(allChats);