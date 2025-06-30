const jwt=require('jsonwebtoken')

const createToken=async (data)=>{
    try {
        const token=await jwt.sign({id:data._id,name:data.name,email:data.email,image:data.image,role:data.role,password:data.password},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
// console.log("Token created :",token)
        return token;
    } catch (error) {
        console.log("Error while creating token")
    }
}

module.exports=createToken