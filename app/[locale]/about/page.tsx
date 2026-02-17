import MissionAndValues from "../../components/about/MissionAndValues"
import { Link } from "@/i18n/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("about")

  const categories = [
    t("childrensBooks"),
    t("literaryFiction"),
    t("youngAdult"),
    t("nonFiction")
  ]

  return (
    <main className="bg-white text-slate-800">

      {/* HERO */}
      <section className="w-4/5 mx-auto py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-semibold leading-tight mb-6">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t("heroDescription")}
          </p>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <MissionAndValues />

      {/* WHAT WE PUBLISH */}
      <section className="py-24">
        <div className="w-4/5 mx-auto">
          <h2 className="text-3xl font-semibold mb-12">
            {t("whatWePublish")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div
                key={category}
                className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <p className="text-lg font-medium">
                  {category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-slate-900 text-slate-200 py-24">
        <div className="w-4/5 mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold text-white mb-6">
            {t("philosophyTitle")}
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            {t("philosophyDescription")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="w-4/5 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-3xl font-semibold">
            {t("workWithUs")}
          </h2>
          <Link
            href="/contact"
            className="
              inline-flex items-center gap-2
              bg-violet-600 text-white
              px-6 py-3 rounded-full
              hover:bg-violet-700 transition-colors
            "
          >
            <span className="material-symbols-outlined">
              mail
            </span>
            {t("getInTouch")}
          </Link>
        </div>
      </section>

    </main>
  )
}
