import User from "@/modals/User";
import { genSaltSync, hashSync } from "bcryptjs";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI);
        let data = await req.json();
        let salt = genSaltSync(6);
        let hashedPass = hashSync(data.password, salt);
        let exists = await User.findOne({email: data.email});
        if(exists) return Response.json({msg: 'User already exists'}, {status: 200});
        let user = await User.create({email: data.email, password: hashedPass});
        return Response.json({msg: 'success', data: user}, {status: 200});
    }
    catch(error) {
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}