const path=require("path")
const fs=require("fs")
const multer=require('multer')

const FILE_TYPE_MAP={
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
    'image/avif':'avif',
}
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const isValid=FILE_TYPE_MAP[file.mimetype]
        let uploadError=new Error('Invalid image type')
        if(isValid){
            uploadError=null
        }
        cb(uploadError,'uploads/menu_Image')
    },
    filename:function(req,file,cb){
        // console.log(file,file.originalname.split(' '))
        const fileName=file.originalname.split(' ').join('-')
        const extension=FILE_TYPE_MAP[file.mimetype]
        // console.log(extension)
        cb(null,`${fileName}-${Date.now()}.${extension}`)
    }
})

const  menuImageUpload=multer({storage:storage})

module.exports=menuImageUpload