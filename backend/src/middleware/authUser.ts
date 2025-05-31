import { jwtVerify } from "jose";
import { setCookie,getCookie } from "hono/cookie";
import type { MiddlewareHandler ,Context} from "hono";


export const authUser: MiddlewareHandler = async (c:Context,next) => {
    const token = getCookie(c,"token");

    const secret = new TextEncoder().encode(process.env.TOKEN_KEY);

    if(typeof token == 'string'){
        setCookie(c,"token",token,{
            httpOnly: true,
            secure:false,
            path:'/',
            maxAge: 3600
        })
    }
    else return c.json({Error : "Unauthorized."},401);

    try{
        const {payload} = await jwtVerify(token,secret);
        
        c.set('user',payload);
        await next();
    }
    catch(err){
        return c.json({error : "Invalid Token"},403)
    }
}