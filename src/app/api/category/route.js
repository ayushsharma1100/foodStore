import Category from "@/modals/Category";

export async function POST(req) {
    try{
        let body = await req.json();
        let category = await Category.create(body);
        return Response.json({msg: 'Created successfully', category});
    }
    catch(error) {
        console.group('error creating category', error);
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}

export async function GET() {
    try{
        let categories = await Category.find();
        return Response.json(categories);
    }
    catch(error) {
        console.group('error fetching categories', error);
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}

export async function PUT(req) {
    try{
        let body = await req.json();
        let category = await Category.findByIdAndUpdate(body._id, {name: body.name});
        return Response.json({msg: 'Updated successfully', category});
    }
    catch(error) {
        console.group('error creating category', error);
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}

export async function DELETE(req) {
    try{
        let {searchParams} = new URL(req.url);
        const id = searchParams.get('id');
        let categories = await Category.findByIdAndDelete(id);
        return Response.json(true);
    }
    catch(error) {
        console.group('error deleting categories', error);
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}