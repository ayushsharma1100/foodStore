'use client'
import DeleteButton from "@/components/layout/DeleteButton";
import Loader from "@/components/layout/Loader";
import HeaderTabs from "@/components/layout/Tabs";
import PageAuthWrapper from "@/components/utils/PageAuthWrapper";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Categories() {
    let {data:session, status} = useSession();

    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const editRef = useRef(null);

    useEffect(()=>{
        getCategories();
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

    async function handleCategorySubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            let data = {name: category};
            if(editRef.current._id) {
                data._id = editRef.current._id;
            }
            toast.promise(fetch('/api/category', {
                method: editRef.current ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res=>res.json()).then(()=>{setCategory('');
                getCategories();}), {
                    loading: 'Saving...',
                    success: 'Saved Sucessfully!',
                    error: 'Could not save.'
                });
        }
        catch (error) {
            console.log('error uploading category........', error);
            toast.error('Something went wrong, try again later!', {position: 'bottom-left'});
        }
        finally{
            editRef.current = false;
            setLoading(false);
        }
    }

    async function handleDelete(category) {
        try {
            setLoading(true);
            await toast.promise(fetch('/api/category?id=' + category?._id, {
                method: "DELETE",
            }), {
                loading: 'Saving...',
                success: 'Saved Sucessfully!',
                error: 'Could not save.'
            });
            getCategories();
        }
        catch (error) {
            console.log('error uploading category........', error);
            toast.error('Something went wrong, try again later!', {position: 'bottom-left'});
        }
        finally{
            editRef.current = false;
            setLoading(false);
        }
    }

    function handleEditClick(category) {
        setCategory(category.name);
        editRef.current = category;
    }

    return (
        <PageAuthWrapper status={status}>
            {loading && <Loader />}
            <section className="max-w-md mx-auto mt-8">
                <HeaderTabs isAdmin={session?.user?.isAdmin} />
                <form className="labelMargin mt-8" onSubmit={handleCategorySubmit}>
                    <div className="flex items-end gap-2">
                        <div className="grow">
                            <label className="label">{editRef.current ? <span>UpdateCategory: <span className="font-bold text-sm">{editRef.current.name}</span></span> : 'New Category Name'}</label>
                            <input type="text" value={category} onChange={e=>setCategory(e.target.value)} placeholder="Enter Name" />
                        </div>
                        <div>
                            <button type="submit">{editRef.current ? 'Update' : 'Create'}</button>
                        </div>
                        <div>
                            <button type="button"
                                onClick={()=>{
                                    setCategory('');
                                    editRef.current = null;
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>  
                </form>
                <div className="mt-8">
                    <label>Existing Category:</label>
                    {categories.map(category=>{
                        return (
                            <div key={category?._id} className="my-1 flex items-center gap-2 bg-gray-100 p-2 rounded-md">
                                <div className="grow">
                                    {category?.name}
                                </div>
                                <button onClick={()=>handleEditClick(category)} type="button">Edit</button>
                                <DeleteButton title='Delete' onDelete={()=>handleDelete(category)} />
                            </div>
                        );
                    })}
                </div>
            </section>
        </PageAuthWrapper>
    );
}