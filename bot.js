
var mongoose=require('mongoose');
const botSchema = mongoose.Schema({
    _id: {type: String},
    name:{type:String},
    email:{type:String},
    investor_type:{type:String},
    seed:{type:String},
    ref_code:{type:String},
    isUSCitizen:{type:String},
    feedback:{type:String},
});
module.exports=mongoose.model('botdata', botSchema);