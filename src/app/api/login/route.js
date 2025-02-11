import User from "@/modals/User";
import { compareSync } from "bcryptjs";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI);
        let data = await req.json();
        let user = await User.findOne({email: data.email});
        if(!user) return Response.json({msg: 'Email or password not correct'});
        if(compareSync(data.password, user.password)) {
            return Response.json({msg: 'success', user});
        }
        else {
            return Response.json({msg: 'Email or password not correct'});
        }
    }
    catch(error) {
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}