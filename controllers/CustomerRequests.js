const CustomerRequests=require('../models/CustomerRequests');
const {StatusCodes}=require('http-status-codes')
const {BadRequestError}=require('../errors/index')
const nodemailer=require('nodemailer');
const crosauth=(res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT , POST , GET, DELETE , PATCH , OPTIONS" );
}


const CreateCustomerRequests=async (req,res)=>{
    crosauth(res);

    const newCustomerRequests=await CustomerRequests.create({...req.body});
    console.log(newCustomerRequests);
    const transporter=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:"t5earchat1@gmail.com",
            pass:"jrgt jnsz prds alnl"
        }
    });
    
    const mail_option={
        from:req.body.FullName,
        to:"t5earmail@gmail.com",
        subject:`new order `,
        text:`
        customer name:${req.body.FullName},
        zip code :${req.body.zipCode} ,
        phone number : ${req.body.phoneNumebr}`
    }
    transporter.sendMail(mail_option,(err,info)=>{
        if(err){
            console.log(err);
        }else{
            console.log('done');
        }
    })
    if(!newCustomerRequests){
        throw new BadRequestError('please do it correctly');
    }
    res.status(StatusCodes.CREATED).json({newCustomerRequests});
}

const showAllCustomerRequests= async (req,res)=>{
    crosauth(res);

    const allCustomerRequests=await CustomerRequests.find({});
    if(!allCustomerRequests){
        throw new BadRequestError('no servicees yet')
    } 
    res.status(200).json(allCustomerRequests);
}


const updateCustomerRequests= async (req,res)=>{
    crosauth(res);

    let id=req.query.name;
    id=id.substring(1,id.length -1);
    const newCustomerRequests=await CustomerRequests.findOneAndUpdate({_id:id},{...req.body})
    if(!newCustomerRequests){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({newCustomerRequests});
}

const DeleteCustomerRequests= async (req,res)=>{
    crosauth(res);

    let id=req.query.name;
    id=id.substring(1,id.length -1);
    const deleteCustomerRequests=await CustomerRequests.findOneAndDelete({_id:id})
    if(!deleteCustomerRequests){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({deleteCustomerRequests});
}

const filteringCustomerRequests= async (req,res)=>{
    crosauth(res);

    let OrderStatus=req.query.status;
    OrderStatus=OrderStatus.substring(1,OrderStatus.length -1);
    const filteredCustomerRequests=await CustomerRequests.find({OrderStatus:OrderStatus})
    if(!filteredCustomerRequests){
        throw new BadRequestError('wrong Status');
    }
    res.status(200).json({filteredCustomerRequests});
}

module.exports={CreateCustomerRequests,
    showAllCustomerRequests,
    updateCustomerRequests,
    DeleteCustomerRequests,
    filteringCustomerRequests}