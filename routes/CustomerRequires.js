const express=require('express');
const router=express.Router();

const {CreateCustomerRequests,showAllCustomerRequests,
updateCustomerRequests,DeleteCustomerRequests,filteringCustomerRequests}=require('../controllers/CustomerRequests')


router.route('/').post(CreateCustomerRequests).get(showAllCustomerRequests).patch(updateCustomerRequests).delete(DeleteCustomerRequests);
router.route('/filtering/').get(filteringCustomerRequests);
module.exports=router