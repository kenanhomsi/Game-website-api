const express=require('express');
const router=express.Router();

const {showAllPlayerClasss,CreatePlayerClass,updatePlayerClasss,DeletePlayerClasss}=require('../controllers/playerClass')


router.route('/').post(CreatePlayerClass).get(showAllPlayerClasss).patch(updatePlayerClasss).delete(DeletePlayerClasss);

module.exports=router