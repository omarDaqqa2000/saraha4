import jwt from 'jsonwebtoken';
import userModel from "../../DB/Models/User.model.js";




 const auth = async (req,res,next)=>{
    try{

    
 
    const {authorization} = req.headers;

     
     if(!authorization?.startsWith(process.env.BEARERKEY)){
        return res.json({message:"Invalid authorization"});
     }

     const token = authorization.split(process.env.BEARERKEY)[1];

     if(!token){
        return res.json({message:"invalid authorization"});
     }

     const decoded = jwt.verify(token,process.env.LOGINSIGNATURE);

     const authUser= await userModel.findById(decoded.id).select("userName email");

     if(!authUser){
        return res.json({message:"not register account"});

     }

     req.user = authUser;
     
     next();
    }catch(error){
       return res.json({message:"catch error",error:error.stack})
    }
    }



  

export default auth;


