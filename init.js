const mongoose = require("mongoose");
const chat = require("./models/chat");

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



allChat =[
    {
            from:"abc",
            to:"Xyz",
            message:"hello sir!!",
            sentAt: new Date(),
    },
    {
        from:"abc",
        to:"Xyz",
        message:"hello sir!!",
        sentAt: new Date(),
    },
    {
        from:"abc",
        to:"Xyz",
        message:"hello sir!!",
        sentAt: new Date(),
    },
    {
        from:"abc",
        to:"Xyz",
        message:"hello sir!!",
        sentAt: new Date(),
    },
]
chat.insertMany(allChat);

