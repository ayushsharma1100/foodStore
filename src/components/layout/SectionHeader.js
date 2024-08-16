export default function SectionHeader({subHeading, mainHeading}) {
  return (
    <>
        <h4 className="uppercase font-semibold text-gray-500 text-md">{subHeading}</h4>
        <h2 className="font-bold text-primary italic text-3xl">{mainHeading}</h2>
    </>
  )
}
