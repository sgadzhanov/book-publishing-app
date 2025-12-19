import Image from "next/image"
import Hero from "./components/hero/Hero"
import TrustedBy from "./components/hero/TrustedBy"
import PicksForEveryone from "./components/hero/PicksForEveryone"
import FindYourBook from "./components/hero/FindYourBook"
import ReadersTrustUs from "./components/hero/ReadersTrustUs"
import FAQSection from "./components/ui/FAQSection"
import ContactUs from "./components/hero/ContactUs"
import FeaturedBooks from "./components/hero/FeaturedBooks"


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
