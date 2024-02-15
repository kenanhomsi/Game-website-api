const CustomerRequests=require('../models/CustomerRequests');
const {StatusCodes}=require('http-status-codes')
const {BadRequestError}=require('../errors/index')
const nodemailer=require('nodemailer');
const crosauth=(res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
}


const CreateCustomerRequests=async (req,res)=>{
    crosauth(res);
    const newCustomerRequests=await CustomerRequests.create({...req.body});
    const transporter=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:"kinanhomsi0959@gmail.com",
            pass:"bqzs rmkg bdhp qblw"
        }
    });
    
    const mail_option={
        from:req.body.FullName,
        to:"kinan_52_@hotmail.com",
        subject:`new order `,
        text:`
        customer name:${req.body.FullName},
        zip code :${req.body.zipCode} ,
        phone number : ${req.body.phoneNumebr},
        orders :{${req.body.items}}`
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

    let CustomerName=req.query.name;
    CustomerName=CustomerName.substring(1,CustomerName.length -1);
    const newCustomerRequests=await CustomerRequests.findOneAndUpdate({FullName:CustomerName},{...req.body})
    if(!newCustomerRequests){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({newCustomerRequests});
}

const DeleteCustomerRequests= async (req,res)=>{
    crosauth(res);

    let CustomerRequestsName=req.query.name;
    CustomerRequestsName=CustomerRequestsName.substring(1,CustomerRequestsName.length -1);
    const deleteCustomerRequests=await CustomerRequests.findOneAndDelete({FullName:CustomerRequestsName})
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