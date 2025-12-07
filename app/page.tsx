import ContactUs from "./components/ContactUs"
import FAQSection from "./components/FAQSection"
import FindYourBook from "./components/FindYourBook"
import Hero from "./components/Hero"
import PicksForEveryone from "./components/PicksForEveryone"
import ReadersTrustUs from "./components/ReadersTrustUs"
import TrustedBy from "./components/TrustedBy"
import Section from "./components/ui/Section"

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

      <Section>
        <h2 className="text-3xl font-bold mb-6 text-slate-800">Featured Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-600">
          <div className="p-4 border rounded-lg">Book Item</div>
          <div className="p-4 border rounded-lg">Book Item</div>
          <div className="p-4 border rounded-lg">Book Item</div>
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold mb-6 text-slate-800">Our Space</h2>
        <p className="text-slate-700">
          Cozy reading nooks, quiet corners, and warm community vibes.
        </p>
      </Section>
    </>
  )
}
