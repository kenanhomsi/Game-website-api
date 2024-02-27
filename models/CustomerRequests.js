const mongoose=require('mongoose');


const Customer=mongoose.Schema({
    FullName:{
        type:String,
        required:[true,'please provide the customer name'],
      
    },
    phoneNumebr:{
        type:Number,
        required:[true,'please provide the phoneNumebr'],
    },
    OrderStatus:{
        type:String,
        enum:{
            values:['جديد','ملغي','تم الاعتماد'],
            message:'{VALUE} is not supported'
        }
    }
    
})

module.exports=mongoose.model('CustomerRequests',Customer);