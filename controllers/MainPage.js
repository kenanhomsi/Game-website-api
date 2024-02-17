const MainPage=require('../models/MainPage');
const {StatusCodes}=require('http-status-codes')
const {BadRequestError}=require('../errors/index')
const crosauth=(res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
}

const CreateMainPage=async (req,res)=>{
    crosauth(res);
    const newMainPage=await MainPage.create({...req.body});
    if(!newMainPage){
        throw new BadRequestError('please do it correctly');
    }
    res.status(StatusCodes.CREATED).json({newMainPage});
}

const showAllMainPage= async (req,res)=>{
    crosauth(res);
    let banner=req.query.banner;
    banner=banner.substring(1,banner.length -1);

    const allMainPage=await MainPage.find({banner:banner});
    if(!allMainPage){
        throw new BadRequestError('no servicees yet')
    } 
    res.status(200).json(allMainPage);
}


const updateMainPage= async (req,res)=>{
    crosauth(res);

    let banner=req.query.banner;    
    banner=banner.substring(1,banner.length -1);
     let newMainPage=await MainPage.findOneAndUpdate({banner:banner},{...req.body})
    if(!newMainPage){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({newMainPage});
}

const DeleteMainPage= async (req,res)=>{
    crosauth(res);

    let MainPageName=req.query.name;
   

    MainPageName= MainPageName.substring(1, MainPageName.length -1);
   
    const deleteMainPage=await MainPage.findOneAndDelete({banner:MainPageName})
    if(!deleteMainPage){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({deleteMainPage});
}
module.exports={CreateMainPage,
    showAllMainPage,
    updateMainPage,
    DeleteMainPage,
    }