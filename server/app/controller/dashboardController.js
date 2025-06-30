const{render}=require("ejs")
const User = require("../models/User")

class Dashboard_Controller{
    

 
    // async table(req,res) {
    //     try {
    //                 const userData=  await User.findById(req.user.id)
            
    //         res.render('table',{
    //             title:'Table',
    //             data:userData
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    async forgotPassword(req,res) {
        try {
            res.render('forgotPassword',{
                title:'Forgot Password'
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=new Dashboard_Controller 