const mongoose=require('mongoose');


const GamesSchema=mongoose.Schema({
    gameName:{
        type:String,
        required:[true,'please provide the game name'],
    },
    briefExplian:{
        type:String,
        required:[true,'please provide the brief explain for player class'],
    },
    videoUrl:String,
    ranking:Number,
    class:String
})

module.exports=mongoose.model('Games',GamesSchema);