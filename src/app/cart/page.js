'use client'
import Delete from "@/components/Icons/Delete";
import SectionHeader from "@/components/layout/SectionHeader";
import PageAuthWrapper from "@/components/utils/PageAuthWrapper";
import { CartContext } from "@/contextProvider/CartContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useState } from "react";

export default function Cart() {
    let {data:session, status} = useSession();
    let {cart, deleteIndex, totalPrice} = useContext(CartContext);
    const [formData, setFormData] = useState(session?.user);

    function handleFormChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    let price = 0
    cart?.length > 0 && cart?.map(item=>price+= +totalPrice(item));

    return (
        <PageAuthWrapper status={status}>
            <section className="mt-8">
                <div className="text-center"><SectionHeader mainHeading="Cart" /></div>
                <div className="grid grid-cols-2 gap-6 mt-8">
                    <div>
                        {cart?.length > 0 ? 
                            cart?.map((item, idx)=>{
                                return (
                                    <div key={item?._idx}>
                                        <div className="flex border-b py-4">
                                            <div className="grow flex items-center gap-4">
                                                <div className="w-20"><Image className="rounded-lg" alt="Item image" src={item?.image} height={200} width={200} /></div>
                                                <div>
                                                    <span className="font-bold">{item?.itemName}</span>
                                                    {item?.selectedSize?.name && <div className="text-sm">Size: {item?.selectedSize?.name}</div>}
                                                    {item?.selectedIngredients?.length >0 && item?.selectedIngredients?.map(item=>{
                                                        return (
                                                            <div key={item?.name} className="text-sm text-gray-500">{item?.name} ₹{item?.price}</div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className="flex gap-4 items-center font-bold">
                                                ₹{totalPrice(item)}
                                                <button className="p-2" onClick={()=>deleteIndex(idx)}><Delete /></button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        : 'No items in cart'}
                        {cart?.length > 0 && <div className="mt-4"><div>Total price: <span className="font-bold pl-2">₹{price}</span></div></div>}
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md">
                        Checkout
                        <input type="tel" name="phone" value={formData?.phone} onChange={handleFormChange} placeholder="Enter phone" />
                            <label>Address</label>
                            <input type="text" name="address" value={formData?.address} onChange={handleFormChange} placeholder="Enter address" />
                            <div className="flex gap-4">
                                <div>
                                    <label>Pin Code</label>
                                    <input type="text" name="postalCode" value={formData?.postalCode} onChange={handleFormChange} placeholder="Enter Pin Code" />
                                </div>
                                <div>
                                    <label>City</label>
                                    <input type="text" name="city" value={formData?.city} onChange={handleFormChange} placeholder="Enter City" />
                                </div>
                            </div>
                            <label>Country</label>
                            <input type="text" name="country" value={formData?.country} onChange={handleFormChange} placeholder="Enter Country" />
                            <button type="submit" className="w-full">Pay ₹{price}</button>
                    </div>
                </div>
            </section>
        </PageAuthWrapper>
    );
}