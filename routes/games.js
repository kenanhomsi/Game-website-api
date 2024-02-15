const express=require('express');
const router=express.Router();

const {CreateGame,showAllGames,updateGame,DeleteGame,filteringGames}=require('../controllers/games')


router.route('/').post(CreateGame).get(showAllGames).patch(updateGame).delete(DeleteGame);
router.route('/filtering/').get(filteringGames);
module.exports=router