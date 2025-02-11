'use client'

import { useState } from "react";
import ChevronUp from "../Icons/ChevronUp";
import ChevronDown from "../Icons/ChevronDown";
import Delete from "../Icons/Delete";
import Add from "../Icons/Add"

export default function ItemPrice({title, submitText, props, setProps}) {
    let [open, setOpen] = useState(false);
    function handlePropChange(e, idx) {
        let temp = [...props];
        temp[idx][e.target.name] = e.target.value;
        setProps(temp);
    }
    return (
        <div className="bg-gray-300 my-1 rounded-md p-2">
            <button type="button" onClick={()=>setOpen(prev=>!prev)} className="flex gap-2 justify-start w-max p-0">
                <span>{open ? <ChevronUp /> : <ChevronDown />}</span>
                <span>{title}</span>
                <span>({props.length})</span>
            </button>
            <div className={open ? 'block' : 'hidden'}>
                {props.map((item, idx)=>{
                    return (
                        <div key={idx} className="flex items-end gap-2">
                                <div>
                                    <label htmlFor="">Name</label>
                                    <input type="text" name="name" placeholder="Name" value={item?.name} onChange={(e)=>handlePropChange(e, idx)} />
                                </div>
                                <div>
                                    <label htmlFor="">Extra price</label>
                                    <input type="number" name="price" placeholder="Price" value={item?.price} onChange={(e)=>handlePropChange(e, idx)} />
                                </div>
                                <button onClick={()=>setProps(prev=>prev.filter((prop, index)=>index!==idx))} type="button" className="text-primary bg-white w-min p-2"><Delete /></button>
                        </div>
                    );
                })}
                <button onClick={()=>setProps(prev=>[...prev, {name: '', price: ''}])} type="button" className="bg-white mt-2"><Add /><span>{submitText}</span></button>
            </div>
        </div>
    );
}