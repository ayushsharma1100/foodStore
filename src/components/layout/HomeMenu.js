import Image from "next/image";
import MenuItems from "../Menu/MenuItems";
import SectionHeader from "./SectionHeader";

export default function HomeMenu() {
  return (
    <section>
        <div className="relative">
            <Image className="absolute left-0 -top-16 -z-10" src={'/sallad1.png'} alt="sallad" width={109} height={189} />
            <Image className="absolute right-0 -top-28 -z-10" src={'/sallad2.png'} alt="sallad" width={107} height={195} />
        </div>
        <div className="text-center">
            <SectionHeader subHeading={'Check Out'} mainHeading={'Menu'} />
        </div>
        <div className="grid grid-cols-3 gap-4 place-items-center">
            <MenuItems />
            <MenuItems />
            <MenuItems />
            <MenuItems />
            <MenuItems />
            <MenuItems />
        </div>
    </section>
  )
}
