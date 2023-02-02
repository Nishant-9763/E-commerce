const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")

const authentication=async (req,res,next)=>{
    let token = req.headers["authorization"]
    if(!token) return res.status(400).send({status:false,message:"please enter token"})
  
    let a= token.split(" ")[1]

    jwt.verify(a,"ProductManagementGroup10",(err,decode)=>{
        if(err){

            return res.status(401).send({status:false,message:err.message})
        }else{
            req.decode=decode
             next()
        }
    })
     
}

const authforGet=async (req,res,next)=>{

    let userId=req.params.userId

    if(!mongoose.isValidObjectId(userId))  return res.status(400).send({status:false,message:"userId is not valid"})

    if(req.decode.userId!==userId) return res.status(403).send({status:false,message:"you are not authorised to get the data"})
    next()
}

module.exports={authentication,authforGet}