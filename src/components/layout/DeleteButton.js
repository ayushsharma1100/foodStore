import { useState } from "react";

export default function DeleteButton({title, onDelete}) {
    const [confirm, setConfirm] = useState(false);

    if(confirm) {
        return (<div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/80">
            <div className="bg-white p-4 rounded-lg">
                <div>Are you sure you want to delete?</div>
                <div className="flex gap-2 my-2">
                    <button type="button" onClick={()=>setConfirm(false)}>Cancel</button>
                    <button onClick={onDelete} type="button" className="bg-primary text-white whitespace-nowrap">Yes, Delete!</button>
                </div>
            </div>
        </div>)
    }

    return (
        <button type="button" onClick={()=>setConfirm(true)}>{title}</button>
    );
}