import Hero from "../components/hero/Hero"
import TrustedBy from "../components/hero/TrustedBy"
import PicksForEveryone from "../components/hero/PicksForEveryone"
import FindYourBook from "../components/hero/FindYourBook"
import ReadersTrustUs from "../components/hero/ReadersTrustUs"
import FAQSection from "../components/ui/FAQSection"
import ContactUs from "../components/hero/ContactUs"
import FeaturedBooks from "../components/hero/FeaturedBooks"
import { getTranslations, setRequestLocale } from "next-intl/server"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("common")

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
        <h2 className="text-3xl font-bold mb-6 text-slate-800">{t("featuredBooks")}</h2>
        <FeaturedBooks />
      </section>
    </>
  )
}
