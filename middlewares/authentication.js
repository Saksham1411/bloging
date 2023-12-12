const { validateToken } = require("../services/authentication");

function checkForAuth(cookieName){
    return(req,res,next)=>{
        const tokenCookieVal = req.cookies.token;
        console.log(tokenCookieVal);
        if(!tokenCookieVal){
            return next();
        }
        try {
            const userPayload = validateToken(tokenCookieVal);
            req.user = userPayload;
        } catch (error) {
            
        }
        return next();

    }
}

module.exports={
    checkForAuth,
}