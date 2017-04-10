const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const validator = require('express-validator');
const fs = require('fs');
// var cookieParser = require('cookie-parser');

const session = require('express-session');
const csrf = require('csurf');
//manually add csrfProtection to the request that you want to protect.
var csrfProtection = csrf({ cookie: true });

router.use(bodyParser.urlencoded({extended:true}));
// router.use(cookieParser());
router.use(validator());

router.get('/',csrfProtection,(req,res,next)=>{

    console.log("contact us route..");
    res.render('contactus',{"errors" : [],"_csrf":req.csrfToken()});
});

router.post('/',csrfProtection,(req,res,next)=>{
    console.log('fullname='+req.body.fullname);
    req.assert('fullname','Full Name is Required.').notEmpty();
    req.assert('message', 'Message is Required.').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('contactus',{"errors" : errors});
    }else{
        var fileData = "Fullname:"+req.body.fullname+"\n";
        fileData+= "IP:"+req.ip+"\n";
        fileData+= "Type:"+req.body.type+"\n";
        fileData+="Message:"+req.body.message+"\n\n";
        fs.appendFileSync('./data/contactus_data.txt', fileData);
        res.render('thankyou',{"user" : req.body.fullname});
    }
});

module.exports = router;
