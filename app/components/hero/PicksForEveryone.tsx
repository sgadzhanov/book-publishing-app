import Section from "../ui/Section"
import { useTranslations } from "next-intl"

export default function PicksForEveryone() {
  const t = useTranslations("picksForEveryone")

  const images = [
    {
      path: "/images/books3.avif",
      title: t("bookCircleTitle"),
      description: t("bookCircleDescription"),
    },
    {
      path: "/images/books4.avif",
      title: t("meetAuthorTitle"),
      description: t("meetAuthorDescription"),
    },
    {
      path: "/images/books11.avif",
      title: t("topBooksTitle"),
      description: t("topBooksDescription"),
    },
    {
      path: "/images/books6.avif",
      title: t("familyNightTitle"),
      description: t("familyNightDescription"),
    },
  ]

  return (
    <Section>
      <div className="p-10">
        <h1 className="text-5xl font-semibold text-slate-700">{t("title")}</h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((imgData) => (
            <div key={imgData.description}>
              <div className="w-full relative">
                <img src={imgData.path} alt={imgData.title} className="object-cover rounded-xl shadow" />
              </div>
              <div className="mt-4 cursor-default hover:text-slate-900">
                <h2 className="text-2xl font-semibold hover:text-slate-500 text-slate-700">{imgData.title}</h2>
                <p className="text-slate-600">{imgData.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
