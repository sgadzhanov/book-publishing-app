import Image from "next/image";
import ContactUsIcon from "../icons/ContactUsIcon";
import ContactUsForm from "../forms/contact-us/ContactUsForm";
import { useTranslations } from "next-intl";

export default function ContactUs() {
  const t = useTranslations("contactUs")

  return (
    <div className="flex flex-col md:flex-row bg-violet-50 gap-12 px-6 lg:px-12 py-20 w-full mx-auto">

      {/* left side - form */}
      <div className="flex-1">
        <div className="flex flex-col gap-8">
          <h2 className="text-sm text-slate-500">{t("label")}</h2>
          <h1 className="text-4xl text-slate-800 mb-12">{t("title")}</h1>
        </div>
        <ContactUsForm />
      </div>

      {/* right side - image + contact options */}
      <div className="w-full md:w-1/2">
        {/* Image */}
        <div className="relative h-[400px] rounded-t-xl overflow-hidden">
          <Image
            src="/images/contact-form.avif"
            alt={t("title")}
            fill
            className="object-cover"
          />
        </div>

        {/* Contact options container (below image) */}
        <div className="rounded-b-xl bg-slate-100 shadow-lg p-5 flex flex-col sm:mx-1 items-center sm:flex-row gap-6 sm:gap-8">
          {/* Reach out directly */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 text-violet-600">
              <span className="material-symbols-outlined text-xl">
                phone
              </span>
            </div>
            <div>
              <p className="text-slate-500">{t("reachDirectly")}</p>
              <p className="font-medium text-slate-800">
                +359 888 777 666
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px bg-slate-200" />

          {/* Find us online */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 text-violet-600">
              <ContactUsIcon
                anchorClassName="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 text-violet-600"
                iconClassName="material-symbols-outlined text-xl"
                name="share"
              />
            </div>

            <div className="flex gap-3">
              <ContactUsIcon
                iconClassName="material-symbols-outlined text-xl"
                name="photo_camera"
                href="#"
                ariaLabel="Instagram"
                anchorClassName="text-slate-600 hover:text-violet-600 transition-colors"
              />
              <ContactUsIcon
                href="#"
                ariaLabel="Facebook"
                anchorClassName="text-slate-600 hover:text-violet-600 transition-colors"
                iconClassName="material-symbols-outlined text-xl"
                name="alternate_email"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
