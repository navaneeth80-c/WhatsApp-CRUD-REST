const mongose = require("mongoose");

const chatSchema = new mongose.Schema({
    from : {
        type:String,
        required : true,
        
    },
    to : {

        type : String,
        required : true,
    },

    message : {
        type : String,
        maxLength:50,
    },

    sentAt : 
    {
        type : Date,
        required : true,

    },
});

const Chat = mongose.model("chat",chatSchema);

module.exports=Chat;