export default function MenuItems() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg mt-2 text-center transition-all hover:bg-white hover:shadow-md hover:shadow-black/25">
        <img className="max-h-24 mx-auto" src="/pizza.png" />
        <h2 className="font-bold text-lg my-4">Papperoni pizza</h2>
        <p>
            some description about pizza, anything you like for pizza
        </p>
        <button className="bg-primary my-3 py-2 px-8 text-white rounded-full">Add to cart $12</button>
    </div>
  )
}
