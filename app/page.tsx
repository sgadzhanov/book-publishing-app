import Image from "next/image"
import ContactUs from "./components/ContactUs"
import FAQSection from "./components/FAQSection"
import FindYourBook from "./components/FindYourBook"
import Hero from "./components/Hero"
import PicksForEveryone from "./components/PicksForEveryone"
import ReadersTrustUs from "./components/ReadersTrustUs"
import TrustedBy from "./components/TrustedBy"
import Section from "./components/ui/Section"
import FeaturedBooks from "./components/FeaturedBooks"


export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <PicksForEveryone />
      <FindYourBook />
      <ReadersTrustUs />
      <FAQSection />
      <ContactUs />

      <section className="w-4/5 mx-auto my-12">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">Featured Books</h2>
        <FeaturedBooks />
      </section>
    </>
  )
}
