

import { UserModel } from "@/models/User";
import { MEMBERSHIP_STATE } from "@/util/Constants";
import Database from "@/util/MongoHelper";
import Registration from "@/util/Registration";
import BadRequest from "@/util/responses/BadRequest";
import InternalServerError from "@/util/responses/InternalServerError";


/**
 * Address verification endpoint.
 * Once this endpoint is visited, the user will be added to the database.
 * This endpoint does NOT requires authentication.
 * 
 * @param req 
 * @returns 
 */
export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const token = url.searchParams.get("token");
        if(!token) throw new BadRequest();

        const payload = await Registration.token.decode(token);
        const user = new UserModel({
            email: payload.email,
            password: payload.encryptedPassword,
            accessLevel: MEMBERSHIP_STATE.OFFICER,
            lastName: payload.lastName,
            firstName: payload.firstName,
            emailVerified: true
        });
        await Database.connect();
        
        const result = await user.save().catch((e : any) => { console.log(e); throw new InternalServerError(); });
        return Response.json({ success: true });
    }catch(response) {
        return response;
    }
}