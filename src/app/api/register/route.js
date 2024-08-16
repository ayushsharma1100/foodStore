export async function POST(req) {
    let data = await req.json();
    console.log(data);
    return Response.json({msg: 'success', data: data}, {status: 200});
}