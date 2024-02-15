const mongoose=require('mongoose');


const Customer=mongoose.Schema({
    FullName:{
        type:String,
        required:[true,'please provide the customer name'],
        minLength:5,
        maxLength:50
    },
    phoneNumebr:{
        type:Number,
        required:[true,'please provide the phoneNumebr'],
    },
    zipCode:{
        type:Number,
        required:[true,'please provide the zipCode'],
    },
    items:{
        type:[String],
        required:[true,'please provide the items'],
    },
    OrderStatus:{
        type:String,
        enum:{
            values:['قيد الانتظار','تم بنجاح'],
            message:'{VALUE} is not supported'
        }
    }
    
})

module.exports=mongoose.model('CustomerRequests',Customer);