import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeader from "@/components/layout/SectionHeader";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center mt-16">
        <SectionHeader subHeading={'Our Story'} mainHeading={'About Us'} />
        <div className="max-w-2xl mx-auto p-4 text-gray-500 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed urna diam. Mauris aliquam quam sed consequat posuere. Fusce accumsan.consectetur adipiscing elit. Nunc sed urna diam. consectetur adipiscing elit. Nunc sed urna diam. Mauris aliquam quam sed consequat posuere
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed urna diam. Nunc sed urna diam. consectetur adipiscing elit. Nunc sed urna diam. Mauris aliquam quam sed consequat posuere
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit. Nunc sed urna diam. Mauris aliquam quam sed consequat posuere
          </p>
        </div>
      </section>
      <section className="text-center mt-12">
        <SectionHeader subHeading={"Don't hesitate"} mainHeading={'Contact us'} />
        <div className="mt-4">
          <a className="underline text-gray-500 text-3xl" href="tel:+23321642232">+23 321 642 232</a>
        </div>
      </section>
    </>
  );
}
