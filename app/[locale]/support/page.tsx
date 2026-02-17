import FAQSection from "../../components/ui/FAQSection"
import { Link } from "@/i18n/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function SupportPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("support")

  const topics = [
    { key: "account", icon: "person" },
    { key: "books", icon: "menu_book" },
    { key: "quizzes", icon: "quiz" },
    { key: "events", icon: "event" },
    { key: "technical", icon: "build" },
    { key: "general", icon: "help" }
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

      {/* QUICK HELP TOPICS */}
      <section className="bg-violet-50 py-24">
        <div className="w-4/5 mx-auto">
          <h2 className="text-3xl font-semibold mb-12">
            {t("howCanWeHelp")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((item) => (
              <div
                key={item.key}
                className="
                  bg-white rounded-xl p-6
                  border border-slate-200
                  hover:shadow-md transition-shadow
                "
              >
                <span className="material-symbols-outlined text-3xl text-violet-600 mb-4 block">
                  {item.icon}
                </span>
                <h3 className="text-xl font-semibold mb-2">
                  {t(`topics.${item.key}`)}
                </h3>
                <p className="text-slate-600 text-sm">
                  {t("findAnswers", { topic: t(`topics.${item.key}`).toLowerCase() })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="w-4/5 mx-auto max-w-5xl">
        <FAQSection />
      </div>

      {/* CONTACT SUPPORT CTA */}
      <section className="bg-slate-900 py-20">
        <div className="w-4/5 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-3xl font-semibold text-white">
            {t("stillNeedHelp")}
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
              support_agent
            </span>
            {t("contactSupport")}
          </Link>
        </div>
      </section>

    </main>
  )
}
