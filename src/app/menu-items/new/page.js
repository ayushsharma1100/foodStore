'use client'
import Left from "@/components/Icons/Left";
import DeleteButton from "@/components/layout/DeleteButton";
import ItemPrice from "@/components/layout/ItemPrice";
import Loader from "@/components/layout/Loader";
import HeaderTabs from "@/components/layout/Tabs";
import ImageUploader from "@/components/utils/ImageUploader";
import PageAuthWrapper from "@/components/utils/PageAuthWrapper";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreateMenuItem() {
    let {data:session, status} = useSession();
    let router = useRouter();
    let param = useSearchParams();
    const id = param.get('id');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        itemName: '',
        basePrice: '',
        category: ''
    })
    const [sizes, setSizes] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const [link, setLink] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        getCategories();
        if(id) {
            toast.promise(fetch(`/api/menu-item?id=${id}`).then(res=>{if(!res.ok) throw new Error('Something went wrong'); return res})
                .then(res=>res.json())
                .then(res=>{
                    setFormData(res?.items || {description: '', itemName: '', basePrice: '', category: ''});
                    setLink(res?.items?.image);
                    setSizes(res?.items?.sizes || []);
                    setIngredient(res?.items?.ingredients || []);
                })
                .catch(err=>{throw err}), {
                loading: 'Fetching...',
                success: 'Successfully fetched data!',
                error: 'Could not fetch.'
            })
        }
    }, []);

    if(session?.user && !session.user?.isAdmin) {
        return 'Not an admin';
    }

    async function getCategories() {
        try{
            setLoading(true);
            let res = await fetch('/api/category');
            res = await res.json();
            setCategories(res);
        }
        catch(error) {
            console.log('error fetching category........', error)
        }
        finally{
            setLoading(false);
        }
    }

    function formValidator() {
        let flag = false;
        if(!formData.itemName || !formData.basePrice || !formData.description || !formData.category) {
            toast.error('Please fill complete form');
        }
        else flag = true;
        return flag;
    }
    
    function handleFormChange(e) {
        setFormData(prevstate=>({...prevstate, [e.target.name]: e.target.value}))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(!formValidator()) return;
        let data = {...formData, image: link, sizes, ingredients: ingredient};
        toast.promise(fetch('/api/menu-item', {
            method: id ? "PUT" : "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>{
            if(!res.ok) throw new Error(`HTTP error! Status: ${res.status}`); 
            router.push('/menu-items')
        }).catch(err=>{console.log('error saving menu-item...', err); throw err}), {
            loading: 'Saving...',
            success: 'Saved Successfully!',
            error: 'Could not save.'
        })
    }

    async function handleDelete(id) {
        try {
            setLoading(true);
            await toast.promise(fetch('/api/menu-item?id=' + id, {
                method: "DELETE",
            }), {
                loading: 'Saving...',
                success: 'Deleted Sucessfully!',
                error: 'Could not save.'
            });
            router.push('/menu-items');
        }
        catch (error) {
            console.log('error deleting menuItem........', error);
            toast.error('Something went wrong, try again later!', {position: 'bottom-left'});
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <PageAuthWrapper status={status}>
            {loading && <Loader />}
            <section className="max-w-md mx-auto mt-8">
                <HeaderTabs isAdmin={session?.user?.isAdmin} />
                <Link href={'/menu-items'} className="button mt-8">{<Left />}Show all menu items</Link>
                <form className="mt-8 labelMargin" onSubmit={handleSubmit}>
                    <div className="grid items-start gap-2" style={{gridTemplateColumns: "3fr 7fr"}}>
                        <div className="flex flex-col items-start justify-center">
                            {link ? <Image className="rounded-lg w-full h-full my-2" width={134} height={134} src={link} alt="Avatar" /> : <div className="w-full mb-2 text-center">No Image</div>}
                            <ImageUploader setLoading={setLoading} isProfile={false} setLink={setLink} />
                        </div>
                        <div>
                            <label>Item Name</label>
                            <input type="text" name="itemName" value={formData?.itemName} onChange={handleFormChange} placeholder="Enter Name" />
                            <label>Description</label>
                            <input type="text" name="description" value={formData?.description} onChange={handleFormChange} placeholder="Enter Description" />
                            <label>Category</label>
                            <select value={formData?.category || ''} onChange={(e)=>setFormData(prev=>({...prev, category: e.target.value}))}>
                                <option value="">Select an option</option>
                                {categories?.map(cat=>{
                                    return (
                                        <option key={cat?._id} value={cat?._id}>{cat.name}</option>
                                    );
                                })}
                            </select>
                            <label>Base Price</label>
                            <input type="number" name="basePrice" value={formData?.basePrice} onChange={handleFormChange} placeholder="Enter Price" />
                            <ItemPrice title={'Sizes'} submitText={"Add new size"} props={sizes} setProps={setSizes} />
                            <ItemPrice title={'Extra Ingredients'} submitText={"Add ingredient"} props={ingredient} setProps={setIngredient} />
                            <button type="submit">Save</button>
                            {id && <div className="mt-2"><DeleteButton title='Delete menu item' onDelete={()=>handleDelete(id)} /></div>}
                        </div>
                    </div>
                </form>
            </section>
        </PageAuthWrapper>
    );
}