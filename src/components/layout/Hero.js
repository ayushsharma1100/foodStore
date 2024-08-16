import Image from "next/image";
import Right from "../Icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-4">
        <div className="py-12">
            <h1 className="text-6xl font-semibold">Everything is better with a <span className="text-primary">Pizza</span></h1>
            <p className="text-slate-600 py-6 text-md">Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life</p>
            <div className="flex items-center gap-4">
                <button className="flex gap-2 bg-primary text-white px-4 py-2 rounded-full uppercase">
                    Order Now <Right />
                </button>
                <button className="flex gap-2 text-gray-600 font-semibold">
                    Learn More <Right />
                </button>
            </div>
        </div>
        <div className="relative">
            <Image src={'/pizza.png'} layout="fill" objectFit="contain" alt="pizza" />
        </div>
    </section>
  )
}
