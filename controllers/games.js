const Games=require('../models/Games');
const {StatusCodes}=require('http-status-codes')
const {BadRequestError}=require('../errors/index')

const CreateGame=async (req,res)=>{
    const newGame=await Games.create({...req.body});
    if(!newGame){
        throw new BadRequestError('please do it correctly');
    }
    res.status(StatusCodes.CREATED).json({newGame});
}
const showAllGames= async (req,res)=>{
    const allGames=await Games.find({});
    if(!allGames){
        throw new BadRequestError('no servicees yet')
    } 
    res.status(200).json(allGames);
}


const updateGame= async (req,res)=>{
    let gameName=req.query.name;
    gameName=gameName.substring(1,gameName.length -1);
    const newgame=await Games.findOneAndUpdate({gameName:gameName},{...req.body})
    if(!newgame){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({newgame});
}
const DeleteGame= async (req,res)=>{
    let gameName=req.query.name;
    gameName=gameName.substring(1,gameName.length -1);
    const deletegame=await Games.findOneAndDelete({gameName:gameName})
    if(!deletegame){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({deletegame});
}
const filteringGames= async (req,res)=>{
    let className=req.query.name;
    className=className.substring(1,className.length -1);
    const deletegame=await Games.find({class:className})
    if(!deletegame){
        throw new BadRequestError('wrong userName');
    }
    res.status(200).json({deletegame});
}

module.exports={CreateGame,showAllGames,updateGame,DeleteGame,filteringGames}