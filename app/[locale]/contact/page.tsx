import ContactUsForm from "../../components/forms/contact-us/ContactUsForm";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("contact")
  const tFooter = await getTranslations("footer")

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

      {/* CONTACT CONTENT */}
      <section className="bg-violet-50 py-24">
        <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT — FORM */}
          <div>
            <h2 className="text-3xl font-semibold mb-8">
              {t("sendMessage")}
            </h2>
            <ContactUsForm />
          </div>

          {/* RIGHT — CONTACT DETAILS */}
          <div className="flex flex-col gap-8">

            <div>
              <h3 className="text-xl font-semibold mb-4">
                {t("reachDirectly")}
              </h3>

              <ul className="flex flex-col gap-4 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-violet-600">
                    call
                  </span>
                  <a
                    href="tel:+359888777666"
                    className="hover:text-violet-600 transition-colors"
                  >
                    {tFooter("phone")}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-violet-600">
                    mail
                  </span>
                  <a
                    href="mailto:our-mail@mail.com"
                    className="hover:text-violet-600 transition-colors"
                  >
                    {tFooter("email")}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-violet-600">
                    location_on
                  </span>
                  <span>
                    {tFooter("location")}
                  </span>
                </li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {t("findUsOnline")}
              </h3>

              <div className="flex gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-slate-600 hover:text-violet-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">
                    photo_camera
                  </span>
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-slate-600 hover:text-violet-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">
                    alternate_email
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTEXT / EXPECTATIONS */}
      <section className="py-24">
        <div className="w-4/5 mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold mb-6">
            {t("whatToContact")}
          </h2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>{t("topics.general")}</li>
            <li>{t("topics.events")}</li>
            <li>{t("topics.feedback")}</li>
            <li>{t("topics.press")}</li>
          </ul>
        </div>
      </section>

    </main>
  )
}
