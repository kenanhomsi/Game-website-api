const express=require('express');
const router=express.Router();

const {CreateMainPage,updateMainPage,DeleteMainPage,showAllMainPage}=require('../controllers/MainPage')


router.route('/').post(CreateMainPage).get(showAllMainPage).patch(updateMainPage).delete(DeleteMainPage);

module.exports=router