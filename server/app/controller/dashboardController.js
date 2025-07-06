const{render}=require("ejs")
const User = require("../models/User")

class Dashboard_Controller{
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