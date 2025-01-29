import User from "@/modals/User";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try{
        let body = await req.json();
        console.log(body.data);
        console.log({email: body.data.email}, {name: body.data.name})
        let updatedUser = await User.updateOne({email: body.data.email}, {name: body.data.name});
        return NextResponse.json({msg: 'Updated successfully', user: updatedUser});
    }
    catch(error) {
        console.group('error updating profile', error);
        return NextResponse.json({msg: 'Something went wrong'}, {status: 500});
    }
}