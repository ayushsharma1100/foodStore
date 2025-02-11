import User from "@/modals/User";
import mongoose from "mongoose";

export async function GET(req) {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI);
        let {searchParams} = new URL(req.url);
        const id = searchParams.get('id');
        let users = id ? await User.findById(id) : await User.find();
        return Response.json(users);
    }
    catch(error) {
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}