import { UserModel } from "@/models/User";
import { Session, TokenPayload, comparePassword } from "@/util/Authenticate";
import { MEMBERSHIP_STATE } from "@/util/Constants";
import Database from "@/util/MongoHelper";
import { parseJSON } from "@/util/ResponseHelpers";
import BadRequest from "@/util/responses/BadRequest";
import InvalidEmail from "@/util/responses/InvalidEmail";
import UserBanned from "@/util/responses/UserBanned";
import UserEmailUnverified from "@/util/responses/UserEmailUnverified";
import { NextRequest } from "next/server";



export interface RequestBody {
    email: string,
    password: string,
};


/**
 * Authenticate a user
 * Returns an authentication JWT if a valid email and password are supplied.
 * 
 * @param req 
 * @returns 
 */
export async function POST(req : NextRequest) {
    try {
        const body = await parseJSON(req) as RequestBody;
        await Database.connect();
    
        if(typeof(body.email) !== "string") throw new BadRequest();
        if(typeof(body.password) !== "string") throw new BadRequest();

        const email = body.email.toLowerCase();
        const password = body.password;

        const user = await UserModel.findOne({ email }).catch(() => { throw new BadRequest(); });
        
        if(!user) throw new InvalidEmail();
        await comparePassword(password, user.password);

        if(user.accessLevel === MEMBERSHIP_STATE.BANNED) throw new UserBanned();
        if(!user.emailVerified) throw new UserEmailUnverified();
        
        const tokenPayload : TokenPayload = {
            _id: user._id,
            accessLevel: user.accessLevel,
            email: user.email,
        };

        const token = await Session.generateJWT(tokenPayload);

        return Response.json({ 
            token
        });
    }catch(errorResponse) {
        console.log(errorResponse)
        return errorResponse;
    }
}