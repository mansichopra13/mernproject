const mongoose = require("mongoose");

const UseModel = mongoose.model("user" , {
    name:{type:String , required:true},
    email:{type:String , required:true},
    password:{type:String , required:true},
});
module.exports = UseModel;