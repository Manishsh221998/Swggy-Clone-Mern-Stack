const bcrypt=require('bcryptjs')

const hashPassword=async (password)=>{
    try {
        const salt=await bcrypt.genSalt(10)
        const passwordHashed=await bcrypt.hash(password,salt)
        return passwordHashed;
    } catch (error) {
        console.log("Error in hash paswword :",error)
    }
}

const comparePassword = async (password, hashedPassword) => {
  try {
    if (!password || !hashedPassword) {
    //   console.log("comparePassword error: missing arguments");
      return false;
    }
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log("Error in comparePassword:", error);
    return false;
  }
};

module.exports={hashPassword,comparePassword}