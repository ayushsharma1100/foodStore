import User from "@/modals/User";

export async function GET(req) {
    try {
        let {searchParams} = new URL(req.url);
        const id = searchParams.get('id');
        let users = id ? await User.findById(id) : await User.find();
        return Response.json(users);
    }
    catch(error) {
        return Response.json({msg: 'Something went wrong'}, {status: 500});
    }
}