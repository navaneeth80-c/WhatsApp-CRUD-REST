const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");




app.set("views",path.join(__dirname,"views")); //connecting the views folder to the js 
app.set("view engine","ejs")   // setting ejs as the view 
app.use(express.static(path.join(__dirname,"public"))); // this is used to connected css with the ejs file
app.use(express.urlencoded({urlencoded:true}));    // this used to parse the data came from the put request 
app.use(methodOverride("_method"));




app.listen(8080,()=>{
    console.log("server is started... at 8080");
});







async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsApp');
  
}









main()
.then(()=>{
    console.log("done connection..");
})
.catch((e)=>{
    console.log(e);
})









/*
let chat1 = new Chat({
    from:"abc",
    to:"Xyz",
    message:"hello sir!!",
    sentAt: new Date(),
});

chat1.save().then((res)=>{
    console.log(res);
});

*/

//routers





//root router
app.get("/",(req,res)=>{
    res.send("root ")
});





// shows all the chats
app.get("/chats",async (req,res)=>{

        let allChat = await Chat.find();
        res.render("allChats.ejs",{allChat});
     //res.send({allChat});
});





// send the message
app.get("/chats/new",(req,res)=>{
    console.log("new chat intitalized");
    res.render("newChats");
})









//save it in the data-sbase
app.post("/chats",(req,res)=>{
   // res.send("sent");
   let {from,to,message} = req.body;

   let newChats = new Chat(
    {
        from:from,
        to : to,
        message : message,
        sentAt:new Date(),
    }
   );
   newChats.save()
   .then((res)=>{
    console.log("everthing is fine");
   })
   .catch((er)=>{
    console.log(er);
   })


   console.log(newChats);
  res.redirect("/chats");
});


//this is a edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}= req.params;
    let foundChat= await Chat.findById(id)
    
    res.render("editChats",{foundChat});
})



// this route edits and redirects.
app.put("/chats/:id",async(req,res)=>{
   let{id}= req.params;
   let{updatedChat} = req.body;
   await Chat.findByIdAndUpdate(id,{message:updatedChat});
   res.redirect("/chats")

  
});


// this route deletes.
app.delete("/chats/:id",async (req,res)=>{
    let{id} = req.params;

    await Chat.findByIdAndDelete(id);

    res.redirect("/chats");
});


