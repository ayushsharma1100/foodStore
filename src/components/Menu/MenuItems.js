import { CartContext } from "@/contextProvider/CartContext";
import Image from "next/image";
import { useContext, useState } from "react";

export default function MenuItems({item}) {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  let {cart, addToCart} = useContext(CartContext);

  function handleAddToCart(ls) {
    addToCart([...cart, ls]);
    localStorage.setItem('cart', JSON.stringify([...cart, ls]));
    setOpen(false);
  }

  function handleIngredientSelect(e, ingredient) {
    if(e.target.checked) {
      setSelectedIngredients(prev=>[...prev, ingredient]);
    }
    else {
      setSelectedIngredients(prev=>prev.filter(it=>it?._id!==ingredient._id))
    }
  }
  let totalPrice = +item?.basePrice;
  if(selectedSize?.price) totalPrice+= +selectedSize?.price;
  if(selectedIngredients?.length) selectedIngredients?.map(ing=>totalPrice+= +ing?.price);
  return (
    <>
      {open && 
        <div onClick={()=>setOpen(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div onClick={e=>e.stopPropagation()} className="bg-white p-4 max-w-md rounded-lg overflow-y-auto" style={{maxHeight: "calc(100vh - 20px)"}}>
            <Image src={item?.image} alt="Item image" className="mx-auto" height={200} width={200} />
            <div className="my-2 text-center">
              <h3 className="font-bold text-lg">{item?.itemName}</h3>
              <p className="my-2 text-gray-500">{item?.description}</p>
            </div>
            <div className="text-center text-gray-700 mt-4">Pick your size</div>
            <div>
              {item?.sizes?.length > 0 && item?.sizes?.map(size=>{
                return (
                  <div key={size?._id} className="p-2 border my-1 rounded-md">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="size" onClick={()=>setSelectedSize(size)} checked={size?._id === selectedSize?._id} />
                        <span className="text-sm">{size?.name} ${+item?.basePrice + +size?.price}</span>
                      </label>
                  </div>
                );
              })}
            </div>

            <div className="text-center text-gray-700 mt-4">Any extra?</div>
            <div>
              {item?.ingredients?.length > 0 && item?.ingredients?.map(ingredient=>{
                return (
                  <div key={ingredient?.name} className="p-2 border my-1 rounded-md">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="ingredient" onClick={e=>handleIngredientSelect(e, ingredient)} />
                        <span className="text-sm">{ingredient?.name} +${ingredient?.price}</span>
                      </label>
                  </div>
                );
              })}
            </div>
            <button onClick={()=>handleAddToCart({...item, selectedSize, selectedIngredients})} className="w-full sticky bottom-0 my-1" type="submit">Add to cart ${totalPrice}</button>
            <button className="mt-1 w-full" type="button" onClick={()=>setOpen(false)}>Cancel</button>
          </div>
        </div>
      }
      <div className="bg-gray-200 p-4 rounded-lg mt-2 text-center transition-all hover:bg-white hover:shadow-md hover:shadow-black/25">
        <Image src={item?.image} alt="Item image" className="mx-auto" height={200} width={200} />
        <h2 className="font-bold text-lg my-4">{item?.itemName}</h2>
        <p className="line-clamp-3">
            {item?.description}
        </p>
        <button onClick={()=>setOpen(true)} className="bg-primary mx-auto my-3 py-2 px-8 text-white rounded-full">Add to cart ${item?.basePrice}</button>
      </div>
    </>
  )
}
