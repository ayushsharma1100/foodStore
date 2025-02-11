import {v2 as cloudinary} from 'cloudinary'

export async function POST(req) {
    try {
        let data = await req.formData();
        let file = data.get('file');
        if (!file) {
            return Response.json({ msg: 'No file provided' }, { status: 400 });
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64File = `data:${file.type};base64,${buffer.toString('base64')}`
        let res = await cloudinary.uploader.upload(base64File);
        return Response.json({result: res});
    }
    catch(error) {
        console.log('error uploading image', error);
        return Response.json({msg:'Something went wrong', error}, {status: 500});
    }
}