import { useTranslations } from "next-intl"

function renderListItems(items: string[]) {
  return (
    <ul className="flex flex-col md:flex-row justify-center">
      {items.map((item, index) => (
        <li key={index} className="text-slate-700 text-md text-center overflow-hidden font-semibold">
          {item}
          {index < items.length - 1 && <span className="mx-3 hidden md:inline">|</span>}
        </li>
      ))}
    </ul>
  )
}

export default function TrustedBy() {
  const t = useTranslations("trustedBy")

  const arr1 = [t("schools"), t("bookstores"), t("agency")]
  const arr2 = [t("print"), t("online"), t("libraries")]

  return (
    <section className="py-10 bg-fuchsia-50">
      <div className="max-w-5xl m-auto flex flex-col gap-4 text-center bg-violet-100 rounded-lg border-2 border-violet-200 px-4 md:px-40 py-5">
        <h2 className="text-slate-800 text-5xl font-bold">{t("title")}</h2>
        <p className="text-slate-700 text-xl mb-4">
          {t("description")}
        </p>
        {renderListItems(arr1)}
        {renderListItems(arr2)}
      </div>
    </section>
  )
}
