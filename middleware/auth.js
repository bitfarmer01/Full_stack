const jwt =require('jsonwebtoken');
const config=require('config')

module.exports=(req,res,next)=>{
   
   const token=req.header('x-auth-token') //get token from header 

   if(!token){                            //Check if token exists
       return res.status('401').json({
           msg:'Token not authorized, access denied'
       })
   }
   try {                                  // Assuming token exists check if valid
       const decoded=jwt.verify(token,config.get('jwtSecret'))
       req.user=decoded.user;     //Checking if requested user is equal to the decoded token of that user
       next(); 
       
   } catch (error) {
    return res.status('401').json({
        msg:'Token not authorized, access denied'
    })
   }
}