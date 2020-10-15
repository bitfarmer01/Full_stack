const express=require('express');  
const router =express.Router() ; 
const User =require('../../../models/User')
const { check, validationResult } = require('express-validator');
//@route  POST api/users 
//@desc   Register user
//@access Public 
router.post('/',[
check('name'
,'Enter a valid Name ')
.not()
.isEmpty(),
check('email','Please enter a valid email').isEmail(),
check('password','Enter a valid Password').isLength({
    min:6
})
],
async (req,res)=>{ 
    const errors=validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const [name,email,password]=req.body;
    try {
            let user=await User.findOne({email}) // See if user exists 
            if(user){
                res.status(400).json({errors:[{msg:'User already exists'}]})
            }
            //encrypt password 
            //return jsonwebtoken

            res.send('User Route')
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

   
});
module.exports=router;