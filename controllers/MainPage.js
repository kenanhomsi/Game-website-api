const MainPage=require('../models/MainPage');
const {StatusCodes}=require('http-status-codes')
const {BadRequestError}=require('../errors/index')

const CreateMainPage=async (req,res)=>{
    const newMainPage=await MainPage.create({...req.body});
    if(!newMainPage){
        throw new BadRequestError('please do it correctly');
    }
    res.status(StatusCodes.CREATED).json({newMainPage});
}

const showAllMainPage= async (req,res)=>{
    const allMainPage=await MainPage.find({});
    if(!allMainPage){
        throw new BadRequestError('no servicees yet')
    } 
    res.status(200).json(allMainPage);
}


const updateMainPage= async (req,res)=>{
    let banner=req.query.banner;
    let video=req.query.video;
    let newMainPage;
    if(banner !=""){
        
        banner=banner.substring(1,banner.length -1);
         newMainPage=await MainPage.findOneAndUpdate({banner:banner},{...req.body})
        
        }
    if(video){
        video=video.substring(1,video.length -1);
         newMainPage=await MainPage.findOneAndUpdate({Video:video},{...req.body})
    }
   
    if(!newMainPage){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({newMainPage});
}

const DeleteMainPage= async (req,res)=>{
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