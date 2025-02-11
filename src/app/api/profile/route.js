import User from "@/modals/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req) {
    try{
        let connection = await mongoose.connect(process.env.MONGO_URI);
        let body = await req.json();
        console.log(body.data);
        let email = body.data.email;
        delete body.data.email;
        let updatedUser = await User.updateOne({email}, body.data);
        return NextResponse.json({msg: 'Updated successfully', user: updatedUser});
    }
    catch(error) {
        console.group('error updating profile', error);
        return NextResponse.json({msg: 'Something went wrong'}, {status: 500});
    }
}