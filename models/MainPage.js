const mongoose=require('mongoose');


const MainPage=mongoose.Schema({
    banner:String,
    Video:String,
    BayBtn:{
        type:String,
        enum:{
            values:['on','off']
        }
    },
})

module.exports=mongoose.model('MainPage',MainPage);