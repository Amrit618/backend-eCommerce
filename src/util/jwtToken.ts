//token created and cookie saving
const sendToken = (user: { getJWTToken: () => any }, statuscode: any, res: any) =>{
    const token = user.getJWTToken()

    //options for cookies
    const options = {
        /* expires: new Date(
            Date.now()+ process.env.COOKIE_EXPIRE *24*60*60*1000
        ),
       httpOnly: true, */ 
    }
    res.status(statuscode).cookie('token', token, options).json({
        success: true,
        user,
        token
    }) 
}
export default sendToken