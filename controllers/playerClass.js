const PlayerClass=require('../models/PlayerClass');
const {StatusCodes}=require('http-status-codes')
const {BadRequestError}=require('../errors/index')

const crosauth=(res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
}
const CreatePlayerClass=async (req,res)=>{
    crosauth(res);

    const PlayerClasss=await PlayerClass.create({...req.body});
    if(!PlayerClasss){
        throw new BadRequestError('please do it coorectly');
    }
    res.status(StatusCodes.CREATED).json({PlayerClasss});
}
const showAllPlayerClasss= async (req,res)=>{
    crosauth(res);
    const allPlayerClass=await PlayerClass.find({});
    if(!allPlayerClass){
        throw new BadRequestError('no servicees yet')
    } 
    res.status(200).json(allPlayerClass);
}


const updatePlayerClasss= async (req,res)=>{
    crosauth(res);

    let playerclass=req.query.class;
    playerclass=playerclass.substring(1,playerclass.length -1);
    const pclass=await PlayerClass.findOneAndUpdate({playerclass:playerclass},{...req.body})
    if(!pclass){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({pclass});
}
const DeletePlayerClasss= async (req,res)=>{
    crosauth(res);

    let playerclass=req.query.class;
    playerclass=playerclass.substring(1,playerclass.length -1);
    const pclass=await PlayerClass.findOneAndDelete({playerclass:playerclass})
    if(!pclass){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({success:true});
}

module.exports={CreatePlayerClass,showAllPlayerClasss,updatePlayerClasss,DeletePlayerClasss}