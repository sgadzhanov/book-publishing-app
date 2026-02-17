"use client"

import { useTranslations } from "next-intl"

export default function ContactUsForm() {
  const t = useTranslations("contactForm")

  return (
    <form action="" className="flex flex-col gap-4">
      <div className="flex gap-4 max-w-xl justify-between">
        <InputField
          label={t("fullName")}
          type="text"
          name="name"
          id="name"
          placeholder={t("yourName")}
        />
        <InputField
          label={t("emailAddress")}
          type="text"
          name="email"
          id="email"
          placeholder={t("emailPlaceholder")}
        />
      </div>
      <div className="flex flex-col max-w-xl">
        <InputField
          label={t("message")}
          type="textarea"
          name="message"
          id="message"
          placeholder={t("messagePlaceholder")}
        />

      </div>
      <button
        type="button"
        className='w-full md:max-w-1/2 text-slate-50 bg-indigo-400 hover:bg-indigo-300 border border-violet-200 hover:shadow-xl cursor-pointer transition p-4 text-lg'
      >
        {t("sendMessage")}
      </button>
    </form>
  )
}

type InputFieldProps = {
  label: string
  type: string
  id: string
  name: string
  placeholder: string
}

const styles = "w-full px-4 py-3 rounded-md border border-gray-300 bg-linear-to-b from-slate-100 to-slate-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.15),inset_0_-1px_1px_rgba(255,255,255,0.7)] placeholder:text-gray-400 text-gray-700 border border-indigo-200"

function InputField({
  label,
  type,
  id,
  name,
  placeholder,
}: InputFieldProps) {
  return (
    <div className="flex flex-col w-full shadow-xl">
      <label htmlFor={name} className="text-slate-500 uppercase text-xs">{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          className={styles}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={styles}
        />
      )}
    </div>
  )
}
