var express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{

    console.log("contact us route..");
    res.render('contactus');
});

module.exports = router;
