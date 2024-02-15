const mongoose=require('mongoose');


const PlayerClassSchema=mongoose.Schema({
    playerclass:{
        type:String,
        required:[true,'please provide the player class'],
        unique:true,
        minLength:5,
        maxLength:50
    },
    briefExplian:{
        type:String,
        required:[true,'please provide the brief explain for player class'],
    }
})

module.exports=mongoose.model('PlayerClass',PlayerClassSchema);