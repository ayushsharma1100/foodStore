import MenuItem from "@/modals/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
    try{
        let connection = await mongoose.connect(process.env.MONGO_URI);
        let body = await req.json();
        let menuItem = await MenuItem.create(body);
        return Response.json({msg: 'Created successfully', menuItem});
    }
    catch(error) {
        console.group('error creating menuItem', error);
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}

export async function GET(req) {
    try{
        let connection = await mongoose.connect(process.env.MONGO_URI);
        let { searchParams } = new URL(req.url);
        const id = searchParams.get('id')
        let items = id ? await MenuItem.findById(id) : await MenuItem.find();
        return Response.json({msg: 'Items fetched successfully', items});
    }
    catch(error) {
        console.log('error fetching menu-item', error);
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}

export async function PUT(req) {
    try{
        let connection = await mongoose.connect(process.env.MONGO_URI);
        let body = await req.json();
        let menuItem = await MenuItem.findByIdAndUpdate(body?._id, body);
        return Response.json({msg: 'Updated successfully', menuItem});
    }
    catch(error) {
        console.group('error updating menuItem', error);
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}

export async function DELETE(req) {
    try{
        let connection = await mongoose.connect(process.env.MONGO_URI);
        let { searchParams } = new URL(req.url);
        const id = searchParams.get('id')
        await MenuItem.findByIdAndDelete(id);
        return Response.json(true);
    }
    catch(error) {
        console.log('error deleting menu-item', error);
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}