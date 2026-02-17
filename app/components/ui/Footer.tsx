import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="bg-indigo-100/70 text-slate-900">
      {/* Main footer content */}
      <div className="w-4/5 mx-auto py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            {t("brandName")}
          </h3>
          <p className="leading-relaxed">
            {t("tagline")}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-4">
            {t("explore")}
          </h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="/books" className="hover:text-slate-500 transition-colors">{t("books")}</Link></li>
            <li><Link href="/books" className="hover:text-slate-500 transition-colors">{t("kids")}</Link></li>
            <li><Link href="/books" className="hover:text-slate-500 transition-colors">{t("popular")}</Link></li>
            <li><Link href="/authors" className="hover:text-slate-500 transition-colors">{t("authorsEvents")}</Link></li>
            <li><Link href="/support" className="hover:text-slate-500 transition-colors">{t("quizzes")}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4">
            {t("contact")}
          </h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">
                call
              </span>
              <a href="tel:+359888777666" className="hover:text-slate-500 transition-colors">
                {t("phone")}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">
                mail
              </span>
              <a href="mailto:our-mail@mail.com" className="hover:text-slate-500 transition-colors">
                {t("email")}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">
                location_on
              </span>
              <span>{t("location")}</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold mb-4">
            {t("findUsOnline")}
          </h4>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-slate-500 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                photo_camera
              </span>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-slate-500 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                alternate_email
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800w-4/5 mx-20 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 gap-2">
        <p>
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  )
}
